import { AllMethodsStep } from '../../../../../decorators/test-steps';
import BasePage from '../../../../../base/base-page';
import { heading } from './invalid-hwf-reference-submit-content';
import CaseworkerEvents from '../../../../../enums/events/caseworker-events';
import CCDCaseData from '../../../../../models/case-data/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';

@AllMethodsStep()
export default class InvalidHwfNumberSubmitPage extends ExuiPage(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      super.verifyEventSummaryContent(),
    ]);
  }

  async submit() {
    await super.fillEventDetails(CaseworkerEvents.INVALID_HWF_REF);
    await super.retryClickSubmit();
  }
}
