import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import OcmcEvent from '../../../../ocmc-event/ocmc-event';
import { dropdowns, heading, inputs, paragraphs, subHeadings } from './evidence-content';

@AllMethodsStep()
export default class EvidencePage extends OcmcEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectSubHeading(subHeadings.listYourEvidence),
      super.expectText(paragraphs.yourEvidence),
    ]);
  }

  async addEvidence1() {
    await super.retrySelectFromDropdownTimeout(
      dropdowns.evidenceType1.options[0],
      dropdowns.evidenceType1.selector,
      async () => {
        await super.inputText('No more detail required', inputs.evidence1Description.selector, {
          timeout: 500,
        });
      },
      { interval: 2000, timeout: 10_000 },
    );
  }

  async addEvidence2() {
    await super.retrySelectFromDropdownTimeout(
      dropdowns.evidenceType2.options[0],
      dropdowns.evidenceType2.selector,
      async () => {
        await super.inputText('No more detail required', inputs.evidence2Description.selector, {
          timeout: 500,
        });
      },
      { interval: 2000 },
    );
  }

  async addTheirEvidenceComment() {
    await super.inputText('No comment', inputs.theirEvidenceComments.selector);
    await super.clickSaveAndContinue();
  }
}
