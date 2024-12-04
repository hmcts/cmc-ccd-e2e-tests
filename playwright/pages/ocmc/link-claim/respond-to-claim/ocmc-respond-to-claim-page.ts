import BasePage from '../../../../base/base-page';
import urls from '../../../../config/urls';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import OcmcEvent from '../../ocmc-event/ocmc-event';
import { buttons, heading, paragraphs, subheadings } from './ocmc-respond-to-claim-content';

@AllMethodsStep()
export default class OcmcRespondToClaimPage extends OcmcEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectSubheading(subheadings.dontRespond),
      super.expectSubheading(subheadings.email),
      super.expectSubheading(subheadings.telephone),
      super.expectText(paragraphs.descriptionText1),
      super.expectText(paragraphs.descriptionText2),
      super.expectText(paragraphs.descriptionText3),
    ]);
  }

  async goToFirstContact() {
    await super.goTo(`${urls.ocmcFrontEnd}/first-contact/start`);
  }

  async start() {
    await super.clickBySelector(buttons.start.selector);
  }
}
