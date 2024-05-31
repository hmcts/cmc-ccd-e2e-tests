import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import {links} from './citizen-nav-bar-content';

@AllMethodsStep
export default class CitizenNavBar extends BasePage {
  async verifyContent(): Promise<void> {
    await this.expectHeading;
  }
  
  async clickSignOut() {
    if(await super.selectorExists(links.signOut.selector)) {
      await super.clickLink(links.signOut.title);
      await super.expectDomain('idam-web-public');
    }
  }

  async clickMyAccount() {
    await super.clickLink(links.myAccount.title);
    await super.expectUrlEnd('/dashboard');
  }
}