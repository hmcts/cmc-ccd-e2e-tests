import { AllMethodsStep } from '../../../../../decorators/test-steps';
import BasePage from '../../../../../base/base-page';
import ExuiEvent from '../../../exui-event/exui-event';
import CCDCaseData from '../../../../../types/case-data/ccd-case-data';
import { heading } from './mediation-unsuccessful-submit-content';
import CaseworkerEvents from '../../../../../enums/events/caseworker-events';

@AllMethodsStep()
export default class MediationUnsuccessfulSubmitPage extends ExuiEvent(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([super.expectHeading(heading), super.verifyCaseTitle(caseData), super.verifyEventSummaryContent()]);
  }

  async submit() {
    await super.fillEventDetails(CaseworkerEvents.MEDIATION_FAILED);
    await super.retryClickSubmit();
  }
}
