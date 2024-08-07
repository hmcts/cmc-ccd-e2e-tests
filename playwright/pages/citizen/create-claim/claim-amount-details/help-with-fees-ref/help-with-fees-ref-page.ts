import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CitizenEvent from '../../../citizen-event/citizen-event';
import { heading, inputs, radioButtons } from './help-with-fees-ref-content';

@AllMethodsStep()
export default class HelpWithFeesRefPage extends CitizenEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([super.expectHeading(heading)]);
  }

  async selectYesToHwf() {
    await super.clickBySelector(radioButtons.yesToHwf.selector);
    await super.inputText(inputs.helpWithFeesNumber.text, inputs.helpWithFeesNumber.selector);
    await super.clickSaveAndContinue();
  }
}
