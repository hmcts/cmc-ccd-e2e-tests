import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import { headings, subheadings, links } from './create-claim-confirmation-content';

@AllMethodsStep()
export default class CreateClaimConfirmationPage extends BasePage {
  async verifyContent(): Promise<void> {
    await super.runVerifications([
      super.expectText(headings.claimSubmitted.title),
      super.expectSubheading(subheadings.whatHappensNext),
      super.expectSubheading(subheadings.defendantPaysYou),
    ]);
  }

  async goToAccount() {
    await super.clickLink(links.account.title);
  }

  async getClaimRefNumber() {
    const claimRefNumber = await super.getText(headings.claimNumber.selector);
    console.log(`Claim created with claim reference: ${claimRefNumber}`);
    return claimRefNumber;
  }

  async getHwfClaimRefNumber() {
    const claimRefNumberWithHyphens = (await super.getText(headings.claimNumber.selector)).trim();
    const claimRefNumber = claimRefNumberWithHyphens.replace(/-/g, '');
    console.log(`Claim created with claim reference: ${claimRefNumber}`);
    return parseInt(claimRefNumber);
  }
}
