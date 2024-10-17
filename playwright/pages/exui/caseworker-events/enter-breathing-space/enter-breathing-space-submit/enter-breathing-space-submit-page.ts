import { AllMethodsStep } from '../../../../../decorators/test-steps';
import BasePage from '../../../../../base/base-page';
import CaseworkerEvents from '../../../../../enums/events/caseworker-events';
import CCDCaseData from '../../../../../models/case-data/ccd-case-data';
import ExuiEvent from '../../../exui-event/exui-event';
import { heading } from './enter-breathing-space-submit-content';

@AllMethodsStep()
export default class EnterBreathingSpaceSubmitPage extends ExuiEvent(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      super.verifyEventSummaryContent(),
    ]);
  }

  async submit() {
    await super.fillEventDetails(CaseworkerEvents.ENTER_BREATHING_SPACE);
    await super.retryClickSubmit();
  }
}
