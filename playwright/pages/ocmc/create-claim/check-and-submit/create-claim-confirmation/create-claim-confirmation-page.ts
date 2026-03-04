import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import { headings, links } from './create-claim-confirmation-content';

@AllMethodsStep()
export default class CreateClaimConfirmationPage extends BasePage {
  async verifyContent(): Promise<void> {
    await super.runVerifications(
      super.expectSelector(headings.claimNumber.selector, { timeout: 60000 }),
    );
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
