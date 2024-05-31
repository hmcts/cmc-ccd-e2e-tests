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
    await super.myExpect([
      super.expectHeading(heading),
      super.expectHeading(getCaseTitle(caseData)),
    ]);
  }

  private async verifyAddressInputs() {
    await super.myExpect([
      super.expectLabel(inputs.addressLine1.label),
      super.expectLabel(inputs.addressLine2.label),
      super.expectLabel(inputs.addressLine3.label),
      super.expectLabel(inputs.city.label),
      super.expectLabel(inputs.county.label),
      super.expectLabel(inputs.country.label),
      super.expectLabel(inputs.postcode.label),
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