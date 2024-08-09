import User from '../types/user';
import UserRole from '../enums/user-role';
import FileSystemHelper from './file-system-helper';
import FileType from '../enums/file-type';
import UserType from '../enums/user-type';
import filePaths from '../config/file-paths';
import config from '../config/config';

export default class UserStateHelper {
  static readonly statePaths = {
    [UserType.CLAIMANT]: `${filePaths.users}/claimant-users.json`,
    [UserType.DEFENDANT]: `${filePaths.users}/defendant-users.json`,
    [UserType.CASEWORKER]: `${filePaths.users}/caseworker-users.json`,
    [UserType.JUDGE]: `${filePaths.users}/judge-users.json`,
    [UserType.LEGALADVISOR]: `${filePaths.users}/legal-advisor-users.json`,
  };

  static generateCitizenUsers = (userType: UserType): User[] => {
    return Array.from({ length: config.playwright.workers }, (_, index) => ({
      email: `${userType}citizen-${Math.random().toString(36).slice(2, 9).toLowerCase()}@gmail.com`,
      password: process.env.SMOKE_TEST_USER_PASSWORD,
      role: UserRole.CITIZEN,
      type: userType,
      cookiesPath: `${filePaths.userCookies}/${userType}-${index + 1}.json`,
    }));
  };

  static addUsersToState = (users: User[]) => {
    FileSystemHelper.writeFile(users, this.statePaths[users[0].type], FileType.JSON);
  };

  static addUserToState = (user: User) => {
    FileSystemHelper.writeFile(user, this.statePaths[user.type], FileType.JSON);
  };

  static getUserFromState = (userType: UserType): User => {
    let user: User;
    try {
      user = FileSystemHelper.readFile(this.statePaths[userType], FileType.JSON);
      return user;
    } catch {
      return null;
    }
  };

  static getUsersFromState = (userType: UserType): User[] => {
    let users: User[];
    try {
      users = FileSystemHelper.readFile(this.statePaths[userType], FileType.JSON);
      return users;
    } catch {
      return null;
    }
  };

  static userStateExists = (userType: UserType) => {
    return FileSystemHelper.exists(this.statePaths[userType]);
  };

  static deleteUsersState = (userType: UserType) => {
    FileSystemHelper.delete(this.statePaths[userType]);
  };

  static deleteAllUsersState = () => {
    FileSystemHelper.delete(`${filePaths.users}/`);
  };
}
