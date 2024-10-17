import { heading } from './transfer-case-submit-content';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import BasePage from '../../../../../base/base-page';
import ExuiEvent from '../../../exui-event/exui-event';
import CCDCaseData from '../../../../../models/case-data/ccd-case-data';
import CaseworkerEvents from '../../../../../enums/events/caseworker-events';

@AllMethodsStep()
export default class TransferCaseSubmitPage extends ExuiEvent(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([super.expectHeading(heading), super.verifyCaseTitle(caseData)]);
  }

  async submit() {
    await super.verifyEventSummaryContent();
    await super.fillEventDetails(CaseworkerEvents.TRANSFER_CASE);
    await super.retryClickSubmit();
  }
}
