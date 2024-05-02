import BasePage from '../../../base-page';
import {links} from './citizen-nav-bar-content';

export default class CitizenNavBar extends BasePage {
  async verifyContent(): Promise<void> {
    await this.expectHeadingToBeVisible
  }
  
  async clickSignOut() {
    if(await super.selectorExists(links.signOut.selector)) {
      await super.clickLink(links.signOut.title);
      await super.expectUrlToContainDomain('idam-web-public');
    }
  }

  async clickMyAccount() {
    await super.clickLink(links.myAccount.title);
    await super.expectUrlToEndWith('/dashboard');
  }
}