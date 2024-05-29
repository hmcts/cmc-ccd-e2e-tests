import { heading, inputs, links, radioButtons } from './transfer-case-content';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import BasePage from '../../../../base/base-page';
import ExuiEvent from '../../mixins/event-summary';
import CaseworkerEvents from '../../../../enums/events/caseworker-events';
import { getCaseTitle } from '../../exui-common-content';
import { TruthyParams } from '../../../../decorators/truthy-params';
import CCDCaseData from '../../../../types/case-data/ccd-case-data';

@AllMethodsStep
export default class TransferCasePage extends ExuiEvent(BasePage) {

  async verifyContent(caseData: CCDCaseData) {
    await Promise.all([
      super.expectHeadingToBeVisible(heading),
      super.expectHeadingToBeVisible(getCaseTitle(caseData)),
    ]);
  }

  private async verifyAddressInputs() {
    await Promise.all([
      super.expectLabelToBeVisible(inputs.addressLine1.label),
      super.expectLabelToBeVisible(inputs.addressLine2.label),
      super.expectLabelToBeVisible(inputs.addressLine3.label),
      super.expectLabelToBeVisible(inputs.city.label),
      super.expectLabelToBeVisible(inputs.county.label),
      super.expectLabelToBeVisible(inputs.country.label),
      super.expectLabelToBeVisible(inputs.postcode.label),
    ]);
  }

  async fillCourtDetails() {
    await super.fill('Waverley Court', inputs.countyCourt.selector);
    await super.clickLink(links.manualAddress.title);
    await this.verifyAddressInputs();
    await super.fill('1 New Street', inputs.addressLine1.selector);
    await super.fill('City', inputs.city.selector);
  } 

  async chooseTransferOption() {
    await super.clickBySelector(radioButtons.other.selector);
    await super.expectOptionChecked(radioButtons.other.label);
    await super.fill('Some Reason', inputs.otherReason.selector);
    await super.clickSubmit();
  }

  async submitEvent() {
    await super.fillEventDetails(CaseworkerEvents.TRANSFER_CASE);
    await super.clickSubmit();
  }
}