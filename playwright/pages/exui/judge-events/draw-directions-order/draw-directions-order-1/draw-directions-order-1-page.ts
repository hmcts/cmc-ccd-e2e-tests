import BasePage from '../../../../../base/base-page';
import CCDCaseData from '../../../../../types/case-data/ccd-case-data';
import ExuiEvent from '../../../mixins/exui-event/exui-event';
import { heading, paragraphs, radioButtons } from './draw-directions-order-1-content';

export default class DrawDirectionsOrder1Page extends ExuiEvent(BasePage){
  async verifyContent(caseData: CCDCaseData) {
    await Promise.all([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      super.expectText(paragraphs.descriptionText),
      super.expectLabel(radioButtons.sdo.label),
      super.expectLabel(radioButtons.bespoke.label),
    ]);
  }

  async chooseSdo() {
    await super.clickBySelector(radioButtons.sdo.selector);
    await super.clickSubmit();
  }

  async submitEvent() {
    throw new Error('Method not implemented.');
  }
}