import { AllMethodsStep } from '../../../../decorators/test-steps';
import BasePage from '../../../../base/base-page';
import CaseworkerEvents from '../../../../enums/events/caseworker-events';
import CCDCaseData from '../../../../models/case-data/ccd-case-data';
import ExuiEvent from '../../exui-event/exui-event';
import DateHelper from '../../../../helpers/date-helper';
import { heading, inputs } from './lift-breathing-space-content';

@AllMethodsStep()
export default class LiftBreathingSpacePage extends ExuiEvent(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([super.expectHeading(heading), super.verifyCaseTitle(caseData)]);

    await super.retryClickSubmit();

    await super.runVerifications([super.expectText(inputs.respiteEnd.label)]);
  }

  async enterBreathingSpaceDetails() {
    const endDate = DateHelper.addToToday({ months: 1 });
    await super.inputText(DateHelper.getTwoDigitDay(endDate), inputs.respiteEnd.day.selector);
    await super.inputText(DateHelper.getTwoDigitMonth(endDate), inputs.respiteEnd.month.selector);
    await super.inputText(endDate.getFullYear(), inputs.respiteEnd.year.selector);
  }

  async submit() {
    await super.retryClickSubmit(() => super.verifyEventSummaryContent({ timeout: 2000 }));
    await super.fillEventDetails(CaseworkerEvents.LIFT_BREATHING_SPACE);
    await super.retryClickSubmit();
  }
}
