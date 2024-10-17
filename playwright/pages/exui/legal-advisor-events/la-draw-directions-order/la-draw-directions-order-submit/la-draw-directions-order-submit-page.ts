import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import LegalAdvisorEvents from '../../../../../enums/events/legal-advisor-events';
import CCDCaseData from '../../../../../models/case-data/ccd-case-data';
import ExuiEvent from '../../../exui-event/exui-event';
import { heading } from './la-draw-directions-submit-content';

@AllMethodsStep()
export default class LaDrawDirectionsOrderSubmitPage extends ExuiEvent(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      super.verifyEventSummaryContent(),
    ]);
  }

  async submit() {
    await super.fillEventDetails(LegalAdvisorEvents.DRAW_DIRECTIONS_ORDER);
    await super.retryClickSubmit();
  }
}
