import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import OcmcEvent from '../../../../ocmc-event/ocmc-event';
import { buttons, heading, subheadings } from './defendant-response-confirmation-content';

@AllMethodsStep()
export default class DefendantResponseConfirmationPage extends OcmcEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectSubheading(subheadings.happensNext),
      super.expectSubheading(subheadings.settleOutCourt),
      super.expectSubheading(subheadings.email),
      super.expectSubheading(subheadings.telephone),
    ]);
  }

  async goToAccount() {
    await super.clickBySelector(buttons.account.selector);
    await super.expectUrlEnd('/dashboard');
  }
}
