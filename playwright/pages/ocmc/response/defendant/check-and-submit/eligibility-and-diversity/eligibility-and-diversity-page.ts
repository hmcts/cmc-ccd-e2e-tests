import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import OcmcEvent from '../../../../ocmc-event/ocmc-event';
import { buttons, heading } from './eligibility-and-diversity-content';

@AllMethodsStep()
export default class EligibilityAndDiversityPage extends OcmcEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([super.expectHeading(heading)]);
  }

  async chooseNoEligibiltyQuestions() {
    await super.clickBySelector(buttons.noEligibilityQuestions.selector);
  }

  async chooseYesEligibiltyQuestions() {
    await super.clickBySelector(buttons.yesEligibilityQuestions.selector);
  }
}
