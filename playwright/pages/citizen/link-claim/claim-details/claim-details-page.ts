import BasePage from '../../../../base/base-page';
import CitizenEvent from '../../citizen-event/citizen-event';
import { buttons, heading, paragraphs } from './claim-details-content';

export default class ClaimDetailsPage extends CitizenEvent(BasePage) {
  async verifyContent(claimRef: string) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectText(paragraphs.claimNumber),
      super.expectText(claimRef),
      super.expectText(paragraphs.claimAmount),
      super.expectText(paragraphs.claimReason),
      // super.expectText(paragraphs.timeline),
    ]);
  }

  async clickRespondToClaim() {
    await super.clickBySelector(buttons.respond.selector);
  }
}
