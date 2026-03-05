import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import { headings, links } from './create-claim-confirmation-content';

@AllMethodsStep()
export default class CreateClaimConfirmationPage extends BasePage {
  async verifyContent(): Promise<void> {
    try {
      await super.retryReloadRunVerifications(
        () => super.expectSelector(headings.claimNumber.selector, { timeout: 60000 }),
        {
          retries: 3,
          message: 'Claim reference not visible yet, reloading confirmation page and retrying',
        },
      );
    } catch (error) {
      console.log(
        `Claim confirmation page did not expose claim reference. Current URL: ${super.getCurrentUrl()}`,
      );
      throw error;
    }
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
