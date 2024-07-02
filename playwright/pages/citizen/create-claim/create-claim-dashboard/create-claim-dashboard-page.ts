import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { heading, links, subHeadings } from './create-claim-dashboard-content';

@AllMethodsStep
export default class CreateClaimDashboardPage extends BasePage {

  async verifyContent() {
    await Promise.all([
      super.expectHeading(heading),
      super.expectSubHeading(subHeadings.otherOptions),
      super.expectSubHeading(subHeadings.prepareClaim),
      super.expectSubHeading(subHeadings.submit),
    ]);
  }

  async theirDetails() {
    await super.clickLink(links.theirDetails.title);
  }

  async checkAndSubmit() {
    await super.clickLink(links.checkAndSubmit.title);
  }
}