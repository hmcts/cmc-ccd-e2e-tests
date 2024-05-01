import urls from '../../../config/urls';
import User from '../../../models/User';
import BasePage from '../../base-page';
import loginPageContent from './login-page-content';

const selectors = {
  emailInput: '#username',
  passwordInput: '#password',
};

export default class LoginPage extends BasePage {

  async verifyContent() {
    await super.runAccessibilityTests();
    await super.expectTextToBeVisible(loginPageContent.heading);
    await super.expectInputToBeVisible(loginPageContent.email_input_label);
    await super.expectInputToBeVisible(loginPageContent.password_input_label);
  }

  private async login(
    {email, password},
  ) {
    console.log(`Authenticating user with email ${email} by Idam`);
    await super.fill(selectors.emailInput, email);
    await super.fill(selectors.passwordInput, password);
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
