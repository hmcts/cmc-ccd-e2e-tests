import { heading, radioButtons } from './paper-response-reviewed-2-content';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import BasePage from '../../../../../base/base-page';
import ExuiPage from '../../../exui-page/exui-page';
import CCDCaseData from '../../../../../models/case-data/ccd-case-data';

@AllMethodsStep()
export default class PaperResponseReviewed2Page extends ExuiPage(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([super.expectHeading(heading), super.verifyCaseTitle(caseData)]);
  }

  async noScannedDocReviewed() {
    await super.clickBySelector(radioButtons.noDocReviewed.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
