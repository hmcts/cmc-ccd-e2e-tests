import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import CitizenEvent from '../../../../citizen-event/citizen-event';
import { checkBoxes, heading, subHeadings } from './defendant-response-check-your-answers-content';

@AllMethodsStep()
export default class DefendantResponseCheckYourAnswersPage extends CitizenEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectSubHeading(subHeadings.yourDetails),
      super.expectSubHeading(subHeadings.yourResponse),
      super.expectSubHeading(subHeadings.responseDetails),
      super.expectSubHeading(subHeadings.mediation),
      super.expectSubHeading(subHeadings.hearingRequirements),
      super.expectSubHeading(subHeadings.statementOfTruth),
    ]);
  }

  async submit() {
    await super.clickBySelector(checkBoxes.signed.selector);
    await super.clickBySelector(checkBoxes.dqSigned.selector);
    await super.clickSubmit();
  }
}
