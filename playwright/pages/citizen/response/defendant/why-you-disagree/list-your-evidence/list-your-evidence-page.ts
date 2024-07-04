import BasePage from '../../../../../../base/base-page';
import CitizenEvent from '../../../../mixins/citizen-events/citizen-events';
import { dropdowns, heading, inputs, paragraphs, subHeadings } from './list-your-evidence-content';

export default class ListYourEvidencePage extends CitizenEvent(BasePage){
  async verifyContent() {
    await Promise.all([
      super.expectHeading(heading),
      super.expectSubHeading(subHeadings.listYourEvidence),
      super.expectText(paragraphs.yourEvidence),
    ]);
  }

  async addEvidence1() {
    await super.selectFromDropdown(dropdowns.evidenceType1.options[0], dropdowns.evidenceType1.selector);
    await super.fill('No more detail required', inputs.evidence1Description.selector);
  }

  async addEvidence2() {
    await super.selectFromDropdown(dropdowns.evidenceType2.options[0], dropdowns.evidenceType2.selector);
    await super.fill('No more detail required', inputs.evidence2Description.selector);
  }

  async addTheirEvidenceComment() {
    await super.fill('No comment', inputs.theirEvidenceComments.selector);
    await super.clickSaveAndContinue();
  }
}