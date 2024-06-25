import { AllMethodsStep } from '../../../../decorators/test-steps';
import BasePage from '../../../../base/base-page';
import ExuiEvent from '../../mixins/exui-event';
import CaseworkerEvents from '../../../../enums/events/caseworker-events';
import { getCaseTitle } from '../../exui-common-content';
import { TruthyParams } from '../../../../decorators/truthy-params';
import CCDCaseData from '../../../../types/case-data/ccd-case-data';
import { buttons, heading, subHeadings, doc1Inputs, document1Dropdowns as doc1Dropdowns } from './manage-documents-content';
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
    await super.fill('Correspondence', doc1Inputs.docName.selector);

    await super.fill(DateHelper.getTwoDigitDay(date), doc1Inputs.docDay.selector);
    await super.fill(DateHelper.getTwoDigitMonth(date), doc1Inputs.docMonth.selector);
    await super.fill(date.getFullYear(), doc1Inputs.docYear.selector);

    await super.fill('08', doc1Inputs.docHour.selector);
    await super.fill('08', doc1Inputs.docMinute.selector);
    await super.fill('08', doc1Inputs.docSecond.selector);

    await super.selectFromDropdown(doc1Dropdowns.docType.options.correspondence, doc1Dropdowns.docType.selector);
    await super.uploadFile(filePaths.testPdfFile, doc1Inputs.fileUpload.selector);
  } 

  async submitEvent() {
    await super.clickSubmit();
    await super.verifyEventSummaryContent();
    await super.fillEventDetails(CaseworkerEvents.MANAGE_DOCUMENTS);
    await super.clickSubmit();
  }
}
