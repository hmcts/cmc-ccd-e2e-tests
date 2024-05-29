import { Page } from '@playwright/test';
import BaseSteps from '../../../base/base-steps';
import User from '../../../types/user';
import { config } from '../../../config/config';
import IdamFactory from '../../../pages/idam/idam-factory';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../types/test-data';

@AllMethodsStep
export default class IdamSteps extends BaseSteps {
  private isSetupTest: boolean;
  private idamFactory: IdamFactory;
  
  constructor(idamFactory: IdamFactory, isSetupTest: boolean, testData: TestData) {
    super(testData);
    this.isSetupTest = isSetupTest;
    this.idamFactory = idamFactory;
  }

  async ExuiLogin(user: User) {
    const { pageCookiesManager } = this.idamFactory;

    if(config.skipAuthSetup || this.isSetupTest) {
      const { loginPage } = this.idamFactory;
      await pageCookiesManager.cookiesSignOut();

      if(this.isSetupTest) {
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

    } 
    else {
      await pageCookiesManager.cookiesLogin(user);
    }
  }

  async CitizenLogin(user: User) {
    const { pageCookiesManager } = this.idamFactory;

    if(config.skipAuthSetup || this.isSetupTest) {
      const { loginPage } = this.idamFactory;
      await pageCookiesManager.cookiesSignOut();

      if(this.isSetupTest) {
        const { idamsCookiesBanner } = this.idamFactory;
        await loginPage.openCitizenFrontEnd();
        await idamsCookiesBanner.verifyContent();
        await idamsCookiesBanner.acceptCookies();
      } else {
        await pageCookiesManager.addIdamCookies();
        await pageCookiesManager.addCitizenCookies();
        await loginPage.openCitizenFrontEnd();
      } 

      await loginPage.verifyContent();
      await loginPage.citizenLogin(user);

    } 
    else {
      await pageCookiesManager.cookiesLogin(user);
    }
  }
}