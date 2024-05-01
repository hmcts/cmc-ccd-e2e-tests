import User from '../models/User';
import UserRole from '../models/UserRole';
import FileSystemHelper from './file-system-helper';
import FileType from '../models/FileType';
import UserType from '../models/UserType';

export default class CitizenUserStateHelper {
  private static statePath = 'playwright/fixtures/.citizen-users/citizen-users.json';

  private static generateCitizenUser = (userType: UserType): User => {
    return {
      email: `${userType}citizen-${Math.random().toString(36).slice(2, 9).toLowerCase()}@gmail.com`,
      password: process.env.SMOKE_TEST_USER_PASSWORD,
      role: UserRole.CITIZEN,
      type: userType,
      cookiesPath: `playwright/fixtures/.cookies/${userType}.json`,
    };
  };

  static addUsersToState = (users: { [key: string]: User }) => {
    FileSystemHelper.writeFile(users, this.statePath, FileType.JSON);
  };

  static getUsersFromState = (): {[key: string]: User} => {
    return FileSystemHelper.readFile(this.statePath, FileType.JSON);
  };

  static getUserFromState = (userType: UserType): User => {
    let users: User[];
    try {
      users = FileSystemHelper.readFile(this.statePath, FileType.JSON);
    } catch {
      return this.generateCitizenUser(userType);
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
