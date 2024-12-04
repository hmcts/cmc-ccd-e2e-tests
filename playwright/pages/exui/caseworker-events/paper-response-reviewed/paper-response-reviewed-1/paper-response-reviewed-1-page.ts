import {
  buttons,
  dropdowns,
  heading,
  inputs,
  subheadings,
} from './paper-response-reviewed-1-content';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import BasePage from '../../../../../base/base-page';
import ExuiEvent from '../../../exui-event/exui-event';
import CCDCaseData from '../../../../../models/case-data/ccd-case-data';
import filePaths from '../../../../../config/file-paths';

@AllMethodsStep()
export default class PaperResponseReviewed1Page extends ExuiEvent(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([super.expectHeading(heading), super.verifyCaseTitle(caseData)]);
  }

  async chooseBulkScanOrEmail() {
    await super.selectFromDropdown(
      dropdowns.responseType.options[0],
      dropdowns.responseType.selector,
    );
    await super.expectSubheading(subheadings.bulkScanOrEmail);
  }

  async enterOcon9xDocDetails() {
    await super.clickBySelector(buttons.addNewBulkOrEmailDoc.selector);
    await super.retryUploadFile(filePaths.testPdfFile, inputs.doc1Link.selector);
    await super.selectFromDropdown(
      dropdowns.doc1DocType.options[0],
      dropdowns.doc1DocType.selector,
    );
    await super.selectFromDropdown(
      dropdowns.doc1DocSubType.options[0],
      dropdowns.doc1DocSubType.selector,
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
