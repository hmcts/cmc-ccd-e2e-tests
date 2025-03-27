import BasePage from '../../../../../base/base-page';
import ExuiPage from '../../../exui-page/exui-page';
import CCDCaseData from '../../../../../models/case-data/ccd-case-data';
import { heading, inputs, subheadings } from './mediation-successful-1-content';
import DateHelper from '../../../../../helpers/date-helper';
import { AllMethodsStep } from '../../../../../decorators/test-steps';

@AllMethodsStep()
export default class MediationSuccessful1Page extends ExuiPage(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      super.expectSubheading(subheadings.defendants),
      super.expectText(caseData.respondents[0].value.claimantProvidedPartyName, { exact: true }),
    ]);
  }

  async enterMediationDate() {
    const date = DateHelper.subtractFromToday({ days: 1 });
    await super.inputText(DateHelper.getTwoDigitDay(date), inputs.mediationDay.selector);
    await super.inputText(DateHelper.getTwoDigitMonth(date), inputs.mediationMonth.selector);
    await super.inputText(date.getFullYear(), inputs.mediationYear.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
