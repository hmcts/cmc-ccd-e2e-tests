import { heading } from './waiting-to-be-transferred-content';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import BasePage from '../../../../base/base-page';
import ExuiEvent from '../../exui-event/exui-event';
import CaseworkerEvents from '../../../../enums/events/caseworker-events';
import { TruthyParams } from '../../../../decorators/truthy-params';
import CCDCaseData from '../../../../types/case-data/ccd-case-data';

@AllMethodsStep
export default class WaitingToBeTransferredPage extends ExuiEvent(BasePage) {

  async verifyContent(caseData: CCDCaseData) {
    await Promise.all([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      super.verifyEventSummaryContent(),
    ]);
  }

  @TruthyParams()
  async submitEvent() {
    await super.fillEventDetails(CaseworkerEvents.WAITING_TO_BE_TRANSFERRED);
    await super.clickSubmit();
  }
}