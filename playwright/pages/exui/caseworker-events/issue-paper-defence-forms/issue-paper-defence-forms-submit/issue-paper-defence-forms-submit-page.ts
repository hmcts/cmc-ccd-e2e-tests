import { heading } from './issue-paper-defence-forms-submit-content';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import BasePage from '../../../../../base/base-page';
import ExuiPage from '../../../exui-page/exui-page';
import CaseworkerEvents from '../../../../../enums/events/caseworker-events';
import CCDCaseData from '../../../../../models/case-data/ccd-case-data';

@AllMethodsStep()
export default class IssuePaperDefenceFormsSubmitPage extends ExuiPage(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      super.verifyEventSummaryContent(),
    ]);
  }

  async submit() {
    await super.fillEventDetails(CaseworkerEvents.ISSUE_PAPER_DEFENCE_FORMS);
    await super.retryClickSubmit();
  }
}
