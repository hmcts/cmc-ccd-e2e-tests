import urls from '../config/urls';
import RestHelper from './rest-helper';
import RequestOptions from '../types/request-options';
import NodeCache from 'node-cache';
import { config } from '../config/config';
import UserRole from '../enums/user-role';

//This class will soon become deprecated

const idamTokenCache = new NodeCache({ stdTTL: 25200, checkperiod: 1800 });

const loginEndpoint = config.idamStudEnabled ? 'oauth2/token' : 'loginUser';

export default class IdamClient {
  /**
   * Creates user with default password
   *
   * @param {User} user contains the email, password and role of the user to be created.
   * @returns {Promise<void>}
   */
  static async createCitizenUser({
    email,
    password,
    role = UserRole.CITIZEN,
  }): Promise<any> {
    console.log(`Create user: ${email}`);
    try {
      const requestOptions: RequestOptions = {
        method: 'POST',
        url: `${urls.idamApi}/testing-support/accounts`,
        body: {
          email: email,
          password: password,
          forename: 'John',
          surname: 'Smith',
          roles: [{ code: role.toString() }],
        },
      };
      const response = await RestHelper.request(requestOptions);
      console.log(`User with email: ${email} successfully created`);
      return response.data;
    } catch (error) {
      console.error('Error creating account:', email);
      throw error;
    }
  }

  /**
   * Deletes user with the supplied username
   *
   * @returns {Promise<void>}
   */
  static deleteUser(email: string): Promise<void> {
    const requestOptions: RequestOptions = {
      method: 'DELETE',
      url: `${urls.idamApi}/testing-support/accounts/${email}`,
    };

    return RestHelper.request(requestOptions)
      .then((resp) => {
        console.log(`User with email: ${email} successfully deleted`);
        // return Promise.resolve();
      })
      .catch(function (err) {
        // tslint:disable-next-line:no-console
        console.log(`error deleting user: ${email}` + err);
      });
  }

  /**
   * Deletes users with the supplied usernames
   *
   * @returns {Promise<void>}
   */
  static deleteUsers(emails: string[]): Promise<void> {
    const params = emails
      .map(function (username) {
        return `userNames=${encodeURIComponent(username)}`;
      })
      .join('&');

    const requestOptions: RequestOptions = {
      method: 'DELETE',
      url: `${urls.idamApi}/testing-support/test-data?${params}&async=true`,
    };

    return RestHelper.request(requestOptions)
      .then((resp) => {
        // tslint:disable-next-line:no-console
        console.log(
          `Users with emails: ${emails.join(', ')} successfully deleted`,
        );
        return Promise.resolve();
      })
      .catch(function (err) {
        // tslint:disable-next-line:no-console
        console.log(`error deleting user/s ${params}: ` + err);
      });
  }

  /**
   * Authenticate user and get idam token from cache/idam
   *
   * @param {User} user the username adn password to authenticate
   * @returns {Promise<string>} the users access token
   */
  static async authenticateUser({
    email,
    password,
  }): Promise<string | undefined> {
    console.log('User logged in ', email);
    if (idamTokenCache.get(email) != null) {
      console.log('Access token from cache: ', email);
      return idamTokenCache.get(email);
    } else {
      if (email && password) {
        console.log('Access token from idam: ', email);
        const accessToken = await IdamClient.getAccessTokenFromIdam({
          email,
          password,
        });
        idamTokenCache.set(email, accessToken);
        return accessToken;
      } else {
        console.log(
          '*******Missing user details. Cannot get access token******',
        );
      }
    }
  }

  /**
   * Get idam token from Idam
   *
   * @param {User} user contains the email and password to authenticate
   * @returns {Promise<string>} the users access token
   */
  static async getAccessTokenFromIdam({
    email,
    password,
  }): Promise<string> {
    const requestOptions: RequestOptions = {
      method: 'POST',
      url: `${urls.idamApi}/${loginEndpoint}?username=${encodeURIComponent(email)}&password=${password}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    return RestHelper.retriedRequest(requestOptions).then((response) => {
      return response.data.access_token;
    });
  }
}
