import { heading, inputs, links, radioButtons } from './transfer-case-content';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import BasePage from '../../../../../base/base-page';
import ExuiEvent from '../../../exui-event/exui-event';
import CCDCaseData from '../../../../../models/case-data/ccd-case-data';

@AllMethodsStep()
export default class TransferCasePage extends ExuiEvent(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([super.expectHeading(heading), super.verifyCaseTitle(caseData)], {
      axe: false,
    });
  }

  private async verifyAddressInputs() {
    await super.runVerifications([
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
    await super.inputText('Waverley Court', inputs.countyCourt.selector);
    await super.clickLink(links.manualAddress.title);
    await this.verifyAddressInputs();
    await super.inputText('1 New Street', inputs.addressLine1.selector);
    await super.inputText('City', inputs.city.selector);
  }

  async chooseTransferOption() {
    await super.clickBySelector(radioButtons.other.selector);
    await super.expectOptionChecked(radioButtons.other.selector);
    await super.inputText('Some Reason', inputs.otherReason.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
