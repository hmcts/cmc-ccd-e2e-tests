import { AllMethodsStep } from '../../../../decorators/test-steps';
import BasePage from '../../../../base/base-page';
import ExuiEvent from '../../mixins/exui-event';
import CaseworkerEvents from '../../../../enums/events/caseworker-events';
import { getCaseTitle } from '../../exui-common-content';
import CCDCaseData from '../../../../types/case-data/ccd-case-data';
import { buttons, heading, subHeadings, doc1Inputs, doc1Dropdowns, doc2Inputs, doc2Dropdowns } from './manage-documents-content';
import DateHelper from '../../../../helpers/date-helper';
import filePaths from '../../../../config/filePaths';

@AllMethodsStep
export default class ManageDocumentsPage extends ExuiEvent(BasePage) {

  async verifyContent(caseData: CCDCaseData) {
    await Promise.all([
      super.expectHeading(heading),
      super.expectHeading(getCaseTitle(caseData)),
      super.expectSubHeading(subHeadings.staffUploadedDocs),
    ]);
  }

  async addDocument() {
    await super.clickBySelector(buttons.addNewTop.selector);
  }

  async fillDocument1Details() {
    const date = DateHelper.addToToday({years: 1});
    await super.fill(doc1Inputs.docName.value, doc1Inputs.docName.selector);

    await super.fill(DateHelper.getTwoDigitDay(date), doc1Inputs.docDay.selector);
    await super.fill(DateHelper.getTwoDigitMonth(date), doc1Inputs.docMonth.selector);
    await super.fill(date.getFullYear(), doc1Inputs.docYear.selector);

    await super.fill('08', doc1Inputs.docHour.selector);
    await super.fill('08', doc1Inputs.docMinute.selector);
    await super.fill('08', doc1Inputs.docSecond.selector);

    await super.selectFromDropdown(doc1Dropdowns.docType.options.correspondence, doc1Dropdowns.docType.selector);
    await super.uploadFile(filePaths.testPdfFile, doc1Inputs.fileUpload.selector);
  } 

  async fillDocument2Details() {
    await super.fill(doc2Inputs.docName.value, doc2Inputs.docName.selector);

    await super.selectFromDropdown(doc2Dropdowns.docType.options.other, doc2Dropdowns.docType.selector);
    await super.fill(doc2Inputs.otherDocType.value, doc2Inputs.otherDocType.selector);

    await super.uploadFile(filePaths.testPdfFile, doc2Inputs.fileUpload.selector);
  }

  async submitEvent() {
    await super.clickSubmit();
    await super.verifyEventSummaryContent();
    await super.fillEventDetails(CaseworkerEvents.MANAGE_DOCUMENTS);
    await super.clickSubmit();
  }
}
