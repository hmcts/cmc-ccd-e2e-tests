import { AllMethodsStep } from '../../../../../decorators/test-steps';
import BasePage from '../../../../../base/base-page';
import ExuiEvent from '../../../exui-event/exui-event';
import CCDCaseData from '../../../../../types/case-data/ccd-case-data';
import { dropdowns, heading, subHeadings } from './mediation-unsuccessful-content';

@AllMethodsStep()
export default class MediationUnsuccessfulPage extends ExuiEvent(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([super.expectHeading(heading), super.verifyCaseTitle(caseData), super.expectSubHeading(subHeadings.defendants), super.expectText(caseData.respondents[0].value.claimantProvidedPartyName, { exact: true })]);
  }

  async chooseMediationFailedReason() {
    await super.selectFromDropdown(dropdowns.reason.options[0], dropdowns.reason.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
