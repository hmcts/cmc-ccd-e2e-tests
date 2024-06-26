import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CitizenEvent from '../../../mixins/citizen-events';
import {heading, subHeadings, checkboxes} from './check-your-answers-content';

@AllMethodsStep
export default class CheckYourAnswersPage extends CitizenEvent(BasePage){

  async verifyContent(): Promise<void> {
    await Promise.all([
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
    await super.expectSubHeading(subHeadings.yourDetails);
    //verify the rest of content
  }

  private async verifyTheirDetails() {
    await super.expectSubHeading(subHeadings.theirDetails);
    //verify the rest of content
  }

  private async verifyClaimAmount() {
    await super.expectSubHeading(subHeadings.claimAmount);
    //verify the rest of content
  }

  private async verifyTotalAmount() {
    await super.expectSubHeading(subHeadings.totalAmount);
    //verify the rest of content
  }

  private async verifyClaimDetails() {
    await super.expectSubHeading(subHeadings.claimDetails);
    //verify the rest of content
  }

  private async verifyStatementOfTruth() {
    await super.expectSubHeading(subHeadings.statementOfTruth);
    //verify the rest of content
  }

  async checkAndSubmit() {
    await super.clickBySelector(checkboxes.signedTrue.selector);
    await super.clickSubmit();
  }
}