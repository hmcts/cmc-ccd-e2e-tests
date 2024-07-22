import { dropdowns, heading } from './resend-rpa-content';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import BasePage from '../../../../base/base-page';
import ExuiEvent from '../../exui-event/exui-event';
import CaseworkerEvents from '../../../../enums/events/caseworker-events';
import { TruthyParams } from '../../../../decorators/truthy-params';
import CCDCaseData from '../../../../types/case-data/ccd-case-data';

@AllMethodsStep()
export default class ResendRpaPage extends ExuiEvent(BasePage) {

  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      super.expectLabel(dropdowns.resendRpa.label),
    ]);
  }

  async chooseClaimRpa() {
    await super.selectFromDropdown(dropdowns.resendRpa.options[0], dropdowns.resendRpa.selector);
  }

  async submitEvent() {
    await super.clickSubmit();
    await super.fillEventDetails(CaseworkerEvents.RESEND_RPA);
    await super.clickSubmit();
  }
}