import BasePage from '../../../../base/base-page';
import {heading, subHeadings, checkboxes} from './check-your-answers-content';

export default class CheckYourAnswersPage extends BasePage{

  async verifyContent(): Promise<void> {
    await Promise.all([
      super.expectHeadingToBeVisible(heading),
      this.verifyYourDetails(),
      this.verifyTheirDetails(),
      this.verifyClaimAmount(),
      this.verifyTotalAmount(),
      this.verifyClaimDetails(),
      this.verifyStatementOfTruth(),
    ]);
  }

  private async verifyYourDetails() {
    await super.expectSubHeadingToBeVisible(subHeadings.yourDetails);
    //verify the rest of content
  }

  private async verifyTheirDetails() {
    await super.expectSubHeadingToBeVisible(subHeadings.theirDetails);
    //verify the rest of content
  }

  private async verifyClaimAmount() {
    await super.expectSubHeadingToBeVisible(subHeadings.claimAmount);
    //verify the rest of content
  }

  private async verifyTotalAmount() {
    await super.expectSubHeadingToBeVisible(subHeadings.totalAmount);
    //verify the rest of content
  }

  private async verifyClaimDetails() {
    await super.expectSubHeadingToBeVisible(subHeadings.claimDetails);
    //verify the rest of content
  }

  private async verifyStatementOfTruth() {
    await super.expectSubHeadingToBeVisible(subHeadings.statementOfTruth);
    //verify the rest of content
  }

  async checkAndSubmit() {
    await super.clickBySelector(checkboxes.signedTrue.selector);
    await super.clickSubmit();
  }
}