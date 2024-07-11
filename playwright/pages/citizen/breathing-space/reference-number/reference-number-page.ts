import BasePage from "../../../../base/base-page";
import { AllMethodsStep } from "../../../../decorators/test-steps";
import CitizenEvent from "../../citizen-event/citizen-event";
import { heading, inputs } from './reference-number-content';

@AllMethodsStep
export default class ReferenceNumberPage extends CitizenEvent(BasePage){
  async verifyContent(){
    await Promise.all([
      super.expectHeading(heading),
      super.expectLabel(inputs.refNum.label),
    ]);
  }

  async enterReferenceNumber() {
    await super.fill('Ref-1234', inputs.refNum.selector);
    await super.clickContinue();
  }

}