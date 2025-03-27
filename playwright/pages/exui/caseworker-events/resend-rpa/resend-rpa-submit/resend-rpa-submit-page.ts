import { heading } from './resend-rpa-submit-content';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import BasePage from '../../../../../base/base-page';
import ExuiPage from '../../../exui-page/exui-page';
import CCDCaseData from '../../../../../models/case-data/ccd-case-data';
import CaseworkerEvents from '../../../../../enums/events/caseworker-events';

@AllMethodsStep()
export default class ResendRpaSubmitPage extends ExuiPage(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      super.verifyEventSummaryContent(),
    ]);
  }

  async submit() {
    await super.fillEventDetails(CaseworkerEvents.RESEND_RPA);
    await super.retryClickSubmit();
  }
}
