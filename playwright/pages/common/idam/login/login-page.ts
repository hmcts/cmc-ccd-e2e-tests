import urls from '../../../../config/urls';
import User from '../../../../types/user';
import BasePage from '../../../../base/base-page';
import { heading, inputs } from './login-page-content';
import { AllMethodsStep } from '../../../../decorators/test-steps';

@AllMethodsStep
export default class LoginPage extends BasePage {

  async verifyContent() {
    await Promise.all([
      super.expectTextToBeVisible(heading),
      super.expectLabelToBeVisible(inputs.email.label),
      super.expectLabelToBeVisible(inputs.password.label),
    ]);
  }

  private async login(
    {email, password},
  ) {
    console.log(`Authenticating user with email ${email} by Idam`);
    await super.fill(email, inputs.email.selector);
    await super.fill(password, inputs.password.selector);
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
    await super.expectUrlToEndWith('/dashboard', '/eligibility');
  }

  async caseworkerLogin(user: User) {
    await this.login(user);
    await super.expectUrlToEndWith('/cases');
  }
}
