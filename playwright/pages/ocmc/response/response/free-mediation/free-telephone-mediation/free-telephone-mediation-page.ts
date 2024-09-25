import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import OcmcEvent from '../../../../ocmc-event/ocmc-event';
import { buttons, heading, links, subHeadings } from './free-telephone-mediation-content';

@AllMethodsStep()
export default class FreeTelephoneMediationPage extends OcmcEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectSubHeading(subHeadings.howMediationWorks),
      super.expectSubHeading(subHeadings.settlement),
    ]);
  }

  async noMediation() {
    await super.clickBySelector(links.noMediation.selector);
  }

  async yesMediation() {
    await super.clickBySelector(buttons.yesMediation.selector);
  }
}
