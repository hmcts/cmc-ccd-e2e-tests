import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { heading, links } from './cui-nav-bar-content';

@AllMethodsStep()
export default class CuiNavBar extends BasePage {
  async verifyContent() {
    await this.expectHeading(heading);
  }

  async clickSignOut() {
    if (await super.selectorExists(links.signOut.selector)) {
      await super.clickLink(links.signOut.title);
      await super.expectDomain('idam-web-public');
    }
  }

  async clickMyAccount() {
    await super.clickLink(links.myAccount.title);
    await super.expectUrlEnd('/dashboard');
  }
}
