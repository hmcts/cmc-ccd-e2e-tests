import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ClaimStoreCaseData from '../../../../../../models/case-data/claim-store-case-data';
import OcmcEvent from '../../../../ocmc-event/ocmc-event';
import { heading, subheadings, inputs } from './confirm-your-details-content';

@AllMethodsStep()
export default class ConfirmYourDetailsPage extends OcmcEvent(BasePage) {
  async verifyContent(caseData: ClaimStoreCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectSubheading(subheadings.title),
      super.expectSubheading(subheadings.firstName),
      super.expectText(caseData.claim.defendants[0].firstName),
      super.expectSubheading(subheadings.lastName),
      super.expectText(caseData.claim.defendants[0].lastName),
      super.expectSubheading(subheadings.address),
      super.expectInputValue(
        inputs.addressLine1.selector,
        caseData.claim.defendants[0].address.line1,
      ),
      super.expectInputValue(
        inputs.addressLine2.selector,
        caseData.claim.defendants[0].address.line2,
      ),
      super.expectInputValue(
        inputs.addressLine3.selector,
        caseData.claim.defendants[0].address.line3,
      ),
      super.expectInputValue(inputs.city.selector, caseData.claim.defendants[0].address.city),
      super.expectInputValue(
        inputs.postcode.selector,
        caseData.claim.defendants[0].address.postcode,
      ),
      super.expectSubheading(subheadings.correspondenceAddress),
    ]);
  }

  async saveAndContinue() {
    await super.clickSaveAndContinue();
  }
}
