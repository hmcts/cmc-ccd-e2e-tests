import { Cookie } from "playwright-core";
import FileType from "../enums/FileType";
import FileSystemHelper from "../helpers/file-system-helper";
import User from "../types/User";

export default class RequestsCookiesManager {
  getExuiAccessToken({cookiesPath}: User) {
    const cookies: Cookie[] = FileSystemHelper.readFile(cookiesPath, FileType.JSON);
    return cookies.find(cookie => cookie.name === '__auth__').value;
  }

  getExuiUserId({cookiesPath}: User) {
    const cookies: Cookie[] = FileSystemHelper.readFile(cookiesPath, FileType.JSON);
    return cookies.find(cookie => cookie.name === '__userid__').value;
  }

  getCitizenAccessToken({cookiesPath}: User) {
    const cookies: Cookie[] = FileSystemHelper.readFile(cookiesPath, FileType.JSON);
    return cookies.find(cookie => cookie.name === 'SESSION_ID').value;
  }

  getCitizenUserId({cookiesPath}: User) {
    throw new Error('User Id cannot be access via cookies a test project setup process will need to be created to stored this before tests commence.')
  }
}