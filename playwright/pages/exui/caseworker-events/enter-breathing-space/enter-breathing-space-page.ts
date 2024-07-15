import { AllMethodsStep } from '../../../../decorators/test-steps';
import BasePage from '../../../../base/base-page';
import CaseworkerEvents from '../../../../enums/events/caseworker-events';
import CCDCaseData from '../../../../types/case-data/ccd-case-data';
import ExuiEvent from '../../exui-event/exui-event';
import { heading, inputs, radioButtons } from './enter-breathing-space-content';
import DateHelper from '../../../../helpers/date-helper';

@AllMethodsStep
export default class EnterBreathingSpacePage extends ExuiEvent(BasePage) {

  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
    ]);

    await super.clickSubmit();

    await super.runVerifications([
      super.expectLabel(inputs.refNum.label),
      super.expectText(inputs.respiteStart.label),
      super.expectLabel(radioButtons.standardBreathingSpace.label),
      super.expectLabel(radioButtons.mentalHealth.label),
      super.expectText(inputs.respiteEnd.label),
    ]);
  }

  async enterBreathingSpaceDetails() {
    await super.fill('Ref-1234', inputs.refNum.selector);

    const startDate = DateHelper.subtractFromToday({days: 1});
    await super.fill(startDate.getDate(), inputs.respiteStart.day.selector);
    await super.fill(startDate.getMonth(), inputs.respiteStart.month.selector);
    await super.fill(startDate.getFullYear(), inputs.respiteStart.year.selector);

    await super.retryClickBySelector(
      radioButtons.standardBreathingSpace.selector, 
      () => super.expectOptionChecked(radioButtons.standardBreathingSpace.selector, {timeout: 1000}),
    );

    const endDate = DateHelper.addToToday({months: 1});
    await super.fill(endDate.getDate(), inputs.respiteEnd.day.selector);
    await super.fill(endDate.getMonth(), inputs.respiteEnd.month.selector);
    await super.fill(endDate.getFullYear(), inputs.respiteEnd.year.selector);
  }

  async submitEvent() {
    await super.retryClickSubmit(() => super.verifyEventSummaryContent({timeout: 2000}));
    await super.fillEventDetails(CaseworkerEvents.ENTER_BREATHING_SPACE);
    await super.clickSubmit();
  }
}