import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { heading, links, subheadings } from './create-claim-dashboard-content';

@AllMethodsStep()
export default class CreateClaimDashboardPage extends BasePage {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectSubheading(subheadings.otherOptions),
      super.expectSubheading(subheadings.prepareClaim),
      super.expectSubheading(subheadings.submit),
    ]);
  }

  async theirDetails() {
    await super.clickLink(links.theirDetails.title);
  }

  async claimAmount() {
    await super.clickLink(links.claimAmount.title);
  }

  async checkAndSubmit() {
    await super.clickLink(links.checkAndSubmit.title);
  }
}
