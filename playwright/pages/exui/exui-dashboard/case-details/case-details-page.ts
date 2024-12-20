import BasePage from '../../../../base/base-page';
import urls from '../../../../config/urls';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { TruthyParams } from '../../../../decorators/truthy-params';
import ExuiEvents from '../../../../models/exui-events';
import {
  tabs,
  dropdowns,
  buttons,
  containers,
  getSuccessBannerText,
  errorMessages,
} from './case-details-content';
import {
  claimantInputs as claimantChangeDetailsInputs,
  defendantInputs as defendantChangeDetailsInputs,
} from '../../caseworker-events/change-contact-details/change-contact-details-1/change-contact-details-1-content';
import CCDCaseData from '../../../../models/case-data/ccd-case-data';
import { doc1Dropdowns } from '../../fragments/staff-documents/staff-documents-content';

const classKey = 'CaseDetailsPage';
@AllMethodsStep()
export default class CaseDetailsPage extends BasePage {
  async verifyContent(caseData: CCDCaseData): Promise<void> {
    await super.retryReloadRunVerifications(() => [
      super.expectHeading(caseData.caseName),
      super.expectText(tabs.claimHistory.title),
      super.expectText(tabs.claimDetails.title),
      super.expectText(tabs.defendantDetails.title),
      super.expectLabel(dropdowns.nextStep.label),
    ]);
  }

  @TruthyParams(classKey, 'caseId')
  async goToCaseDetails(caseId: number) {
    console.log(`Navigating to case with ccd case id: ${caseId}`);
    await super.goTo(`${urls.manageCase}/cases/case-details/${caseId}`, {
      force: true,
    });
  }

  async retryChooseNextStep(event: ExuiEvents) {
    console.log(`Starting event: ${event}`);
    await super.selectFromDropdown(event, dropdowns.nextStep.selector);
    await super.retryClickBySelector(
      buttons.go.selector,
      () =>
        super.expectNoText(tabs.claimHistory.title, {
          timeout: 10_000,
        }),
      { retries: 3 },
    );
  }

  async chooseNextStep(event: ExuiEvents) {
    console.log(`Starting event: ${event}`);
    await super.selectFromDropdown(event, dropdowns.nextStep.selector);
    await super.clickBySelector(buttons.go.selector);
  }

  async verifySuccessEvent(caseId: number, event: ExuiEvents) {
    console.log(`Verifying success banner and event history: ${event}`);
    await super.expectText(getSuccessBannerText(caseId, event));
    await super.clickByText(tabs.claimHistory.title);
    await super.expectTableRowValue(event, containers.eventHistory.selector, {
      rowNum: 1,
    });
  }

  async verifyNewClaimantDetails() {
    await super.clickByText(tabs.claimantDetails.title);
    await super.runVerifications([
      super.expectText(claimantChangeDetailsInputs.email.value),
      super.expectText(claimantChangeDetailsInputs.addressLine1.value),
      super.expectText(claimantChangeDetailsInputs.addressLine2.value),
      super.expectText(claimantChangeDetailsInputs.addressLine3.value),
      super.expectText(claimantChangeDetailsInputs.city.value),
      super.expectText(claimantChangeDetailsInputs.postcode.value),
    ]);
  }

  async verifyNewDefendantDetails() {
    await super.clickByText(tabs.defendantDetails.title);
    await super.runVerifications([
      super.expectText(defendantChangeDetailsInputs.email.value),
      super.expectText(defendantChangeDetailsInputs.addressLine1.value),
      super.expectText(defendantChangeDetailsInputs.addressLine2.value),
      super.expectText(defendantChangeDetailsInputs.addressLine3.value),
      super.expectText(defendantChangeDetailsInputs.city.value),
      super.expectText(defendantChangeDetailsInputs.postcode.value),
    ]);
  }

  async verifyUploadedDocuments() {
    await super.clickByText(tabs.claimDocs.title);
    await super.runVerifications([
      super.expectText(doc1Dropdowns.docType.options[0]),
      super.expectText(doc1Dropdowns.docType.options[2]),
      // super.expectText(doc1Inputs.docName.value),
      // super.expectText(doc2Inputs.docName.value),
    ]);
  }

  async verifyFullReject() {
    await super.clickByText(tabs.claimHistory.title);
    await super.expectTableRowValue('Disputed all', containers.eventHistory.selector, {
      rowNum: 1,
    });
  }

  async verifyBreathingSpaceError() {
    await super.expectText(errorMessages.breathingSpace, {
      containerSelector: containers.errors.selector,
    });
  }
}
