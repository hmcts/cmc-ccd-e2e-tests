import FileSystemHelper from '../../helpers/file-system-helper';
import FileType from '../../enums/file-type';
import BasePage from '../../base/base-page';
import User from '../../types/user';
import { AllMethodsStep } from '../../decorators/test-steps';
import { acceptIdamCookies } from '../../fixtures/cookies/idam-cookies';
import { generateAcceptExuiCookies } from '../../fixtures/cookies/exui-cookies';
import { acceptCitizenCookies } from '../../fixtures/cookies/citizen-cookies';
import PageError from '../../errors/page-error';
import {test} from '../../playwright-fixtures/index'
import Cookie from '../../types/cookie';

@AllMethodsStep
export default class PageCookiesManager extends BasePage {
  async verifyContent(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async saveCookies(filePath = '') {
    const cookies = await super.getCookies();
    FileSystemHelper.writeFile(cookies, filePath, FileType.JSON);
  }

  async deleteCookies(filePath = '') {
    FileSystemHelper.deleteFile(filePath);
  }

  async cookiesLogin(user: User, isTeardown: boolean) {
    console.log(`Authenticating ${user.type} with email ${user.email} by setting cookies stored in path: ${user.cookiesPath}`);
    let cookies: Cookie[];
    try {
      cookies = FileSystemHelper.readFile(user.cookiesPath!, FileType.JSON);
    } catch(error) {
      if(isTeardown) test.skip(error.message);
      else throw error;
    }
    await super.clearCookies();
    await super.addCookies(cookies);
  }

  async addIdamCookies() {
    await super.addCookies(acceptIdamCookies);
  }

  async addCitizenCookies() {
    await super.addCookies(acceptCitizenCookies);
  }

  async addExuiCookies({userId, email}: User) {
    if(!userId) {
      throw new PageError(`UserId for user with email ${email} is invalid`);
    }
    await super.addCookies(generateAcceptExuiCookies(userId));
  }

  async cookiesSignOut() {
    await super.clearCookies();
  }
}