import { AllMethodsStep } from '../../../../../decorators/test-steps';
import BasePage from '../../../../../base/base-page';
import ExuiPage from '../../../exui-page/exui-page';
import CCDCaseData from '../../../../../models/case-data/ccd-case-data';
import { dropdowns, heading, subheadings } from './review-ocon9x-paper-response-content';

@AllMethodsStep()
export default class ReviewOcon9xPaperResponsePage extends ExuiPage(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      super.expectSubheading(subheadings.scannedDocs),
    ]);
  }

  async chooseOcon9xDoc() {
    await super.selectFromDropdown(dropdowns.ocon9xDoc.options[0], dropdowns.ocon9xDoc.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
