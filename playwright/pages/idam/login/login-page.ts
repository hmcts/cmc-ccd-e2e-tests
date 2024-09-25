import urls from '../../../config/urls';
import User from '../../../types/user';
import BasePage from '../../../base/base-page';
import { inputs, buttons } from './login-page-content';
import { AllMethodsStep } from '../../../decorators/test-steps';

@AllMethodsStep({ methodNamesToIgnore: ['login'] })
export default class LoginPage extends BasePage {
  async verifyContent() {
    await super.runVerifications([
      // super.expectText(heading),
      super.expectLabel(inputs.email.label),
      super.expectLabel(inputs.password.label),
    ]);
  }

  private async login({ email, password }) {
    console.log(`Authenticating user with email ${email} by Idam`);
    await super.inputText(email, inputs.email.selector);
    await super.inputSensitiveText(password, inputs.password.selector);
    await super.clickBySelector(buttons.submit.selector);
  }

  async openCuiFrontEnd() {
    await super.goTo(urls.cuiFrontEnd);
  }

  async openOcmcFrontEnd() {
    await super.goTo(urls.ocmcFrontEnd);
  }

  async openManageCase() {
    await super.goTo(urls.manageCase);
  }

  async cuiLogin(user: User) {
    await this.login(user);
    await super.expectUrlEnd(['/dashboard', '/eligibility']);
  }

  async ocmcLogin(user: User) {
    await this.login(user);
    await super.expectUrlEnd(['/dashboard', '/eligibility']);
  }

  async caseworkerLogin(user: User) {
    await this.login(user);
    await super.expectUrlEnd('/cases');
  }
}
