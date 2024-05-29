import BasePage from '../../../../base/base-page';
import urls from '../../../../config/urls';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { TruthyParams } from '../../../../decorators/truthy-params';
import ExuiEvents from '../../../../types/exui-events';
import { getCaseTitle, getSuccessBannerText } from '../../exui-common-content';
import { tabs, dropdowns, buttons, containers } from './case-details-content';
import {claimantInputs as claimantChangeDetailsInputs, defendantInputs as defendantChangeDetailsInputs} from '../../caseworker-events/change-contact-details/change-contact-details-content';
import CCDCaseData from '../../../../types/case-data/ccd-case-data';

@AllMethodsStep
export default class CaseDetailsPage extends BasePage {
  async verifyContent(caseData: CCDCaseData): Promise<void> {
    await Promise.all([
      super.expectHeadingToBeVisible(getCaseTitle(caseData)),
      super.expectTextToBeVisible(tabs.claimHistory.title),
      super.expectTextToBeVisible(tabs.claimDetails.title),
      super.expectTextToBeVisible(tabs.defendantDetails.title),
      super.expectTextToBeVisible(tabs.claimDocs.title),
      super.expectLabelToBeVisible(dropdowns.nextStep.label),
    ]);
  }

  @TruthyParams()
  async goToCaseDetails(caseId: number) {
    console.log(`Navigating to case with ccd case id: ${caseId}`);
    await super.goTo(`${urls.manageCase}/cases/case-details/${caseId}`);
  }

  async chooseNextStep(event: ExuiEvents) {
    await super.selectFromDropdown(event, dropdowns.nextStep.selector);
    await super.clickBySelector(buttons.go.selector);
  }

  async verifySuccessEvent(caseId: number, event: ExuiEvents) {
    await super.expectTextToBeVisible(getSuccessBannerText(caseId, event));
    await super.clickByText(tabs.claimHistory.title);
    await super.expectTableRowToContain(event, containers.eventHistory.selector, {rowNum: 1});
  }

  async verifyClaimantDetails() {
    await super.clickByText(tabs.claimantDetails.title);
    await Promise.all([
      super.expectTextToBeVisible(claimantChangeDetailsInputs.email.value),
      super.expectTextToBeVisible(claimantChangeDetailsInputs.addressLine1.value),
      super.expectTextToBeVisible(claimantChangeDetailsInputs.addressLine2.value),
      super.expectTextToBeVisible(claimantChangeDetailsInputs.addressLine3.value),
      super.expectTextToBeVisible(claimantChangeDetailsInputs.city.value),
      super.expectTextToBeVisible(claimantChangeDetailsInputs.postcode.value),
    ]);
  }

  async verifyDefendantDetails() {
    await super.clickByText(tabs.defendantDetails.title);
    await Promise.all([
      super.expectTextToBeVisible(defendantChangeDetailsInputs.email.value),
      super.expectTextToBeVisible(defendantChangeDetailsInputs.addressLine1.value),
      super.expectTextToBeVisible(defendantChangeDetailsInputs.addressLine2.value),
      super.expectTextToBeVisible(defendantChangeDetailsInputs.addressLine3.value),
      super.expectTextToBeVisible(defendantChangeDetailsInputs.city.value),
      super.expectTextToBeVisible(defendantChangeDetailsInputs.postcode.value),
    ]);
  }
}
