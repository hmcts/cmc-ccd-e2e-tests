import urls from '../../../../config/urls';
import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { heading, links } from './dashboard-content';

@AllMethodsStep()
export default class DashboardPage extends BasePage {
  async verifyContent() {
    await super.runVerifications(super.expectHeading(heading));
  }

  async verifyContentWithClaimNumber(claimNumber: string) {
    await super.retryReloadRunVerifications(() => [
      super.expectHeading(heading),
      super.expectText(claimNumber, { timeout: 500 }),
    ]);
  }

  async open() {
    await super.goTo(`${urls.citizenFrontEnd}/dashboard`);
  }

  async goToClaimDetails(claimRef: string) {
    await super.clickLink(claimRef);
  }

  async continueClaim() {
    await super.clickLink(links.continueClaim.title);
  }
}
