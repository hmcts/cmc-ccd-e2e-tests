import urls from '../../../../config/urls';
import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';

@AllMethodsStep
export default class DashboardPage extends BasePage {

  async verifyContent(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async open() {
    await super.goTo(`${urls.citizenFrontEnd}/dashboard`);
  }
}
