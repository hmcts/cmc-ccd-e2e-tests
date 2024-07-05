import User from '../types/user';
import UserRole from '../enums/user-role';
import FileSystemHelper from './file-system-helper';
import FileType from '../enums/file-type';
import UserType from '../enums/user-type';
import filePaths from '../config/file-paths';
import config from '../config/config';

export default class CitizenUsersHelper {
  static readonly statePaths = {
    claimant: `${filePaths.citizenUsers}/claimant-users.json`,
    defendant: `${filePaths.citizenUsers}/defendant-users.json`,
  };

  private static generateCitizenUsers = (userType: UserType): User[] => {
    return Array.from({length: config.playwright.workers}, (_, index) => (
      { 
        email: `${userType}citizen-${Math.random().toString(36).slice(2, 9).toLowerCase()}@gmail.com`,
        password: process.env.SMOKE_TEST_USER_PASSWORD,
        role: UserRole.CITIZEN,
        type: userType,
        cookiesPath: `${filePaths.userCookies}/${userType}-${index + 1}.json`,
      }
    ));
  };

  static addUsersToState = (users: User[], userType: UserType) => {
    FileSystemHelper.writeFile(users, this.statePaths[userType], FileType.JSON);
  };

  static getUsersFromState = (userType: UserType): User[] => {
    let users: User[];
    try {
      users = FileSystemHelper.readFile(this.statePaths[userType], FileType.JSON);
    } catch {
      return this.generateCitizenUsers(userType);
    }
    if(users && users.length === config.playwright.workers) {
      return users;
    }
    throw new Error(`${config.playwright.workers} user(s) of type ${userType} does not exist in ${this.statePaths[userType]}`);
  };

  static userStateExists = (userType: UserType) => {
    return FileSystemHelper.exists(this.statePaths[userType]);
  };

  static deleteUsersState = (userType: UserType) => {
    FileSystemHelper.delete(this.statePaths[userType]);
  };

  static deleteAllUsersState = () => {
    FileSystemHelper.delete(`${filePaths.citizenUsers}/`);
  };
}
