import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import CitizenEvent from '../../../../mixins/citizen-events/citizen-events';
import { buttons, heading, paragraphs } from './expert-content';

@AllMethodsStep
export default class ExpertPage extends CitizenEvent(BasePage) {

  async verifyContent() {
    await Promise.all([
      super.expectHeading(heading),
      super.expectText(paragraphs.descriptionText1),
      super.expectText(paragraphs.descriptionText2),
    ]);
  }

  async chooseNoExpert() {
    await super.clickBySelector(buttons.noExpert.selector);
  }
}