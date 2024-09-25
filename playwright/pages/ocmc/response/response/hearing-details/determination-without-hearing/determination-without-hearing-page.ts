import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import OcmcEvent from '../../../../ocmc-event/ocmc-event';
import { heading, inputs, paragraphs, radioButtons } from './determination-without-hearing-content';

@AllMethodsStep()
export default class DeterminationWithoutHearingPage extends OcmcEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectText(paragraphs.descriptionText1),
      super.expectText(paragraphs.descriptionText2),
    ]);
  }

  async chooseNoDeterminationWithoutHearing() {
    await super.clickBySelector(radioButtons.noDeterminationWithoutHearing.selector);
    await super.inputText('No reason', inputs.why.selector);
    await super.clickSaveAndContinue();
  }
}
