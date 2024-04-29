import BasePage from "../../../base-page"
import navBarContent from "./citizen-nav-bar-content";

const selectors = {
  moneyClaimsNavBar: '#global-header',
};

export default class CitizenNavBar extends BasePage {
  
  async clickSignOut() {
    await super.clickLink(navBarContent.signOutLink);
    await super.expectUrlToContainDomain('idam-web-public');
  }
}