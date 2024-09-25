import BasePage from '../../../base/base-page';
import { AllMethodsStep } from '../../../decorators/test-steps';
import { buttons } from './cui-event-content';

export default function CuiEvent<TBase extends abstract new (...args: any[]) => BasePage>(
  Base: TBase,
) {
  @AllMethodsStep()
  abstract class cuiEvent extends Base {
    protected async clickContinue() {
      await super.clickBySelector(buttons.continue.selector);
    }

    protected async clickSubmit() {
      await super.clickBySelector(buttons.submit.selector);
    }

    protected async clickSaveAndContinue() {
      await super.clickBySelector(buttons.saveAndContinue.selector);
    }
  }

  return cuiEvent;
}
