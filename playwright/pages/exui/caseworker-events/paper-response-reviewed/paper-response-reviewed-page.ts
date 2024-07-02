import { buttons, dropdowns, heading, inputs, radioButtons, subHeadings } from './paper-response-reviewed-content';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import BasePage from '../../../../base/base-page';
import ExuiEvent from '../../mixins/exui-event';
import CaseworkerEvents from '../../../../enums/events/caseworker-events';
import CCDCaseData from '../../../../types/case-data/ccd-case-data';
import filePaths from '../../../../config/filePaths';

@AllMethodsStep
export default class PaperResponseReviewedPage extends ExuiEvent(BasePage) {

  async verifyContent(caseData: CCDCaseData) {
    await Promise.all([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
    ]);
  }

  async chooseBulkScanOrEmail() {
    await super.selectFromDropdown(dropdowns.responseType.options.bulkScanOrEmail, dropdowns.responseType.selector);
    await super.expectSubHeading(subHeadings.bulkScanOrEmail);
  }

  async enterOcon9xDocDetails() {
    await super.clickBySelector(buttons.addNewBulkOrEmailDoc.selector);
    await super.uploadFile(filePaths.testPdfFile, inputs.doc1Link.selector);
    await super.selectFromDropdown(dropdowns.doc1DocType.options.form, dropdowns.doc1DocType.selector);
    await super.selectFromDropdown(dropdowns.doc1DocSubType.options.ocon9x, dropdowns.doc1DocSubType.selector);
    await super.clickSubmit();
  }

  async noScannedDocReviewed() {
    await super.clickBySelector(radioButtons.noDocReviewed.selector);
    await super.clickSubmit();
  }

  async submitEvent() {
    await super.fillEventDetails(CaseworkerEvents.PAPER_RESP_REVIEWED);
    await super.verifyEventSummaryContent();
    await super.clickSubmit();
  }
}