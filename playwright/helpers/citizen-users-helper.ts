import User from '../types/user';
import UserRole from '../enums/user-role';
import FileSystemHelper from './file-system-helper';
import FileType from '../enums/file-type';
import UserType from '../enums/user-type';
import filePaths from '../config/file-paths';

export default class CitizenUsersHelper {
  static readonly statePaths = {
    claimant: `${filePaths.citizenUsers}/claimant-users.json`,
    defendant: `${filePaths.citizenUsers}/defendant-users.json`,
  };

  private static generateCitizenUsers = (userType: UserType, quantity: number, password: string): User[] => {
    return Array.from({length: quantity}, (_, index) => (
      { 
        email: `${userType}citizen-${Math.random().toString(36).slice(2, 9).toLowerCase()}@gmail.com`,
        password: password,
        role: UserRole.CITIZEN,
        type: userType,
        cookiesPath: `${filePaths.userCookies}/${userType}-${index + 1}.json`,
      }
    ));
  };

  static addUsersToState = (users: User[], userType: UserType) => {
    FileSystemHelper.writeFile(users, this.statePaths[userType], FileType.JSON);
  };

  static getUsersFromState = (userType: UserType, quantity: number, password: string): User[] => {
    let users: User[];
    try {
      users = FileSystemHelper.readFile(this.statePaths[userType], FileType.JSON);
    } catch {
      return this.generateCitizenUsers(userType, quantity, password);
    }
    if(users && users.length === quantity) {
      return users;
    }
    throw new Error(`${quantity} user(s) of type ${userType} does not exist in ${this.statePaths[userType]}`);
  };

  static deleteUsersState = (userType: UserType) => {
    FileSystemHelper.delete(this.statePaths[userType]);
  };

  static deleteAllUsersState = () => {
    FileSystemHelper.delete(`${filePaths.citizenUsers}/`);
  };
}
