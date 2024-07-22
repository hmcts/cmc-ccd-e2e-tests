import { heading } from './attach-via-bulk-scan-content';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import BasePage from '../../../../base/base-page';
import ExuiEvent from '../../exui-event/exui-event';
import CaseworkerEvents from '../../../../enums/events/caseworker-events';
import CCDCaseData from '../../../../types/case-data/ccd-case-data';

@AllMethodsStep()
export default class AttachViaBulkScanPage extends ExuiEvent(BasePage) {

  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      super.verifyEventSummaryContent(),
    ]);
  }

  async submitEvent() {
    await super.fillEventDetails(CaseworkerEvents.ATTACH_VIA_BULK_SCAN);
    await super.clickSubmit();
  }
}