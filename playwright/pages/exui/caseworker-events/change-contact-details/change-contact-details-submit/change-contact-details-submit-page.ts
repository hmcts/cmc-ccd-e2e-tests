import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CaseworkerEvents from '../../../../../enums/events/caseworker-events';
import CCDCaseData from '../../../../../models/case-data/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';
import { heading } from './change-contact-details-submit-content';

@AllMethodsStep()
export default class ChangeContactDetailsSubmitPage extends ExuiPage(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      super.verifyEventSummaryContent(),
    ]);
  }

  async submit() {
    await super.fillEventDetails(CaseworkerEvents.CHANGE_CONTACT_DETAILS);
    await super.retryClickSubmit();
  }
}
