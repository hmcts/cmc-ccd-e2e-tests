import BasePage from '../../../../../../base/base-page';
import CitizenEvent from '../../../../citizen-event/citizen-event';
import { dropdowns, heading, inputs, paragraphs, subHeadings } from './evidence-content';

export default class EvidencePage extends CitizenEvent(BasePage){
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectSubHeading(subHeadings.listYourEvidence),
      super.expectText(paragraphs.yourEvidence),
    ]);
  }

  async addEvidence1() {
    await super.retrySelectFromDropdown(dropdowns.evidenceType1.options[0], dropdowns.evidenceType1.selector, 
      async () => {
        await super.fill('No more detail required', inputs.evidence1Description.selector, {timeout: 2000});
      },
    );
  }

  async addEvidence2() {
    await super.retrySelectFromDropdown(dropdowns.evidenceType2.options[0], dropdowns.evidenceType2.selector, 
      async () => {
        await super.fill('No more detail required', inputs.evidence2Description.selector, {timeout: 2000});
      },
    );
  }

  async addTheirEvidenceComment() {
    await super.fill('No comment', inputs.theirEvidenceComments.selector);
    await super.clickSaveAndContinue();
  }
}