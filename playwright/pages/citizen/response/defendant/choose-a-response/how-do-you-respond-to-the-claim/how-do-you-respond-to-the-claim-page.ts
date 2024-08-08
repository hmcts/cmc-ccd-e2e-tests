import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import CitizenEvent from '../../../../citizen-event/citizen-event';
import { heading, radioButtons } from './how-do-you-respond-to-claim-content';

@AllMethodsStep()
export default class HowDoYouRespondToClaimPage extends CitizenEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectText(radioButtons.admitAll.label),
      super.expectText(radioButtons.partAdmit.label),
      super.expectText(radioButtons.rejectAll.label),
    ]);
  }

  async rejectAll() {
    await super.clickBySelector(radioButtons.rejectAll.selector);
    await super.clickSaveAndContinue();
  }
}
