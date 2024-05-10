import BasePage from '../../../../base/base-page';
import { links } from './exui-nav-bar-content';

export default class ExuiNavBar extends BasePage {
  
  async verifyContent(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  
  async clickSignOut() {
    if(await super.selectorExists(links.signOut.selector)) {
      await super.clickBySelector(links.signOut.selector);
      await super.expectUrlToContainDomain('idam-web-public');
    }
  }
}