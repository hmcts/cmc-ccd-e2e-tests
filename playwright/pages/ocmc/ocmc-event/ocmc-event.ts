import BasePage from '../../../base/base-page';
import { AllMethodsStep } from '../../../decorators/test-steps';
import { buttons } from './ocmc-event-content';

export default function OcmcEvent<TBase extends abstract new (...args: any[]) => BasePage>(
  Base: TBase,
) {
  @AllMethodsStep()
  abstract class OcmcEvent extends Base {
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

  return OcmcEvent;
}
