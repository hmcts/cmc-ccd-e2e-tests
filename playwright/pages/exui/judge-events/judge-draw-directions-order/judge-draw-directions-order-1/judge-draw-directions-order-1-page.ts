import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/case-data/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';
import { heading, paragraphs, radioButtons } from './judge-draw-directions-order-1-content';

@AllMethodsStep()
export default class JudgeDrawDirectionsOrder1Page extends ExuiPage(BasePage) {
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
