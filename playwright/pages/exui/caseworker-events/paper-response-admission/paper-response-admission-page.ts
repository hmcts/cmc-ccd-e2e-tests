import { AllMethodsStep } from '../../../../decorators/test-steps';
import BasePage from '../../../../base/base-page';
import ExuiEvent from '../../mixins/exui-event';
import CaseworkerEvents from '../../../../enums/events/caseworker-events';
import CCDCaseData from '../../../../types/case-data/ccd-case-data';
import { heading, radioButtons } from './paper-response-admission-content';

@AllMethodsStep
export default class PaperResponseAdmissionPage extends ExuiEvent(BasePage) {

  async verifyContent(caseData: CCDCaseData) {
    await Promise.all([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      super.expectLabel(radioButtons.fullAdmit.label),
      super.expectLabel(radioButtons.partAdmit.label),
    ]);
  }

  async chooseFullAdmit() {
    await super.clickBySelector(radioButtons.fullAdmit.selector);
    await super.clickSubmit();
  }

  async submitEvent() {
    await super.fillEventDetails(CaseworkerEvents.PAPER_RESP_ADMISSIOON);
    await super.verifyEventSummaryContent();
    await super.clickSubmit();
  }
}