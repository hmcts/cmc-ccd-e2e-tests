import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { headings, subHeadings, links } from './confirmation-content';

@AllMethodsStep
export default class ConfirmationPage extends BasePage {
  
  async verifyContent(): Promise<void> {
    await Promise.all([
      super.expectTextToBeVisible(headings.claimSubmitted.title),
      super.expectSubHeadingToBeVisible(subHeadings.whatHappensNext),
      super.expectSubHeadingToBeVisible(subHeadings.defendantPaysYou),
    ]);
  }

  async goToAccount() {
    await super.clickLink(links.account.title);
  }

  async getClaimRefNumber() {
    const claimRefNumber = await super.getTextFromSelector(headings.claimNumber.selector);
    console.log(`Claim created with claim reference: ${claimRefNumber}`);
    return claimRefNumber;
  }
}