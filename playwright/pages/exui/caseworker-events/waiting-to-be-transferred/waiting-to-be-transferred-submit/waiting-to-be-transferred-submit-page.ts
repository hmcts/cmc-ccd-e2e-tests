import { heading } from './waiting-to-be-transferred-submit-content';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import BasePage from '../../../../../base/base-page';
import ExuiEvent from '../../../exui-event/exui-event';
import CaseworkerEvents from '../../../../../enums/events/caseworker-events';
import CCDCaseData from '../../../../../models/case-data/ccd-case-data';

@AllMethodsStep()
export default class WaitingToBeTransferredSubmitPage extends ExuiEvent(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      super.verifyEventSummaryContent(),
    ]);
  }

  async submit() {
    await super.fillEventDetails(CaseworkerEvents.WAITING_TO_BE_TRANSFERRED);
    await super.retryClickSubmit();
  }
}
