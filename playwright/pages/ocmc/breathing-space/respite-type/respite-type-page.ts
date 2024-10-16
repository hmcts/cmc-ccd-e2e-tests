import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import OcmcEvent from '../../ocmc-event/ocmc-event';
import { heading, radioButtons } from './respite-type-content';

@AllMethodsStep()
export default class RespiteTypePage extends OcmcEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectLabel(radioButtons.standard.label),
      super.expectLabel(radioButtons.mentalHealth.label),
    ]);
  }

  async selectStandardBreathingSpace() {
    await super.clickBySelector(radioButtons.standard.selector);
    await super.clickSaveAndContinue();
  }
}
