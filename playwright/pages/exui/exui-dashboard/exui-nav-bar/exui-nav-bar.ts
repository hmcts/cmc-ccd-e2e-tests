import BasePage from "../../../base-page"
import navBarContent from "./exui-nav-bar-content";

const selectors = {
  exuiSignOut: '.hmcts-header__navigation-link'
};

export default class ExuiNavBar extends BasePage {
  
  async clickSignOut() {
    await super.clickBySelector(selectors.exuiSignOut);
    await super.expectUrlToContainDomain('idam-web-public');
  }
}