import { AllMethodsStep } from '../../../../../decorators/test-steps';
import BasePage from '../../../../../base/base-page';
import ExuiEvent from '../../../exui-event/exui-event';
import CCDCaseData from '../../../../../models/case-data/ccd-case-data';
import { heading, inputs, radioButtons, subHeadings } from './paper-response-defence-content';

@AllMethodsStep()
export default class PaperResponseDefencePage extends ExuiEvent(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    const respondentAddress = caseData.respondents[0].value.claimantProvidedDetail.primaryAddress;
    await super.runVerifications([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      super.expectSubHeading(subHeadings.defendantDetails),
      super.expectSubHeading(subHeadings.address),
      super.expectSubHeading(subHeadings.correspondenceAddress),
      // super.expectSubHeading(subHeadings.contactDetails),
      super.expectLabel(radioButtons.dispute.label),
      super.expectLabel(radioButtons.alreadyPaid.label),
      super.expectInputValue(inputs.addressLine1.selector, respondentAddress.AddressLine1),
      super.expectInputValue(inputs.city.selector, respondentAddress.PostTown),
      super.expectInputValue(inputs.postcode.selector, respondentAddress.PostCode),
    ]);
  }

  async chooseDispute() {
    await super.clickBySelector(radioButtons.dispute.selector);
  }

  async chooseNoMediation() {
    await super.clickBySelector(radioButtons.noMedition.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
