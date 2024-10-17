import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ClaimStoreCaseData from '../../../../../../models/case-data/claim-store-case-data';
import OcmcEvent from '../../../../ocmc-event/ocmc-event';
import { getHeading, radioButtons } from './why-you-dont-owe-money-content';

@AllMethodsStep()
export default class WhyYouDontOweMoneyPage extends OcmcEvent(BasePage) {
  async verifyContent(caseData: ClaimStoreCaseData) {
    await super.runVerifications([
      super.expectHeading(getHeading(caseData)),
      super.expectLabel(radioButtons.paid.label),
      super.expectLabel(radioButtons.dispute.label),
      super.expectLabel(radioButtons.disputeAndCounter.label),
    ]);
  }

  async disputeAll() {
    await super.clickBySelector(radioButtons.dispute.selector);
    await super.clickSaveAndContinue();
  }
}
