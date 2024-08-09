import filePaths from '../config/file-paths';
import urls from '../config/urls';
import UserType from '../enums/user-type';
import UserStateHelper from '../helpers/users-state-helper';
import FileSystemHelper from '../helpers/file-system-helper';
import config from '../config/config';
import { request } from 'playwright-core';
import AxeCacheHelper from '../helpers/axe-cache-helper';
import CookiesHelper from '../helpers/cookies-helper';

//This is last resort teardown for citizen users if test execution gets interupted in local.

const deleteUsers = async (userType: UserType) => {
  const requestContext = await request.newContext();
  if (UserStateHelper.userStateExists(userType)) {
    try {
      const users = UserStateHelper.getUsersFromState(userType);
      for (const user of users) {
        const response = await requestContext.delete(
          `${urls.idamApi}/testing-support/accounts/${user.email}`,
        );
        if (response.status() !== 204) {
          throw new Error(`Error deleting user: ${user.email}`);
        }
        console.log(`User with email: ${user.email} successfully deleted`);
      }
    } catch (error) {
      if (error.name !== 'FileError') console.log(error.message);
    }
  }
};

const globalTeardownLocal = async () => {
  if (!config.skipCitizenSetup) {
    await deleteUsers(UserType.CLAIMANT);
    await deleteUsers(UserType.DEFENDANT);
  }
  UserStateHelper.deleteAllUsersState();
  CookiesHelper.deleteAllCookies();
  AxeCacheHelper.deleteAllCache();
};

export default globalTeardownLocal;
