import urls from '../../../config/urls';
import User from '../../../types/User';
import BasePage from '../../base-page';
import {heading, inputs} from './login-page-content';

export default class LoginPage extends BasePage {

  async verifyContent() {
    await super.runAccessibilityTests();
    await super.expectHeadingToBeVisible(heading);
    await super.expectLabelToBeVisible(inputs.email.label);
    await super.expectLabelToBeVisible(inputs.password.label);
  }

  private async login(
    {email, password},
  ) {
    console.log(`Authenticating user with email ${email} by Idam`);
    await super.fill(inputs.email.selector, email);
    await super.fill(inputs.password.selector, password);
    await super.clickSubmit();
  }

  async openCitizenFrontEnd() {
    await super.goTo(urls.citizenFrontEnd);
  }

  async openManageCase() {
    await super.goTo(urls.manageCase);
  }

  async citizenLogin(user: User) {
    await this.login(user);
    await super.expectUrlToStartWith(urls.citizenFrontEnd);
  }

  async caseworkerLogin(user: User) {
    await this.login(user);
    await super.expectUrlToEndWith('/cases');
  }
}
