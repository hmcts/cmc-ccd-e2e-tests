import urls from '../../../../config/urls';
import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { links } from './dashboard-content';

@AllMethodsStep()
export default class DashboardPage extends BasePage {
  async verifyContent() {
    throw new Error('Method not implemented.');
  }

  async open() {
    await super.goTo(`${urls.citizenFrontEnd}/dashboard`);
  }

  async gotoClaimDetails(claimRef: string) {
    await super.clickLink(claimRef);
  }

  async continueClaim() {
    await super.clickLink(links.continueClaim.title);
  }
}
