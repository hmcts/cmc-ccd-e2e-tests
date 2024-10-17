import { AllMethodsStep } from '../../../../../decorators/test-steps';
import BasePage from '../../../../../base/base-page';
import { heading, inputs } from './hwf-number-updated-content';
import CCDCaseData from '../../../../../models/case-data/ccd-case-data';
import ExuiEvent from '../../../exui-event/exui-event';

@AllMethodsStep()
export default class UpdatedHwfNumberPage extends ExuiEvent(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([super.expectHeading(heading), super.verifyCaseTitle(caseData)]);
  }

  async enterHwfNumber() {
    super.inputText(inputs.helpWithFeesNumber.text, inputs.helpWithFeesNumber.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
