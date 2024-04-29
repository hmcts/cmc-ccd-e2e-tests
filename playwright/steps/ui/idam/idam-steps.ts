import { Page } from "playwright-core";
import User from "../../../models/User";
import IdamFactory from "../../../pages/idam/idam-factory";
import { config } from "../../../config/config";

export default class IdamSteps {
  private idamFactory: IdamFactory;
  private isSetup: boolean;

  constructor(page: Page, isSetup: boolean) {
    this.idamFactory = new IdamFactory(page);
    this.isSetup = isSetup;
  }

  private async cookiesLogin(user: User) {
    const { cookiesManager } = this.idamFactory;
    await cookiesManager.replaceCookies(user);
  }

  async CitizenFrontEndLogin(user: User) {
    if(config.skipAuthSetup || this.isSetup) {
      const { loginPage } = this.idamFactory;
      await loginPage.openCitizenFrontEnd();
      await loginPage.verifyContent();
      await loginPage.citizenLogin(user);
    } else {
      await this.cookiesLogin(user);
    }
  }

  async ManageCaseLogin(user: User) {
    if(config.skipAuthSetup || this.isSetup) {
      const { loginPage } = this.idamFactory;
      await loginPage.openManageCase();
      await loginPage.verifyContent();
      await loginPage.caseworkerLogin(user);
    } else {
      await this.cookiesLogin(user);
    }
  }

  async SaveCookies(filePath: string) {
    const { cookiesManager } = this.idamFactory;
    await cookiesManager.saveCookies(filePath);
  }

  DeleteCookies(filePath: string) {
    const { cookiesManager } = this.idamFactory;
    cookiesManager.deleteCookies(filePath);
  }
}