import BasePage from '../../base/base-page';
import User from '../../models/user';
import { AllMethodsStep } from '../../decorators/test-steps';
import { acceptIdamCookies } from '../../fixtures/cookies/idam-cookies';
import { generateAcceptExuiCookies } from '../../fixtures/cookies/exui-cookies';
import { acceptOcmcCookies } from '../../fixtures/cookies/ocmc-cookies';
import PageError from '../../errors/page-error';
import CookiesHelper from '../../helpers/cookies-helper';
import Cookie from '../../models/cookie';

@AllMethodsStep()
export default class PageCookiesManager extends BasePage {
  async verifyContent(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async getCookies(): Promise<Cookie[]> {
    return await super.getCookies();
  }

  async cookiesLogin(cookies: Cookie[], user: User) {
    console.log(
      `Authenticating ${user.type} with email ${user.email} by setting cookies stored in path: ${user.cookiesPath}`,
    );
    await super.clearCookies();
    await super.addCookies(cookies);
  }

  async addIdamCookies() {
    await super.addCookies(acceptIdamCookies);
  }

  async addOcmcCookies() {
    await super.addCookies(acceptOcmcCookies);
  }

  async addExuiCookies({ userId, email }: User) {
    if (!userId) {
      throw new PageError(`UserId for user with email ${email} is invalid`);
    }
    await super.addCookies(generateAcceptExuiCookies(userId));
  }

  async cookiesSignOut() {
    await super.clearCookies();
  }
}
