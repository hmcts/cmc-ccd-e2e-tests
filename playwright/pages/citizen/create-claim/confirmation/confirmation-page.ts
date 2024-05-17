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

  async getClaimNumber() {
    return await super.getTextFromSelector(headings.claimNumber.selector);
  }
}