import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import CitizenEvent from '../../../../mixins/citizen-events';
import { buttons, heading } from './eligibility-and-diversity-content';

@AllMethodsStep
export default class EligibilityAndDiversityPage extends CitizenEvent(BasePage) {

  async verifyContent() {
    await Promise.all([
      super.expectHeading(heading),
    ]);
  }

  async chooseNoEligibiltyQuestions() {
    await super.clickBySelector(buttons.noEligibilityQuestions.selector);
  }

  async chooseYesEligibiltyQuestions() {
    await super.clickBySelector(buttons.yesEligibilityQuestions.selector);
  }
}