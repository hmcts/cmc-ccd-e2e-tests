import { dropdowns, heading } from './resend-rpa-content';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import BasePage from '../../../../../base/base-page';
import ExuiPage from '../../../exui-page/exui-page';
import CCDCaseData from '../../../../../models/case-data/ccd-case-data';

@AllMethodsStep()
export default class ResendRpaPage extends ExuiPage(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      super.expectLabel(dropdowns.resendRpa.label),
    ]);
  }

  async chooseClaimRpa() {
    await super.selectFromDropdown(dropdowns.resendRpa.options[0], dropdowns.resendRpa.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
