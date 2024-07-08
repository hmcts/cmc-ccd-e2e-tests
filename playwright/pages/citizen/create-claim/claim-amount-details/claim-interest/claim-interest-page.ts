import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CitizenEvent from '../../../mixins/citizen-events/citizen-events';
import { heading, radioButtons } from './claim-interest-content';

@AllMethodsStep
export default class ClaimInterestPage extends CitizenEvent(BasePage) {

  async verifyContent() {
    await Promise.all([
      super.expectHeading(heading),
    ]);
  }

  async selectNoInterest() {
    await super.clickBySelector(radioButtons.noInterest.selector);
    await super.clickSaveAndContinue();
  }
}