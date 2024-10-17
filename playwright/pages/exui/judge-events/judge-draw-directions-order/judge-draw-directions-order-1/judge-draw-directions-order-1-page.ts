import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/case-data/ccd-case-data';
import ExuiEvent from '../../../exui-event/exui-event';
import { heading, paragraphs, radioButtons } from './judge-draw-directions-order-1-content';

@AllMethodsStep()
export default class JudgeDrawDirectionsOrder1Page extends ExuiEvent(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      super.expectText(paragraphs.descriptionText),
      super.expectLabel(radioButtons.sdo.label),
      super.expectLabel(radioButtons.bespoke.label),
    ]);
  }

  async chooseSdo() {
    await super.clickBySelector(radioButtons.sdo.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
