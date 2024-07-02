import BasePage from "../../../../base/base-page";
import CitizenEvent from "../../mixins/citizen-events";
import { heading, inputs, paragraphs } from "./enter-claim-number-content";

export default class EnterClaimNumberPage extends CitizenEvent(BasePage) {

  async verifyContent() {
    await Promise.all([
      super.expectHeading(heading),
      super.expectText(paragraphs.descriptionText),
      super.expectLabel(inputs.claimNumber.label),
    ])
  }

  async fillClaimNumber(claimNumber: string) {
    await super.fill(claimNumber, inputs.claimNumber.selector);
    await super.clickContinue();
  }

}