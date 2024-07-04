import { AllMethodsStep } from '../../../../decorators/test-steps';
import BasePage from '../../../../base/base-page';
import ExuiEvent from '../../mixins/exui-event/exui-event';
import CaseworkerEvents from '../../../../enums/events/caseworker-events';
import CCDCaseData from '../../../../types/case-data/ccd-case-data';
import { heading } from './mediation-pending-content';

@AllMethodsStep
export default class MediationPendingPage extends ExuiEvent(BasePage) {

  async verifyContent(caseData: CCDCaseData) {
    await Promise.all([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      super.verifyEventSummaryContent(),
    ]);
  }

  async submitEvent() {
    await super.fillEventDetails(CaseworkerEvents.REFERRED_MEDIATION);
    await super.clickSubmit();
  }
}