import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import CaseworkerEvents from '../../../../enums/events/caseworker-events';
import CCDCaseData, { ApplicantValue, RespondentValue } from '../../../../types/case-data/ccd-case-data';
import ExuiEvent from '../../mixins/exui-event';
import { heading, radioButtons, subHeadings, claimantInputs, defendantInputs, links } from './change-contact-details-content';

@AllMethodsStep
export default class ChangeContactDetailsPage extends ExuiEvent(BasePage) {

  async verifyContent(caseData: CCDCaseData){
    await Promise.all([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      super.expectLabel(radioButtons.claimant.label, {exact: true}),
      super.expectLabel(radioButtons.defendant.label, {exact: true}),
    ]);
  }

  async clickClaimant() {
    await super.clickBySelector(radioButtons.claimant.selector);
  }

  async verifyClaimantContent(claimantDetails: ApplicantValue) {
    await Promise.all([
      super.expectSubHeading(subHeadings.claimants),
      // super.expectTextToBeVisible(claimantDetails.partyName),
      super.expectInputValue(claimantInputs.email.selector, 
        claimantDetails.partyDetail.emailAddress),
      super.expectInputValue(claimantInputs.addressLine1.selector, 
        claimantDetails.partyDetail.primaryAddress.AddressLine1),
      super.expectInputValue(claimantInputs.addressLine2.selector, 
        claimantDetails.partyDetail.primaryAddress.AddressLine2),
      super.expectInputValue(claimantInputs.postcode.selector, 
        claimantDetails.partyDetail.primaryAddress.PostCode),
    ]);
  }

  async changeClaimantDetails() {
    await super.fill(claimantInputs.email.value, claimantInputs.email.selector);
    await super.fill(claimantInputs.addressLine1.value, claimantInputs.addressLine1.selector);
    await super.fill(claimantInputs.addressLine2.value, claimantInputs.addressLine2.selector);
    await super.fill(claimantInputs.addressLine3.value, claimantInputs.addressLine3.selector);
    await super.fill(claimantInputs.city.value, claimantInputs.city.selector);
    await super.fill(claimantInputs.postcode.value, claimantInputs.postcode.selector);
    await super.clickSubmit();
  }

  async clickDefendant() {
    await super.clickBySelector(radioButtons.defendant.selector);
  }

  async verifyDefendantContent(defendantDetails: RespondentValue) {
    await Promise.all([
      super.expectSubHeading(subHeadings.defendants),
      // super.expectTextToBeVisible(claimantDetails.partyName),
      super.expectInputValue(defendantInputs.email.selector, 
        defendantDetails.claimantProvidedDetail.emailAddress),
      super.expectInputValue(defendantInputs.addressLine1.selector, 
        defendantDetails.claimantProvidedDetail.primaryAddress.AddressLine1),
      super.expectInputValue(defendantInputs.addressLine2.selector, 
        defendantDetails.claimantProvidedDetail.primaryAddress.AddressLine2),
      super.expectInputValue(defendantInputs.postcode.selector, 
        defendantDetails.claimantProvidedDetail.primaryAddress.PostCode),
    ]);
  }

  async enterDefendantDetails() {
    await super.clickLink(links.manualAddress.title, {index: links.manualAddress.index});
    await super.fill(defendantInputs.email.value, defendantInputs.email.selector);
    await super.fill(defendantInputs.addressLine1.value, defendantInputs.addressLine1.selector);
    await super.fill(defendantInputs.addressLine2.value, defendantInputs.addressLine2.selector);
    await super.fill(defendantInputs.addressLine3.value, defendantInputs.addressLine3.selector);
    await super.fill(defendantInputs.city.value, defendantInputs.city.selector);
    await super.fill(defendantInputs.postcode.value, defendantInputs.postcode.selector);
    await super.clickSubmit();
  }

  async submitEvent() {
    await super.clickSubmit();
    await super.verifyEventSummaryContent();
    await super.fillEventDetails(CaseworkerEvents.CHANGE_CONTACT_DETAILS);
    await super.clickSubmit();
  }
}