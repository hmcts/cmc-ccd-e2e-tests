import BasePage from '../../../base-page';
import {links} from './citizen-nav-bar-content';

export default class CitizenNavBar extends BasePage {
  async verifyContent(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  
  async clickSignOut() {
    await super.clickLink(links.signOut);
    await super.expectUrlToContainDomain('idam-web-public');
  }
}