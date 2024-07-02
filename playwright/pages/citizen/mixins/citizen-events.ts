import BasePage from '../../../base/base-page';
import { AllMethodsStep } from '../../../decorators/test-steps';
import { cButtons } from '../citizen-common-content';

export default function CitizenEvent<TBase extends abstract new (...args: any[]) => BasePage>(Base: TBase) {

  @AllMethodsStep
  abstract class CitizenEvent extends Base {
    protected async clickContinue() {
      await super.clickBySelector(cButtons.continue.selector);
    }

    protected async clickSubmit() {
      await super.clickBySelector(cButtons.submit.selector);
    }

    protected async clickSaveAndContinue() {
      await super.clickBySelector(cButtons.saveAndContinue.selector);
    }
  }

  return CitizenEvent;
}