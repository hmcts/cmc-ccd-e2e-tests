import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import OcmcEvent from '../../../../ocmc-event/ocmc-event';
import { buttons, heading, subHeadings } from './defendant-response-confirmation-content';

@AllMethodsStep()
export default class DefendantResponseConfirmationPage extends OcmcEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectSubHeading(subHeadings.happensNext),
      super.expectSubHeading(subHeadings.settleOutCourt),
      super.expectSubHeading(subHeadings.email),
      super.expectSubHeading(subHeadings.telephone),
    ]);
  }

  async goToAccount() {
    await super.clickBySelector(buttons.account.selector);
    await super.expectUrlEnd('/dashboard');
  }
}
