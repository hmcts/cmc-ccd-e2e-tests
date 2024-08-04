import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import LegalAdvisorEvents from '../../../../../enums/events/legal-advisor-events';
import CCDCaseData from '../../../../../types/case-data/ccd-case-data';
import ExuiEvent from '../../../exui-event/exui-event';
import { heading } from './generate-order-submit-content';

@AllMethodsStep()
export default class GenerateOrderSubmitPage extends ExuiEvent(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([super.expectHeading(heading), super.verifyCaseTitle(caseData), super.verifyEventSummaryContent()]);
  }

  async submit() {
    await super.fillEventDetails(LegalAdvisorEvents.GENERATE_ORDER);
    await super.retryClickSubmit();
  }
}
