import { AllMethodsStep } from '../../../../../decorators/test-steps';
import BasePage from '../../../../../base/base-page';
import ExuiPage from '../../../exui-page/exui-page';
import CCDCaseData from '../../../../../models/case-data/ccd-case-data';
import { heading, radioButtons } from './paper-response-admission-content';

@AllMethodsStep()
export default class PaperResponseAdmissionPage extends ExuiPage(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      super.expectLabel(radioButtons.fullAdmit.label),
      super.expectLabel(radioButtons.partAdmit.label),
    ]);
  }

  async chooseFullAdmit() {
    await super.clickBySelector(radioButtons.fullAdmit.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
