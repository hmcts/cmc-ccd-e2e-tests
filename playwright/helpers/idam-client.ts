import { Logger } from "@hmcts/nodejs-logging";
import urls from "../config/urls";
import RestHelper from "./rest-helper";
import RequestOptions from "../models/RequestOptions";
import NodeCache from "node-cache";
import { config } from "../config/config";
import User from "../models/User";
import UserRole from "../models/UserRole";

const logger = Logger.getLogger("idamClient");

const idamTokenCache = new NodeCache({ stdTTL: 25200, checkperiod: 1800 });

const loginEndpoint = config.idamStudEnabled ? "oauth2/token" : "loginUser";

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
  }): Promise<void> {
    logger.info(`Create user: ${email}`);
    try {
      const requestOptions: RequestOptions = {
        method: "POST",
        url: `${urls.idamApi}/testing-support/accounts`,
        body: {
          email: email,
          password: password,
          forename: "John",
          surname: "Smith",
          roles: [{ code: role.toString() }],
        },
      };
      await RestHelper.request(requestOptions);
      logger.info(`User with email: ${email} successfully created`);
    } catch (error) {
      console.error("Error creating account:", email);
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
      method: "DELETE",
      url: `${urls.idamApi}/testing-support/accounts/${email}`,
    };

    return RestHelper.request(requestOptions)
      .then((resp) => {
        logger.info(`User with email: ${email} successfully deleted`);
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
    let params = emails
      .map(function (username) {
        return `userNames=${encodeURIComponent(username)}`;
      })
      .join("&");

    const requestOptions: RequestOptions = {
      method: "DELETE",
      url: `${urls.idamApi}/testing-support/test-data?${params}&async=true`,
    };

    return RestHelper.request(requestOptions)
      .then((resp) => {
        // tslint:disable-next-line:no-console
        logger.info(
          `Users with emails: ${emails.join(", ")} successfully deleted`,
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
    logger.info("User logged in ", email);
    if (idamTokenCache.get(email) != null) {
      logger.info("Access token from cache: ", email);
      return idamTokenCache.get(email);
    } else {
      if (email && password) {
        logger.info("Access token from idam: ", email);
        const accessToken = await IdamClient.getAccessTokenFromIdam({
          email,
          password,
        });
        idamTokenCache.set(email, accessToken);
        return accessToken;
      } else {
        logger.info(
          "*******Missing user details. Cannot get access token******",
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
      method: "POST",
      url: `${urls.idamApi}/${loginEndpoint}?username=${encodeURIComponent(email)}&password=${password}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    return RestHelper.retriedRequest(requestOptions).then((response) => {
      return response.data.access_token;
    });
  }

  static getPin(letterHolderId: string): Promise<string> {
    const requestOptions: RequestOptions = {
      url: `${urls.idamApi}/testing-support/accounts/pin/${letterHolderId}`,
    };
    return RestHelper.request(requestOptions).then(function (response) {
      return response.data;
    });
  }

  // /**
  //  * Authorizes pin user
  //  *
  //  * @param {string} pin
  //  * @returns {Promise<string>} bearer token
  //  */
  // static async authenticatePinUser (pin: string): Promise<string> {
  //   const oauth2Params: string = IdamClient.toUrlParams(oauth2)
  //   const options = {
  //     uri: `${baseURL}/pin?${oauth2Params}`,
  //     headers: {
  //       pin,
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     },
  //     simple: false,
  //     followRedirect: false,
  //     json: false,
  //     resolveWithFullResponse: true
  //   }
  //   return request(options).then(function (response) {
  //     return response
  //   }).then(function (response) {
  //     const code: any = new url.URL(response.headers.location)
  //     return IdamClient.exchangeCode(code).then(function (response) {
  //       return response
  //     })
  //   })
  // }

  // static exchangeCode (code: string): Promise<string> {

  //   const options = {
  //     method: 'POST',
  //     uri: `${baseURL}/oauth2/token`,
  //     auth: {
  //       username: oauth2.client_id,
  //       password: oauth2.client_secret
  //     },
  //     form: { grant_type: 'authorization_code', code: code, redirect_uri: oauth2.redirect_uri }
  //   }

  //   return request(options).then(function (response) {
  //     return response['access_token']
  //   })
  // }

  // /**
  //  * Retrieves uses details
  //  *
  //  * @param {string} jwt
  //  * @returns {Promise<User>}
  //  */
  // static retrieveUser (jwt: string): Promise<User> {
  //   const options = {
  //     uri: `${baseURL}/details`,
  //     headers: {
  //       Authorization: `Bearer ${jwt}`
  //     }
  //   }
  //   return request(options).then(function (response) {
  //     return response
  //   })
  // }
}
