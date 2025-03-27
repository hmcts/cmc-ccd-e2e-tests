import { AllMethodsStep } from '../../../../../decorators/test-steps';
import BasePage from '../../../../../base/base-page';
import CCDCaseData from '../../../../../models/case-data/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';
import { heading, inputs, radioButtons } from './enter-breathing-space-2-content';
import DateHelper from '../../../../../helpers/date-helper';

@AllMethodsStep()
export default class EnterBreathingSpace2Page extends ExuiPage(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      super.expectLabel(inputs.refNum.label),
      super.expectText(inputs.respiteStart.label),
      super.expectLabel(radioButtons.standardBreathingSpace.label),
      super.expectLabel(radioButtons.mentalHealth.label),
      super.expectText(inputs.respiteEnd.label),
    ]);
  }

  async enterBreathingSpaceDetails() {
    await super.inputText('Ref-1234', inputs.refNum.selector);

    const startDate = DateHelper.subtractFromToday({ days: 1 });
    await super.inputText(DateHelper.getTwoDigitDay(startDate), inputs.respiteStart.day.selector);
    await super.inputText(
      DateHelper.getTwoDigitMonth(startDate),
      inputs.respiteStart.month.selector,
    );
    await super.inputText(startDate.getFullYear(), inputs.respiteStart.year.selector);

    await super.retryClickBySelectorTimeout(radioButtons.standardBreathingSpace.selector, () =>
      super.expectOptionChecked(radioButtons.standardBreathingSpace.selector, { timeout: 500 }),
    );

    const endDate = DateHelper.addToToday({ months: 1 });
    await super.inputText(DateHelper.getTwoDigitDay(endDate), inputs.respiteEnd.day.selector);
    await super.inputText(DateHelper.getTwoDigitMonth(endDate), inputs.respiteEnd.month.selector);
    await super.inputText(endDate.getFullYear(), inputs.respiteEnd.year.selector);
  }

  async submit() {
    await super.retryClickSubmit(() => super.expectNoSelector(inputs.refNum.selector));
  }
}
