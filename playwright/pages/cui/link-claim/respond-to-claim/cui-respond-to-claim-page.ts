import BasePage from '../../../../base/base-page';
import urls from '../../../../config/urls';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import CuiEvent from '../../cui-event/cui-event';
import { buttons, heading, paragraphs, subHeadings } from './cui-respond-to-claim-content';

@AllMethodsStep()
export default class CuiRespondToClaimPage extends CuiEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectSubHeading(subHeadings.dontRespond),
      super.expectText(paragraphs.descriptionText1),
      super.expectText(paragraphs.descriptionText2),
      super.expectText(paragraphs.descriptionText3),
    ]);
  }

  async goToFirstContact() {
    await super.goTo(`${urls.cuiFrontEnd}/first-contact/start`);
  }

  async start() {
    await super.clickBySelector(buttons.start.selector);
  }
}
