import FileSystemHelper from '../../../helpers/file-system-helper';
import FileType from '../../../enums/FileType';
import BasePage from '../../../base/base-page';
import User from '../../../types/User';

export default class PageCookiesManager extends BasePage {
  async verifyContent(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async saveCookies(filePath = '') {
    const cookies = await super.getCookies();
    FileSystemHelper.writeFile(cookies, filePath, FileType.JSON);
  }

  deleteCookies(filePath = '') {
    FileSystemHelper.deleteFile(filePath);
  }

  async cookiesLogin(user: User) {
    console.log(`Authenticating ${user.type} with email ${user.email} by setting cookies stored in path: ${user.cookiesPath}`);
    const cookies = FileSystemHelper.readFile(user.cookiesPath!, FileType.JSON);
    await super.clearCookies();
    await super.addCookies(cookies);
  }

  async cookiesSignOut() {
    await super.clearCookies();
  }
}