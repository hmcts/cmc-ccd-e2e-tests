import { AllMethodsStep } from '../../../../decorators/test-steps';
import BasePage from '../../../../base/base-page';
import {headings, label, hwfNumber} from './hwf-number-invalid-content';
import ExuiEvent from '../../mixins/exui-event/exui-event';
import CaseworkerEvents from '../../../../enums/events/caseworker-events';
import CCDCaseData from '../../../../types/case-data/ccd-case-data';

export default class InvalidHwfNumberPage extends ExuiEvent(BasePage) {

  async verifyContent(caseData: CCDCaseData) {
    await Promise.all([
      super.expectHeading(headings.pageTitle),
      super.verifyCaseTitle(caseData),
      super.expectHeading(headings.hwfNumberAndCaseTitle),
      //super.expectLabel(label),
      //super.expectText(hwfNumber),
    ]);
  }

  async submitEvent() {
    await super.clickSubmit();
    await super.verifyEventSummaryContent();
    await super.fillEventDetails(CaseworkerEvents.INVALID_HWF_REF);
    await super.clickSubmit();
  }
}