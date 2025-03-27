import { AllMethodsStep } from '../../../../../decorators/test-steps';
import BasePage from '../../../../../base/base-page';
import ExuiPage from '../../../exui-page/exui-page';
import CCDCaseData from '../../../../../models/case-data/ccd-case-data';
import { heading } from './mediation-unsuccessful-submit-content';
import CaseworkerEvents from '../../../../../enums/events/caseworker-events';

@AllMethodsStep()
export default class MediationUnsuccessfulSubmitPage extends ExuiPage(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      super.verifyEventSummaryContent(),
    ]);
  }

  async submit() {
    await super.fillEventDetails(CaseworkerEvents.MEDIATION_FAILED);
    await super.retryClickSubmit();
  }
}
