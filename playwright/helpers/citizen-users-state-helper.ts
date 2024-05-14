import User from '../types/user';
import UserRole from '../enums/user-role';
import FileSystemHelper from './file-system-helper';
import FileType from '../enums/file-type';
import UserType from '../enums/user-type';
import filePaths from '../config/filePaths';

export default class CitizenUserStateHelper {
  private static statePath = `${filePaths.citizenUsers}/citizen-users.json`;

  private static generateCitizenUser = (userType: UserType, password: string): User => {
    return {
      email: `${userType}citizen-${Math.random().toString(36).slice(2, 9).toLowerCase()}@gmail.com`,
      password: password,
      role: UserRole.CITIZEN,
      type: userType,
      cookiesPath: `${filePaths.userCookies}/${userType}.json`,
    };
  };

  static addUsersToState = (users: { [key: string]: User }) => {
    FileSystemHelper.writeFile(users, this.statePath, FileType.JSON);
  };

  static getUsersFromState = (): {[key: string]: User} => {
    return FileSystemHelper.readFile(this.statePath, FileType.JSON);
  };

  static getUserFromState = (userType: UserType, password: string): User => {
    let users: User[];
    try {
      users = FileSystemHelper.readFile(this.statePath, FileType.JSON);
    } catch {
      return this.generateCitizenUser(userType, password);
    }
    if(users[userType]) {
      return users[userType];
    }
    throw new Error(`User of type ${userType} does not exist in ${this.statePath}`);
  };

  static deleteUsersState = () => {
    FileSystemHelper.deleteFile(this.statePath);
  };
}
