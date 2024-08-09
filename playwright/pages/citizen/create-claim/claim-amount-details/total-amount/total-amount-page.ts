import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CitizenEvent from '../../../citizen-event/citizen-event';
import { heading } from './total-amount-content';

@AllMethodsStep()
export default class TotalAmountPage extends CitizenEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([super.expectHeading(heading)]);
  }

  async saveAndContinue() {
    await super.clickSaveAndContinue();
  }
}
