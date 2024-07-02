import BasePage from "../../../../../../base/base-page";
import { AllMethodsStep } from "../../../../../../decorators/test-steps";
import CitizenEvent from "../../../../mixins/citizen-events";
import { heading, paragraphs } from "./extra-time-to-respond-content";

@AllMethodsStep
export default class ExtraTimeToRespondPage extends CitizenEvent(BasePage){
  async verifyContent() {
    await Promise.all([
      super.expectHeading(heading),
      super.expectText(paragraphs.descriptionText1),
      super.expectText(paragraphs.descriptionText2),
    ]);
  }

}