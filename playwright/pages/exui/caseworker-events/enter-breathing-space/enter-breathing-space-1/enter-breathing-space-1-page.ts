import { AllMethodsStep } from '../../../../../decorators/test-steps';
import BasePage from '../../../../../base/base-page';
import CCDCaseData from '../../../../../models/case-data/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';
import { heading } from './enter-breathing-space-1-content';

@AllMethodsStep()
export default class EnterBreathingSpace1Page extends ExuiPage(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([super.expectHeading(heading), super.verifyCaseTitle(caseData)]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
