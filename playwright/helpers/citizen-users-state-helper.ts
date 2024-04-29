import User from "../models/User";
import UserRole from "../models/UserRole";
import FileSystemHelper from "./file-system-helper";
import FileType from "../models/FileType";
import UserType from "../models/UserType";

export default class CitizenUserStateHelper {
  private static statePath = "playwright/fixtures/.citizen-users/citizen-users.json";

  private static generateCitizenUser = (userType: UserType): User => {
    return {
      email: `${userType}citizen-${Math.random().toString(36).slice(2, 9).toLowerCase()}@gmail.com`,
      password: process.env.SMOKE_TEST_USER_PASSWORD || "Password12",
      role: UserRole.CITIZEN,
      type: userType,
      cookiesPath: `playwright/fixtures/.cookies/${userType}.json`
    };
  };

  static addUsersToState = (users: { [key: string]: User }) => {
    FileSystemHelper.writeFile(users, this.statePath, FileType.JSON);
  };

  static getUsersFromState = (): {[key: string]: User} => {
    return FileSystemHelper.readFile(this.statePath, FileType.JSON);
  };

  static getUserFromState = (userType: UserType): User => {
    const users = FileSystemHelper.readFile(this.statePath, FileType.JSON);
  
    if (users && users[userType]) {
      return users[userType];
    } else {
      return this.generateCitizenUser(userType);
    }
  };

  static deleteUsersState = () => {
    FileSystemHelper.deleteFile(this.statePath);
  };
}
