import { AllMethodsStep } from '../../../../../decorators/test-steps';
import BasePage from '../../../../../base/base-page';
import ExuiPage from '../../../exui-page/exui-page';
import CCDCaseData from '../../../../../models/case-data/ccd-case-data';
import { dropdowns, heading, subheadings } from './mediation-unsuccessful-content';

@AllMethodsStep()
export default class MediationUnsuccessfulPage extends ExuiPage(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      super.expectSubheading(subheadings.defendants),
      super.expectText(caseData.respondents[0].value.claimantProvidedPartyName, { exact: true }),
    ]);
  }

  async chooseMediationFailedReason() {
    await super.selectFromDropdown(dropdowns.reason.options[0], dropdowns.reason.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
