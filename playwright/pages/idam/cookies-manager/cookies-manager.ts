import FileSystemHelper from "../../../helpers/file-system-helper";
import FileType from "../../../models/FileType";
import User from "../../../models/User";
import BasePage from "../../base-page";

export default class CookiesManager extends BasePage {

  async saveCookies(filePath = '') {
    const cookies = await super.getCookies();
    FileSystemHelper.writeFile(cookies, filePath, FileType.JSON);
  }

  deleteCookies(filePath = '') {
    FileSystemHelper.deleteFile(filePath);
  }

  async replaceCookies(user: User) {
    console.log(`Authenticating ${user.type} with email ${user.email} by setting cookies stored in path: ${user.cookiesPath}`)
    const cookies = FileSystemHelper.readFile(user.cookiesPath!, FileType.JSON);
    await super.replaceContextCookies(cookies);
    await super.reload();
  }
}