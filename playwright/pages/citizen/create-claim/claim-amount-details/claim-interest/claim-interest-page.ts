import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CitizenEvent from '../../../citizen-event/citizen-event';
import { heading, radioButtons } from './claim-interest-content';

@AllMethodsStep()
export default class ClaimInterestPage extends CitizenEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([super.expectHeading(heading)]);
  }

  async selectNoInterest() {
    await super.clickBySelector(radioButtons.noInterest.selector);
    await super.clickSaveAndContinue();
  }
}
