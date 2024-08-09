import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import CitizenEvent from '../../../../citizen-event/citizen-event';
import { heading, paragraphs, radioButtons } from './hearing-location-content';

@AllMethodsStep()
export default class HearingLocationPage extends CitizenEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectText(paragraphs.descriptionText1),
      super.expectText(paragraphs.descriptionText2),
      super.expectLabel(radioButtons.yesCourt.label),
      super.expectLabel(radioButtons.noCourt.label),
      super.expectOptionChecked(radioButtons.yesCourt.selector),
    ]);
  }

  async yesHearingLocation() {
    // await super.clickBySelector(radioButtons.yesCourt.selector);
    await super.clickSaveAndContinue();
  }
}
