import { AllMethodsStep } from '../../../../../decorators/test-steps';
import BasePage from '../../../../../base/base-page';
import ExuiEvent from '../../../exui-event/exui-event';
import CCDCaseData from '../../../../../types/case-data/ccd-case-data';
import { dropdowns, heading, subHeadings } from './review-ocon9x-paper-response-content';

@AllMethodsStep()
export default class ReviewOcon9xPaperResponsePage extends ExuiEvent(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      super.expectSubHeading(subHeadings.scannedDocs),
    ]);
  }

  async chooseOcon9xDoc() {
    await super.selectFromDropdown(dropdowns.ocon9xDoc.options[0], dropdowns.ocon9xDoc.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
