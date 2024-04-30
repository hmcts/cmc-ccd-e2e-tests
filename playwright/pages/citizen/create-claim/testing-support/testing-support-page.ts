import BasePage from "../../../base-page";
import {heading, links} from "./testing-support-content";

export default class TestingSupportPage extends BasePage{
  
  async verifyContent(): Promise<void> {
    await super.expectHeadingToBeVisible(heading);
  }

  async clickCreateClaimDraft() {
    await super.clickLink(links.createClaimDraft);
  }
}