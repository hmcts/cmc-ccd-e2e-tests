import BasePage from '../../../../../base/base-page';
import ExuiEvent from '../../../exui-event/exui-event';
import CCDCaseData from '../../../../../types/case-data/ccd-case-data';
import { heading, inputs, subHeadings } from './mediation-successful-1-content';
import DateHelper from '../../../../../helpers/date-helper';

export default class MediationSuccessful1Page extends ExuiEvent(BasePage) {

  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      super.expectSubHeading(subHeadings.defendants),
      super.expectText(caseData.respondents[0].value.claimantProvidedPartyName, {exact: true}),
    ]);
  }

  async enterMediationDate() {
    const date = DateHelper.subtractFromToday({days: 1});
    await super.inputText(date.getDate(), inputs.mediationDay.selector);
    await super.inputText(date.getMonth(), inputs.mediationMonth.selector);
    await super.inputText(date.getFullYear(), inputs.mediationYear.selector);
    await super.clickSubmit();
  }

  async submitEvent() {
    throw new Error('Method not implemented.');
  }
}