import BasePage from '../../../../base/base-page';
import DateHelper from '../../../../helpers/date-helper';
import filePaths from '../../../../config/file-paths';
import { doc1Dropdowns, doc1Inputs, doc2Dropdowns, doc2Inputs, subHeadings, buttons } from './staff-documents-content';
import ExuiEvent from '../../exui-event/exui-event';

export default class StaffDocumentsFragment extends ExuiEvent(BasePage) {
  
  async verifyContent() {
    await super.runVerifications([
      super.expectSubHeading(subHeadings.staffUploadedDocs),
    ]);
  }

  async addDocument() {
    await super.clickBySelector(buttons.addNewTop.selector);
  }

  private async enterDoc1Details(docTypeIndex: number) {
    const date = DateHelper.addToToday({years: 1});
    await super.fill(doc1Inputs.docName.value, doc1Inputs.docName.selector);

    await super.fill(DateHelper.getTwoDigitDay(date), doc1Inputs.docDay.selector);
    await super.fill(DateHelper.getTwoDigitMonth(date), doc1Inputs.docMonth.selector);
    await super.fill(date.getFullYear(), doc1Inputs.docYear.selector);

    await super.fill('08', doc1Inputs.docHour.selector);
    await super.fill('08', doc1Inputs.docMinute.selector);
    await super.fill('08', doc1Inputs.docSecond.selector);

    await super.uploadFile(filePaths.testPdfFile, doc1Inputs.fileUpload.selector);

    await super.selectFromDropdown(doc1Dropdowns.docType.options[docTypeIndex], doc1Dropdowns.docType.selector);
  }

  private async enterDoc2Details(docTypeIndex: number) {
    await super.fill(doc2Inputs.docName.value, doc2Inputs.docName.selector);

    await super.selectFromDropdown(doc2Dropdowns.docType.options[docTypeIndex], doc2Dropdowns.docType.selector);
    await super.fill(doc2Inputs.otherDocType.value, doc2Inputs.otherDocType.selector);

    await super.uploadFile(filePaths.testPdfFile, doc2Inputs.fileUpload.selector);
  }

  async enterCorrespondenceDoc1Details() {
    await this.enterDoc1Details(0);
  }

  async enterMediationDoc1Details() {
    await this.enterDoc1Details(1);
  } 

  async enterOtherDoc2Details() {
    await this.enterDoc2Details(2);
    await super.fill(doc2Inputs.otherDocType.value, doc2Inputs.otherDocType.selector);
  }

  async submitEvent() {
    throw new Error('Method not implemented.');
  }
}