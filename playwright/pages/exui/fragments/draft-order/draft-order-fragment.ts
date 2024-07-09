import BasePage from "../../../../base/base-page";
import { AllMethodsStep } from "../../../../decorators/test-steps";
import CCDCaseData from "../../../../types/case-data/ccd-case-data";
import { dropdowns, legends } from "./draft-order-content";

@AllMethodsStep
export default class DraftOrderFragment extends BasePage {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await Promise.all([
      super.expectLink(ccdCaseData.previousServiceCaseReference),
      super.expectText(legends.draftOrder),
    ])
  }

  async assignTo() {
    await super.selectFromDropdown(dropdowns.assignTo.options[0], dropdowns.assignTo.selector);
  }
}