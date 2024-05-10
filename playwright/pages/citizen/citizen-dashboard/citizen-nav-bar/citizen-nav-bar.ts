import BasePage from '../../../../base/base-page';
import {links} from './citizen-nav-bar-content';

export default class CitizenNavBar extends BasePage {
  
  verifyContent(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  
  async clickSignOut() {
    await super.clickLink(links.signOut.title);
    await super.expectUrlToContainDomain('idam-web-public');
  }

  async clickMyAccount() {
    await super.clickLink(links.myAccount.title);
    await super.expectUrlToEndWith('/dashboard');
  }
}