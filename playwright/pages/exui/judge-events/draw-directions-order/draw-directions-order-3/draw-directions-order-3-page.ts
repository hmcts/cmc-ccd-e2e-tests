import BasePage from '../../../../../base/base-page';
import CCDCaseData from '../../../../../types/case-data/ccd-case-data';
import ExuiEvent from '../../../mixins/exui-event/exui-event';
import { heading } from './draw-directions-order-3-content';

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