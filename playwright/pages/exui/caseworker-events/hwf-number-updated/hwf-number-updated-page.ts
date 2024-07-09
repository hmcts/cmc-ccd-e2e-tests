import { AllMethodsStep } from '../../../../decorators/test-steps';
import BasePage from '../../../../base/base-page';
import {headings, inputs} from './hwf-number-updated-content';
import ExuiEvent from '../../mixins/exui-event/exui-event';
import CaseworkerEvents from '../../../../enums/events/caseworker-events';
import CCDCaseData from '../../../../types/case-data/ccd-case-data';

export default class UpdatedHwfNumberPage extends ExuiEvent(BasePage) {

  async verifyContent(caseData: CCDCaseData) {
    await Promise.all([
      super.expectHeading(headings.pageTitle),
      super.verifyCaseTitle(caseData),
      super.expectHeading(headings.hwfNumberAndCaseTitle),
    ]);
  }

  async enterHwfNumber() {
    super.fill(inputs.helpWithFeesNumber.text, inputs.helpWithFeesNumber.selector);
  }

  async submitEvent() {
    await super.clickSubmit();
    await super.verifyEventSummaryContent();
    await super.fillEventDetails(CaseworkerEvents.UPDATED_HWF_NUM);
    await super.clickSubmit();
  }
}