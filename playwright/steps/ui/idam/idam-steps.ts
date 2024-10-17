import BaseSteps from '../../../base/base-steps';
import User from '../../../models/user';
import config from '../../../config/config';
import IdamFactory from '../../../pages/idam/idam-factory';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../models/test-data';
import { caseworker, claimants, defendants, judge, legalAdvisor } from '../../../config/users';
import PageUtilsFactory from '../../../pages/utils/page-utils-factory';
import CookiesHelper from '../../../helpers/cookies-helper';

@AllMethodsStep({ methodNamesToIgnore: ['exuiLogin', 'ocmcLogin'] })
export default class IdamSteps extends BaseSteps {
  private isSetupTest: boolean;
  private isTeardown: boolean;
  private verifyCookiesBanner: boolean;
  private pageUtilsFactory: PageUtilsFactory;
  private idamFactory: IdamFactory;

  constructor(
    pageUtilsFactory: PageUtilsFactory,
    idamFactory: IdamFactory,
    isSetupTest: boolean,
    isTeardownTest: boolean,
    verifyCookiesBanner: boolean,
    testData: TestData,
  ) {
    super(testData);
    this.isSetupTest = isSetupTest;
    this.isTeardown = isTeardownTest;
    this.verifyCookiesBanner = verifyCookiesBanner;
    this.pageUtilsFactory = pageUtilsFactory;
    this.idamFactory = idamFactory;
  }

  async ClaimantLogin(workerIndex?: number) {
    const claimant: User = isNaN(workerIndex)
      ? claimants[this.workerIndex]
      : claimants[workerIndex];
    await this.ocmcLogin(claimant);
  }

  async DefendantLogin(workerIndex?: number) {
    const defendant: User = isNaN(workerIndex)
      ? defendants[this.workerIndex]
      : defendants[workerIndex];
    await this.ocmcLogin(defendant);
  }

  async CaseworkerLogin() {
    await this.exuiLogin(caseworker);
  }

  async JudgeLogin() {
    await this.exuiLogin(judge);
  }

  async LegalAdvisorLogin() {
    await this.exuiLogin(legalAdvisor);
  }

  private async exuiLogin(user: User) {
    const { pageCookiesManager } = this.pageUtilsFactory;

    if (config.skipAuthSetup || this.isSetupTest) {
      const { loginPage } = this.idamFactory;
      await pageCookiesManager.cookiesSignOut();

      if (this.isSetupTest && this.verifyCookiesBanner) {
        const { idamsCookiesBanner } = this.idamFactory;
        await loginPage.openManageCase();
        await idamsCookiesBanner.verifyContent();
        await idamsCookiesBanner.acceptCookies();
      } else {
        await pageCookiesManager.addIdamCookies();
        await pageCookiesManager.addExuiCookies(user);
        await loginPage.openManageCase();
      }

      await loginPage.verifyContent();
      await loginPage.caseworkerLogin(user);
    } else {
      const cookies = await CookiesHelper.getCookies(user.cookiesPath, this.isTeardown);
      await pageCookiesManager.cookiesLogin(cookies, user);
    }
  }

  private async ocmcLogin(user: User) {
    const { pageCookiesManager } = this.pageUtilsFactory;

    if (config.skipAuthSetup || this.isSetupTest) {
      const { loginPage } = this.idamFactory;
      await pageCookiesManager.cookiesSignOut();

      if (this.isSetupTest && this.verifyCookiesBanner) {
        const { idamsCookiesBanner } = this.idamFactory;
        await loginPage.openOcmcFrontEnd();
        await idamsCookiesBanner.verifyContent();
        await idamsCookiesBanner.acceptCookies();
      } else {
        await pageCookiesManager.addIdamCookies();
        await pageCookiesManager.addOcmcCookies();
        await loginPage.openOcmcFrontEnd();
      }

      await loginPage.verifyContent();
      await loginPage.ocmcLogin(user);
    } else {
      const cookies = await CookiesHelper.getCookies(user.cookiesPath, this.isTeardown);
      await pageCookiesManager.cookiesLogin(cookies, user);
    }
  }
}
