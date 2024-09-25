import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import OcmcEvent from '../../../../ocmc-event/ocmc-event';
import { heading, paragraphs, radioButtons } from './self-witness-content';

@AllMethodsStep()
export default class SelfWitnessPage extends OcmcEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectText(paragraphs.descriptionText),
      super.expectLabel(radioButtons.yesGiveEvidence.label),
      super.expectLabel(radioButtons.noGiveEvidence.label),
    ]);
  }

  async chooseNoGiveEvidence() {
    await super.clickBySelector(radioButtons.noGiveEvidence.selector);
    await super.clickSaveAndContinue();
  }
}
