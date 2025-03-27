import { AllMethodsStep } from '../../../../../decorators/test-steps';
import BasePage from '../../../../../base/base-page';
import { heading, inputs } from './hwf-number-updated-content';
import CCDCaseData from '../../../../../models/case-data/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';

@AllMethodsStep()
export default class UpdatedHwfNumberPage extends ExuiPage(BasePage) {
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
