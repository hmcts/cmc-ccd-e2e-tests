import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import OcmcEvent from '../../../../ocmc-event/ocmc-event';
import { heading, paragraphs, radioButtons } from './witnesses-content';

@AllMethodsStep()
export default class WitnessesPage extends OcmcEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectText(paragraphs.descriptionText),
      super.expectLabel(radioButtons.yesWitnesses.label),
      super.expectLabel(radioButtons.noWitnesses.label),
    ]);
  }

  async noWitnesses() {
    await super.clickBySelector(radioButtons.noWitnesses.selector);
    await super.clickSaveAndContinue();
  }
}
