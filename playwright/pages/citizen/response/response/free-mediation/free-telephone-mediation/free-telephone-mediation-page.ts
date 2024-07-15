import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import CitizenEvent from '../../../../citizen-event/citizen-event';
import { buttons, heading, links, subHeadings } from './free-telephone-mediation-content';

@AllMethodsStep
export default class FreeTelephoneMediationPage extends CitizenEvent(BasePage) {

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