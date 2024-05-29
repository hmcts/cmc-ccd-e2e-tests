import { dropdowns, heading } from './resend-rpa-content';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import BasePage from '../../../../base/base-page';
import ExuiEvent from '../../mixins/event-summary';
import CaseworkerEvents from '../../../../enums/events/caseworker-events';
import { getCaseTitle } from '../../exui-common-content';
import { TruthyParams } from '../../../../decorators/truthy-params';
import CCDCaseData from '../../../../types/case-data/ccd-case-data';

@AllMethodsStep
export default class ResendRpaPage extends ExuiEvent(BasePage) {

  async verifyContent(caseData: CCDCaseData) {
    await Promise.all([
      super.expectHeadingToBeVisible(heading),
      super.expectHeadingToBeVisible(getCaseTitle(caseData)),
      super.expectLabelToBeVisible(dropdowns.resendRpa.label),
    ]);
  }

  async chooseClaimRpa() {
    await super.selectFromDropdown(dropdowns.resendRpa.options.claim, dropdowns.resendRpa.selector);
    await super.clickSubmit();
  }

  @TruthyParams()
  async submitEvent() {
    await super.fillEventDetails(CaseworkerEvents.RESEND_RPA);
    await super.clickSubmit();
  }
}