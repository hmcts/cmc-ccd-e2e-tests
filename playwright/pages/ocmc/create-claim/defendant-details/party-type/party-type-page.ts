import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import OcmcEvent from '../../../ocmc-event/ocmc-event';
import { heading, radioButtons } from './party-type-content';

@AllMethodsStep()
export default class PartyTypePage extends OcmcEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectLabel(radioButtons.individual.label),
      super.expectLabel(radioButtons.soleTrader.label),
      super.expectLabel(radioButtons.company.label),
      super.expectLabel(radioButtons.organisation.label),
    ]);
  }

  async chooseOrganisation() {
    await super.clickBySelector(radioButtons.organisation.selector);
    await super.clickSaveAndContinue();
  }
}
