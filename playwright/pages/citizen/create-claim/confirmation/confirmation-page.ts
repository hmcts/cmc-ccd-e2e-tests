import BasePage from "../../../base-page";
import { heading, subHeadings, links } from "./confirmation-content";

export default class ConfirmationPage extends BasePage {
  
  async verifyContent(): Promise<void> {
    await super.expectHeadingToBeVisible(heading);
    await super.expectSubHeadingToBeVisible(subHeadings.whatHappensNext);
    await super.expectSubHeadingToBeVisible(subHeadings.defendantPaysYou);
  }

  async goToAccount() {
    await super.clickLink(links.account);
  }
}