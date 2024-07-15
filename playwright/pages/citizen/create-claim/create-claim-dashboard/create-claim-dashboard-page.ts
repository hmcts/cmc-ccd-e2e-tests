import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { heading, links, subHeadings } from './create-claim-dashboard-content';

@AllMethodsStep
export default class CreateClaimDashboardPage extends BasePage {

  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectSubHeading(subHeadings.otherOptions),
      super.expectSubHeading(subHeadings.prepareClaim),
      super.expectSubHeading(subHeadings.submit),
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