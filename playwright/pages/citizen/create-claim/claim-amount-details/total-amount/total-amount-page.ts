import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CitizenEvent from '../../../mixins/citizen-events/citizen-events';
import {heading} from './total-amount-content';

@AllMethodsStep
export default class TotalAmountPage extends CitizenEvent(BasePage) {

  async verifyContent() {
    await Promise.all([
      super.expectHeading(heading),
    ]);
  }

  async clickSaveAndContinueOnTotalAmountPage() {
    await super.clickSaveAndContinue();
  }
}