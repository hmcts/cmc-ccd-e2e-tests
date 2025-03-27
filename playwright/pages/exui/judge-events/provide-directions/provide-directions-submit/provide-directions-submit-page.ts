import { heading } from './provide-directions-submit-content';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import BasePage from '../../../../../base/base-page';
import ExuiPage from '../../../exui-page/exui-page';
import CCDCaseData from '../../../../../models/case-data/ccd-case-data';
import JudgeEvents from '../../../../../enums/events/judge-events';

@AllMethodsStep()
export default class ProvideDirectionsSubmitPage extends ExuiPage(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      super.verifyEventSummaryContent(),
    ]);
  }

  async submit() {
    await super.fillEventDetails(JudgeEvents.PROVIDE_DIRECTIONS);
    await super.retryClickSubmit();
  }
}
