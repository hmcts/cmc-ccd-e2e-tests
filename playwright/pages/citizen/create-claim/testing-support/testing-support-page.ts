import urls from '../../../../config/urls';
import BasePage from '../../../../base/base-page';
import {heading, links} from './testing-support-content';

export default class TestingSupportPage extends BasePage{
  
  async open() {
    await super.goTo(`${urls.citizenFrontEnd}/testing-support`);
  }

  async verifyContent(): Promise<void> {
    await super.expectHeadingToBeVisible(heading);
  }

  async clickCreateClaimDraft() {
    await super.clickLink(links.createClaimDraft);
  }
}