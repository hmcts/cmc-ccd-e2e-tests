import { AllMethodsStep } from '../../../../../decorators/test-steps';
import BasePage from '../../../../../base/base-page';
import ExuiEvent from '../../../exui-event/exui-event';
import CaseworkerEvents from '../../../../../enums/events/caseworker-events';
import CCDCaseData from '../../../../../types/case-data/ccd-case-data';
import { heading } from './paper-response-admission-submit-content';

@AllMethodsStep()
export default class PaperResponseAdmissionSubmitPage extends ExuiEvent(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([super.expectHeading(heading), super.verifyCaseTitle(caseData), super.verifyEventSummaryContent()]);
  }

  async submit() {
    await super.fillEventDetails(CaseworkerEvents.PAPER_RESP_ADMISSIOON);
    await super.retryretryClickSubmit();
  }
}
