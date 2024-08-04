import { AllMethodsStep } from '../../../../../decorators/test-steps';
import BasePage from '../../../../../base/base-page';
import ExuiEvent from '../../../exui-event/exui-event';
import { heading } from './mediation-successful-submit-content';
import CaseworkerEvents from '../../../../../enums/events/caseworker-events';
import CCDCaseData from '../../../../../types/case-data/ccd-case-data';

@AllMethodsStep()
export default class MediationSuccessfulSubmitPage extends ExuiEvent(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([super.expectHeading(heading), super.verifyCaseTitle(caseData), super.verifyEventSummaryContent()]);
  }

  async submit() {
    await super.fillEventDetails(CaseworkerEvents.MEDIATION_SUCCESSFUL);
    await super.retryClickSubmit();
  }
}
