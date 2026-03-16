import urls from '../../../../config/urls';
import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { heading, links } from './ocmc-dashboard-content';

@AllMethodsStep()
export default class OcmcDashboardPage extends BasePage {
  async verifyContent() {
    await super.runVerifications(super.expectHeading(heading));
  }

  async verifyContentWithClaimNumber(claimNumber: string) {
    await super.retryReloadRunVerifications(() => [
      super.expectHeading(heading),
      super.expectText(claimNumber, { timeout: 500, first: true }),
    ]);
  }

  async open() {
    await super.goTo(`${urls.ocmcFrontEnd}/dashboard`);
  }

  async goToClaimDetails(claimRef: string) {
    await super.clickLink(claimRef);
  }

  async goToDefendantClaimDetails(claimRef: string) {
    const defendantLink = this.page.getByLabel(
      `${claimRef} (Claim number) Claims made against you`,
    );
    if (await defendantLink.isVisible({ timeout: 5000 }).catch(() => false)) {
      await defendantLink.click();
    } else {
      await this.page.getByRole('link', { name: claimRef }).first().click();
    }
  }

  async continueClaim() {
    await super.clickLink(links.continueClaim.title);
  }
}
