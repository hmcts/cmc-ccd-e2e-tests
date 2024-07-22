import { AllMethodsStep } from '../../../../decorators/test-steps';
import BasePage from '../../../../base/base-page';
import {headings, inputs} from './hwf-number-updated-content';
import CaseworkerEvents from '../../../../enums/events/caseworker-events';
import CCDCaseData from '../../../../types/case-data/ccd-case-data';
import ExuiEvent from '../../exui-event/exui-event';

@AllMethodsStep()
export default class UpdatedHwfNumberPage extends ExuiEvent(BasePage) {

  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(headings.pageTitle),
      super.verifyCaseTitle(caseData),
      super.expectHeading(headings.hwfNumberAndCaseTitle),
    ]);
  }

  async enterHwfNumber() {
    super.inputText(inputs.helpWithFeesNumber.text, inputs.helpWithFeesNumber.selector);
  }

  async submitEvent() {
    await super.clickSubmit();
    await super.verifyEventSummaryContent();
    await super.fillEventDetails(CaseworkerEvents.UPDATED_HWF_NUM);
    await super.clickSubmit();
  }
}