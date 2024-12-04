import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import OcmcEvent from '../../../../ocmc-event/ocmc-event';
import { checkBoxes, heading, subheadings } from './defendant-response-check-your-answers-content';

@AllMethodsStep()
export default class DefendantResponseCheckYourAnswersPage extends OcmcEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectSubheading(subheadings.yourDetails),
      super.expectSubheading(subheadings.yourResponse),
      super.expectSubheading(subheadings.responseDetails),
      super.expectSubheading(subheadings.mediation),
      super.expectSubheading(subheadings.hearingRequirements),
      super.expectSubheading(subheadings.statementOfTruth),
    ]);
  }

  async submit() {
    await super.clickBySelector(checkBoxes.signed.selector);
    await super.clickBySelector(checkBoxes.dqSigned.selector);
    await super.clickSubmit();
  }
}
