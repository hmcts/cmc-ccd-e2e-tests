import { AllMethodsStep } from '../../../../../decorators/test-steps';
import BasePage from '../../../../../base/base-page';
import { heading } from './invalid-hwf-reference-content';
import CCDCaseData from '../../../../../models/case-data/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';

@AllMethodsStep()
export default class InvalidHwfNumberPage extends ExuiPage(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    //BUG REFERENCE FOR HWF NUMBER
    await super.runVerifications([super.expectHeading(heading)]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
