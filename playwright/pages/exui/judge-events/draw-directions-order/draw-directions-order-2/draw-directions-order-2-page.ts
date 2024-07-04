import BasePage from '../../../../../base/base-page';
import CCDCaseData from '../../../../../types/case-data/ccd-case-data';
import ExuiEvent from '../../../mixins/exui-event/exui-event';
import { heading, radioButtons, checkboxes, subHeadings, legends, buttons, inputs, dropdowns } from './draw-directions-order-2-content';

export default class DrawDirectionsOrder2Page extends ExuiEvent(BasePage){
  async verifyContent(caseData: CCDCaseData) {
    await Promise.all([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      super.expectOptionChecked(checkboxes.sendDocs.selector),
      super.expectOptionChecked(checkboxes.sendWitness.selector),
      super.expectOptionChecked(radioButtons.docsBothParties.selector),
      super.expectOptionChecked(radioButtons.witnessesBothParties.selector),
      super.expectSubHeading(subHeadings.addExtraDoc),
      super.expectText(legends.directions),
      super.expectText(legends.docUploadParty),
      super.expectText(legends.docsDeadline),
      super.expectText(legends.experts),
      super.expectText(legends.witnessesDeadline),
    ]);
  }

  async enterSdoDetails() {
    await super.clickBySelector(buttons.addNewExtraDocInstruction.selector);
    await super.fill('Test', inputs.extraDocUpload.selector);
    await super.clickBySelector(radioButtons.yesExpert.selector);
    await super.fill('Test', inputs.expertReport.selector);
    await super.clickBySelector(buttons.addDirection.selector);
    await super.selectFromDropdown(dropdowns.extraDirection.options[0], dropdowns.extraDirection.selector);
    await super.expectLabel(dropdowns.directionParty.label);
    // await super.expectSubHeading(subHeadings.sendDocsInstructions);
    await super.selectFromDropdown(dropdowns.directionParty.options[2], dropdowns.directionParty.selector); 
    await super.clickBySelector(buttons.addNewOtherDirectionsExtraDocInstruction.selector);
    await super.fill('Test', inputs.otherDirectionsExtraDocUpload.selector);
    await super.selectFromDropdown(dropdowns.hearingCourt.options[0], dropdowns.hearingCourt.selector);
    await super.selectFromDropdown(dropdowns.hearingDuration.options[0], dropdowns.hearingDuration.selector);
    await super.clickSubmit();
  }

  async submitEvent() {
    throw new Error('Method not implemented.');
  }
}