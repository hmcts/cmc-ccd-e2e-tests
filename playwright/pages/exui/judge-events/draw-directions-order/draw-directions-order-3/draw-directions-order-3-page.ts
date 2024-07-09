import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../types/case-data/ccd-case-data';
import ExuiEvent from '../../../exui-event/exui-event';
import { heading } from './draw-directions-order-3-content';

@AllMethodsStep
export default class DrawDirectionsOrder3Page extends ExuiEvent(BasePage){
  async verifyContent(caseData: CCDCaseData) {
    await Promise.all([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      super.expectLink(caseData.previousServiceCaseReference),
    ]);
  }

  async submitEvent() {
    await super.clickSubmit();
    await super.clickSubmit();
  }
}