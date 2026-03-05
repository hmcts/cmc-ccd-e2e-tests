import urls from '../../../../../config/urls';
import BasePage from '../../../../../base/base-page';
import { links } from './testing-support-content';
import { AllMethodsStep } from '../../../../../decorators/test-steps';

@AllMethodsStep()
export default class TestingSupportPage extends BasePage {
  async open() {
    await super.goTo(`${urls.ocmcFrontEnd}/testing-support`);
  }

  async verifyContent(): Promise<void> {
    await super.runVerifications(
      super.expectLink(links.createClaimDraft, { timeout: 60000 }),
    );
  }

  async clickCreateClaimDraft() {
    await super.clickLink(links.createClaimDraft);
  }
}
