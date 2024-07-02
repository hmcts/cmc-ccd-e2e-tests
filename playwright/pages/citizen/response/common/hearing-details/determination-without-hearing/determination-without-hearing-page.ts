import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import CitizenEvent from '../../../../mixins/citizen-events';
import { heading, inputs, paragraphs, radioButtons } from './determination-without-hearing-content';

@AllMethodsStep
export default class DeterminationWithoutHearingPage extends CitizenEvent(BasePage) {

  async verifyContent() {
    await Promise.all([
      super.expectHeading(heading),
      super.expectText(paragraphs.descriptionText1),
      super.expectText(paragraphs.descriptionText2),
    ]);
  }

  async chooseNoDeterminationWithoutHearing() {
    await super.clickBySelector(radioButtons.noDeterminationWithoutHearing.selector);
    await super.fill('No reason', inputs.why.selector);
    await super.clickSaveAndContinue();
  }
}