import { AllMethodsStep } from '../../../../../decorators/test-steps';
import BasePage from '../../../../../base/base-page';
import { heading } from './hwf-number-updated-submit-content';
import CaseworkerEvents from '../../../../../enums/events/caseworker-events';
import CCDCaseData from '../../../../../models/case-data/ccd-case-data';
import ExuiEvent from '../../../exui-event/exui-event';

@AllMethodsStep()
export default class UpdatedHwfNumberSubmitPage extends ExuiEvent(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      super.verifyEventSummaryContent(),
    ]);
  }

  async submit() {
    await super.fillEventDetails(CaseworkerEvents.UPDATED_HWF_NUM);
    await super.retryClickSubmit();
  }
}
