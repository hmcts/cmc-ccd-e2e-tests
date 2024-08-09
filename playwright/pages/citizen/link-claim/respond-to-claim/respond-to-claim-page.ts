import BasePage from '../../../../base/base-page';
import urls from '../../../../config/urls';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import CitizenEvent from '../../citizen-event/citizen-event';
import { buttons, heading, paragraphs, subHeadings } from './respond-to-claim-content';

@AllMethodsStep()
export default class RespondToClaimPage extends CitizenEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectSubHeading(subHeadings.dontRespond),
      super.expectSubHeading(subHeadings.email),
      super.expectSubHeading(subHeadings.telephone),
      super.expectText(paragraphs.descriptionText1),
      super.expectText(paragraphs.descriptionText2),
      super.expectText(paragraphs.descriptionText3),
    ]);
  }

  async goToFirstContact() {
    await super.goTo(`${urls.citizenFrontEnd}/first-contact/start`);
  }

  async start() {
    await super.clickBySelector(buttons.start.selector);
  }
}
