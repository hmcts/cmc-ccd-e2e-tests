import { AllMethodsStep } from '../../../../../decorators/test-steps';
import BasePage from '../../../../../base/base-page';
import ExuiEvent from '../../../mixins/exui-event/exui-event';
import CCDCaseData from '../../../../../types/case-data/ccd-case-data';
import { heading, doc1Inputs, doc2Inputs, doc1Dropdowns, doc2Dropdowns, subHeadings, buttons } from './mediation-successful-2-content';
import DateHelper from '../../../../../helpers/date-helper';
import filePaths from '../../../../../config/file-paths';
import CaseworkerEvents from '../../../../../enums/events/caseworker-events';

@AllMethodsStep
export default class MediationSuccessful2Page extends ExuiEvent(BasePage) {

  async verifyContent(caseData: CCDCaseData) {
    await Promise.all([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      super.expectSubHeading(subHeadings.documents),
    ]);
  }

  async addDocument() {
    await super.clickBySelector(buttons.addNewDocTop.selector);
  }

  async enterDocument1Details() {
    const date = DateHelper.addToToday({years: 1});
    await super.fill(doc1Inputs.docName.value, doc1Inputs.docName.selector);

    await super.fill(DateHelper.getTwoDigitDay(date), doc1Inputs.docDay.selector);
    await super.fill(DateHelper.getTwoDigitMonth(date), doc1Inputs.docMonth.selector);
    await super.fill(date.getFullYear(), doc1Inputs.docYear.selector);

    await super.fill('08', doc1Inputs.docHour.selector);
    await super.fill('08', doc1Inputs.docMinute.selector);
    await super.fill('08', doc1Inputs.docSecond.selector);

    await super.selectFromDropdown(doc1Dropdowns.docType.options[0], doc1Dropdowns.docType.selector);
    await super.uploadFile(filePaths.testPdfFile, doc1Inputs.fileUpload.selector);
  } 

  async enterDocument2Details() {
    await super.fill(doc2Inputs.docName.value, doc2Inputs.docName.selector);

    await super.selectFromDropdown(doc2Dropdowns.docType.options[1], doc2Dropdowns.docType.selector);

    await super.uploadFile(filePaths.testPdfFile, doc2Inputs.fileUpload.selector);
  }

  async submitEvent() {
    await super.clickSubmit();
    await super.verifyEventSummaryContent();
    await super.fillEventDetails(CaseworkerEvents.MEDIATION_SUCCESSFUL);
    await super.clickSubmit();
  }
}