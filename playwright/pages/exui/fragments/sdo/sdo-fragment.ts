import BasePage from "../../../../base/base-page";
import ExuiEvent from "../../exui-event/exui-event";
import { legends, checkboxes, radioButtons, buttons, dropdowns, inputs, subHeadings } from "./sdo-content";

export default class SdoFragment extends ExuiEvent(BasePage) {
  
  async verifyContent() {
    await Promise.all([
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

  async verifyEnteredSdoDetails() {
    await Promise.all([
      super.expectOptionChecked(checkboxes.sendDocs.selector),
      super.expectOptionChecked(checkboxes.sendWitness.selector),
      super.expectOptionChecked(radioButtons.docsBothParties.selector),
      super.expectOptionChecked(radioButtons.witnessesBothParties.selector),
      super.expectOptionChecked(radioButtons.yesExpert.selector),
      super.expectInputValue(inputs.expertReport.selector, inputs.expertReport.value),
      // super.expectDropdownOption(dropdowns.extraDirection.selector, dropdowns.extraDirection.options[0]),
      // super.expectDropdownOption(dropdowns.directionParty.selector, dropdowns.directionParty.options[0]),
      super.expectInputValue(inputs.otherDirectionsExtraDocUpload.selector, inputs.otherDirectionsExtraDocUpload.value),
      // super.expectDropdownOption(dropdowns.hearingCourt.selector, dropdowns.hearingCourt.options[0]),
      // super.expectDropdownOption(dropdowns.hearingDuration.selector, dropdowns.hearingDuration.options[0])
    ])
  }

  async enterSdoDetails() {
    await super.clickBySelector(buttons.addNewExtraDocInstruction.selector);
    await super.fill(inputs.extraDocUpload.value, inputs.extraDocUpload.selector);
    await super.clickBySelector(radioButtons.yesExpert.selector);
    await super.fill(inputs.expertReport.value, inputs.expertReport.selector);
    await super.clickBySelector(buttons.addDirection.selector);
    await super.selectFromDropdown(dropdowns.extraDirection.options[0], dropdowns.extraDirection.selector);
    await super.expectLabel(dropdowns.directionParty.label);
    // await super.expectSubHeading(subHeadings.sendDocsInstructions);
    await super.selectFromDropdown(dropdowns.directionParty.options[2], dropdowns.directionParty.selector); 
    await super.clickBySelector(buttons.addNewOtherDirectionsExtraDocInstruction.selector);
    await super.fill('Test', inputs.otherDirectionsExtraDocUpload.selector);
    await super.selectFromDropdown(dropdowns.hearingCourt.options[0], dropdowns.hearingCourt.selector);
    await super.selectFromDropdown(dropdowns.hearingDuration.options[0], dropdowns.hearingDuration.selector);
  }

  async submitEvent() {
    throw new Error("Method not implemented.");
  }
}