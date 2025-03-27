import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import CCDCaseData from '../../../../models/case-data/ccd-case-data';
import ExuiPage from '../../exui-page/exui-page';
import { dropdowns, legends } from './draft-order-content';

@AllMethodsStep()
export default class DraftOrderFragment extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.expectLink(ccdCaseData.previousServiceCaseReference),
        super.expectText(legends.draftOrder),
      ],
      { runAxe: false },
    );
  }

  async assignTo() {
    await super.selectFromDropdown(dropdowns.assignTo.options[0], dropdowns.assignTo.selector);
  }

  async submit() {
    throw new Error('Method not implemented.');
  }
}
