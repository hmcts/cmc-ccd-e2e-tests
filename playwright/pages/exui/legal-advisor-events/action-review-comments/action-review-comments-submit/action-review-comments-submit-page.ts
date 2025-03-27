import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import LegalAdvisorEvents from '../../../../../enums/events/legal-advisor-events';
import CCDCaseData from '../../../../../models/case-data/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';
import { heading } from './action-review-comment-submit-content';

@AllMethodsStep()
export default class ActionReviewCommentsSubmitPage extends ExuiPage(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      super.verifyEventSummaryContent(),
    ]);
  }

  async submit() {
    await super.fillEventDetails(LegalAdvisorEvents.ACTION_REVIEW_COMMENTS);
    await super.retryClickSubmit();
  }
}
