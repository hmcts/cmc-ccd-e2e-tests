import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ClaimStoreCaseData from '../../../../../../models/case-data/claim-store-case-data';
import OcmcEvent from '../../../../ocmc-event/ocmc-event';
import { heading, subHeadings, inputs } from './confirm-your-details-content';

@AllMethodsStep()
export default class ConfirmYourDetailsPage extends OcmcEvent(BasePage) {
  async verifyContent(caseData: ClaimStoreCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectSubHeading(subHeadings.title),
      super.expectSubHeading(subHeadings.firstName),
      super.expectText(caseData.claim.defendants[0].firstName),
      super.expectSubHeading(subHeadings.lastName),
      super.expectText(caseData.claim.defendants[0].lastName),
      super.expectSubHeading(subHeadings.address),
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
      super.expectSubHeading(subHeadings.correspondenceAddress),
    ]);
  }

  async saveAndContinue() {
    await super.clickSaveAndContinue();
  }
}
