import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import CitizenEvent from '../../../../citizen-event/citizen-event';
import { heading, inputs, paragraphs } from './why-you-disagree-content';

@AllMethodsStep()
export default class WhyYouDisagreePage extends CitizenEvent(BasePage) {
  async verifyContent() {
    await Promise.all([
      super.expectHeading(heading),
      super.expectText(paragraphs.theirReasons),
      super.expectText(inputs.disagreeReason.label),
    ]);
  }

  async fillDisagreeReason() {
    await super.inputText('I do not agree with this claim', inputs.disagreeReason.selector);
    await super.clickSaveAndContinue();
  }
}
