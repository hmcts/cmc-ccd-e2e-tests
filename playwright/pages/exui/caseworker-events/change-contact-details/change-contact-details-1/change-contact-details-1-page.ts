import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData, {
  ApplicantValue,
  RespondentValue,
} from '../../../../../types/case-data/ccd-case-data';
import ExuiEvent from '../../../exui-event/exui-event';
import {
  heading,
  radioButtons,
  subHeadings,
  claimantInputs,
  defendantInputs,
  links,
} from './change-contact-details-1-content';

@AllMethodsStep()
export default class ChangeContactDetails1Page extends ExuiEvent(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      super.expectLabel(radioButtons.claimant.label, { exact: true }),
      super.expectLabel(radioButtons.defendant.label, { exact: true }),
    ]);
  }

  async clickClaimant() {
    await super.clickBySelector(radioButtons.claimant.selector);
  }

  async verifyClaimantContent(claimantDetails: ApplicantValue) {
    await super.runVerifications([
      super.expectSubHeading(subHeadings.claimants),
      // super.expectTextToBeVisible(claimantDetails.partyName),
      super.expectInputValue(
        claimantInputs.email.selector,
        claimantDetails.partyDetail.emailAddress,
      ),
      super.expectInputValue(
        claimantInputs.addressLine1.selector,
        claimantDetails.partyDetail.primaryAddress.AddressLine1,
      ),
      super.expectInputValue(
        claimantInputs.addressLine2.selector,
        claimantDetails.partyDetail.primaryAddress.AddressLine2,
      ),
      super.expectInputValue(
        claimantInputs.postcode.selector,
        claimantDetails.partyDetail.primaryAddress.PostCode,
      ),
    ]);
  }

  async changeClaimantDetails() {
    await super.inputText(claimantInputs.email.value, claimantInputs.email.selector);
    await super.inputText(claimantInputs.addressLine1.value, claimantInputs.addressLine1.selector);
    await super.inputText(claimantInputs.addressLine2.value, claimantInputs.addressLine2.selector);
    await super.inputText(claimantInputs.addressLine3.value, claimantInputs.addressLine3.selector);
    await super.inputText(claimantInputs.city.value, claimantInputs.city.selector);
    await super.inputText(claimantInputs.postcode.value, claimantInputs.postcode.selector);
  }

  async clickDefendant() {
    await super.clickBySelector(radioButtons.defendant.selector);
  }

  async verifyDefendantContent(defendantDetails: RespondentValue) {
    await super.runVerifications([
      super.expectSubHeading(subHeadings.defendants),
      // super.expectTextToBeVisible(claimantDetails.partyName),
      super.expectInputValue(
        defendantInputs.email.selector,
        defendantDetails.claimantProvidedDetail.emailAddress,
      ),
      super.expectInputValue(
        defendantInputs.addressLine1.selector,
        defendantDetails.claimantProvidedDetail.primaryAddress.AddressLine1,
      ),
      super.expectInputValue(
        defendantInputs.addressLine2.selector,
        defendantDetails.claimantProvidedDetail.primaryAddress.AddressLine2,
      ),
      super.expectInputValue(
        defendantInputs.postcode.selector,
        defendantDetails.claimantProvidedDetail.primaryAddress.PostCode,
      ),
    ]);
  }

  async enterDefendantDetails() {
    await super.clickLink(links.manualAddress.title, {
      index: links.manualAddress.index,
    });
    await super.inputText(defendantInputs.email.value, defendantInputs.email.selector);
    await super.inputText(
      defendantInputs.addressLine1.value,
      defendantInputs.addressLine1.selector,
    );
    await super.inputText(
      defendantInputs.addressLine2.value,
      defendantInputs.addressLine2.selector,
    );
    await super.inputText(
      defendantInputs.addressLine3.value,
      defendantInputs.addressLine3.selector,
    );
    await super.inputText(defendantInputs.city.value, defendantInputs.city.selector);
    await super.inputText(defendantInputs.postcode.value, defendantInputs.postcode.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
