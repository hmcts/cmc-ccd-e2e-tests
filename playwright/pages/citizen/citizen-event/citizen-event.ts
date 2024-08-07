import BasePage from '../../../base/base-page';
import { AllMethodsStep } from '../../../decorators/test-steps';
import { buttons } from './citizen-event-content';

export default function CitizenEvent<TBase extends abstract new (...args: any[]) => BasePage>(Base: TBase) {
  @AllMethodsStep()
  abstract class CitizenEvent extends Base {
    protected async clickContinue() {
      await super.clickBySelector(buttons.continue.selector);
    }

    protected async retryClickSubmit() {
      await super.clickBySelector(buttons.submit.selector);
    }

    protected async clickSaveAndContinue() {
      await super.clickBySelector(buttons.saveAndContinue.selector);
    }
  }

  return CitizenEvent;
}
