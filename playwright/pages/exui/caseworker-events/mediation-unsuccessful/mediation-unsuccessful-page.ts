import { AllMethodsStep } from '../../../../decorators/test-steps';
import BasePage from '../../../../base/base-page';
import ExuiEvent from '../../mixins/exui-event/exui-event';
import CCDCaseData from '../../../../types/case-data/ccd-case-data';
import { dropdowns, heading, subHeadings } from './mediation-unsuccessful-content';
import CaseworkerEvents from '../../../../enums/events/caseworker-events';

@AllMethodsStep
export default class MediationUnsuccessfulPage extends ExuiEvent(BasePage) {

  async verifyContent(caseData: CCDCaseData) {
    await Promise.all([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      super.expectSubHeading(subHeadings.defendants),
      super.expectText(caseData.respondents[0].value.claimantProvidedPartyName,  {exact: true}),
    ]);
  }

  async chooseMediationFailedReason() {
    await super.selectFromDropdown(dropdowns.reason.options[0], dropdowns.reason.selector);
  }

  async submitEvent() {
    await super.clickSubmit();
    await super.verifyEventSummaryContent();
    await super.fillEventDetails(CaseworkerEvents.MEDIATION_FAILED);
    await super.clickSubmit();
  }
}