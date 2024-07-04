import { AllMethodsStep } from '../../../../decorators/test-steps';
import BasePage from '../../../../base/base-page';
import ExuiEvent from '../../mixins/exui-event/exui-event';
import CaseworkerEvents from '../../../../enums/events/caseworker-events';
import CCDCaseData from '../../../../types/case-data/ccd-case-data';
import filePaths from '../../../../config/file-paths';
import { dropdowns, heading, subHeadings } from './review-ocon9x-paper-response-content';

@AllMethodsStep
export default class ReviewOcon9xPaperResponsePage extends ExuiEvent(BasePage) {

  async verifyContent(caseData: CCDCaseData) {
    await Promise.all([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      super.expectSubHeading(subHeadings.scannedDocs),
    ]);
  }

  async chooseOcon9xDoc() {
    await super.selectFromDropdown(dropdowns.ocon9xDoc.options[0], dropdowns.ocon9xDoc.selector);
    await super.clickSubmit();
  }

  async submitEvent() {
    await super.fillEventDetails(CaseworkerEvents.PAPER_RESP_REVIEWED);
    await super.verifyEventSummaryContent();
    await super.clickSubmit();
  }
}