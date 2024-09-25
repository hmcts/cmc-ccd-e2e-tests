import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import OcmcEvent from '../../../../ocmc-event/ocmc-event';
import { heading, radioButtons } from './hearing-dates-content';

@AllMethodsStep()
export default class HearingDatesPage extends OcmcEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectText(radioButtons.yesHearingDates.label),
      super.expectText(radioButtons.noHearingDates.label, { exact: true }),
    ]);
  }

  async chooseNoHearingDates() {
    await super.clickBySelector(radioButtons.noHearingDates.selector);
    await super.clickSaveAndContinue();
  }
}
