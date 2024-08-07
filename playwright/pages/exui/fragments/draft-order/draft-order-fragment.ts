import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import CCDCaseData from '../../../../types/case-data/ccd-case-data';
import ExuiEvent from '../../exui-event/exui-event';
import { dropdowns, legends } from './draft-order-content';

@AllMethodsStep()
export default class DraftOrderFragment extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.expectLink(ccdCaseData.previousServiceCaseReference), super.expectText(legends.draftOrder)], { axe: false });
  }

  async assignTo() {
    await super.selectFromDropdown(dropdowns.assignTo.options[0], dropdowns.assignTo.selector);
  }

  async submit() {
    throw new Error('Method not implemented.');
  }
}
