import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import CitizenEvent from '../../../../citizen-event/citizen-event';
import { heading, radioButtons } from './more-time-content';

@AllMethodsStep()
export default class MoreTimePage extends CitizenEvent(BasePage){
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectText(radioButtons.moreTimeYes.label),
      super.expectText(radioButtons.moreTimeNo.label),
    ]);
  }

  async chooseNo() {
    await super.clickBySelector(radioButtons.moreTimeNo.selector);
    await super.clickSaveAndContinue();
  }

}