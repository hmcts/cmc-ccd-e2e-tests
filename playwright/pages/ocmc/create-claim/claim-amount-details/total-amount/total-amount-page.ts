import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import OcmcEvent from '../../../ocmc-event/ocmc-event';
import { heading } from './total-amount-content';

@AllMethodsStep()
export default class TotalAmountPage extends OcmcEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([super.expectHeading(heading)]);
  }

  async saveAndContinue() {
    await super.clickSaveAndContinue();
  }
}
