import BasePage from '../../../../../base/base-page';
import { Step } from '../../../../../decorators/test-steps';
import OcmcEvent from '../../../ocmc-event/ocmc-event';
import { heading, subheadings, checkboxes } from './create-claim-check-your-answers-content';

const classKey = 'CreateClaimCheckYourAnswersPage';

export default class CreateClaimCheckYourAnswersPage extends OcmcEvent(BasePage) {
  @Step(classKey)
  async verifyContent(): Promise<void> {
    await super.runVerifications([
      super.expectHeading(heading),
      this.verifyYourDetails(),
      this.verifyTheirDetails(),
      this.verifyClaimAmount(),
      this.verifyTotalAmount(),
      this.verifyClaimDetails(),
      this.verifyStatementOfTruth(),
    ]);
  }

  private async verifyYourDetails() {
    await super.expectSubheading(subheadings.yourDetails);
    //verify the rest of content
  }

  private async verifyTheirDetails() {
    await super.expectSubheading(subheadings.theirDetails);
    //verify the rest of content
  }

  private async verifyClaimAmount() {
    await super.expectSubheading(subheadings.claimAmount);
    //verify the rest of content
  }

  private async verifyTotalAmount() {
    await super.expectSubheading(subheadings.totalAmount);
    //verify the rest of content
  }

  private async verifyClaimDetails() {
    await super.expectSubheading(subheadings.claimDetails);
    //verify the rest of content
  }

  private async verifyStatementOfTruth() {
    await super.expectSubheading(subheadings.statementOfTruth);
    //verify the rest of content
  }

  @Step(classKey)
  async checkAndSubmit() {
    await super.clickBySelector(checkboxes.signedTrue.selector);
    await super.clickSubmit();
  }
}
