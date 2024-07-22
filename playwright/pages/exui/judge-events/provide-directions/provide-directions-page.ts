import { heading } from './provide-directions-content';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import BasePage from '../../../../base/base-page';
import ExuiEvent from '../../exui-event/exui-event';
import { TruthyParams } from '../../../../decorators/truthy-params';
import CCDCaseData from '../../../../types/case-data/ccd-case-data';
import JudgeEvents from '../../../../enums/events/judge-events';

@AllMethodsStep()
export default class ProvideDirectionsPage extends ExuiEvent(BasePage) {

  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      super.verifyEventSummaryContent(),
    ]);
  }

  async submitEvent() {
    await super.fillEventDetails(JudgeEvents.PROVIDE_DIRECTIONS);
    await super.clickSubmit();
  }
}