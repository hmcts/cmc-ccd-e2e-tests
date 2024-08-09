import urls from '../../../../../config/urls';
import BasePage from '../../../../../base/base-page';
import { heading, links } from './testing-support-content';
import { AllMethodsStep } from '../../../../../decorators/test-steps';

@AllMethodsStep()
export default class TestingSupportPage extends BasePage {
  async open() {
    await super.goTo(`${urls.citizenFrontEnd}/testing-support`);
  }

  async verifyContent(): Promise<void> {
    await super.runVerifications(super.expectHeading(heading));
  }

  async clickCreateClaimDraft() {
    await super.clickLink(links.createClaimDraft);
  }
}
