import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import CitizenEvent from '../../../../citizen-event/citizen-event';
import { heading, paragraphs, radioButtons } from './witnesses-content';

@AllMethodsStep
export default class WitnessesPage extends CitizenEvent(BasePage) {
  async verifyContent() {
    await Promise.all([
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