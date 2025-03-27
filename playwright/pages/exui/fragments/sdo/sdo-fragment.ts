import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import ExuiPage from '../../exui-page/exui-page';
import {
  legends,
  checkboxes,
  radioButtons,
  buttons,
  dropdowns,
  inputs,
  subheadings,
} from './sdo-content';

@AllMethodsStep()
export default class SdoFragment extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications(
      [
        super.expectOptionChecked(checkboxes.sendDocs.selector),
        super.expectOptionChecked(checkboxes.sendWitness.selector),
        super.expectOptionChecked(radioButtons.docsBothParties.selector),
        super.expectOptionChecked(radioButtons.witnessesBothParties.selector),
        super.expectSubheading(subheadings.addExtraDoc),
        super.expectText(legends.directions),
        super.expectText(legends.docUploadParty),
        super.expectText(legends.docsDeadline),
        super.expectText(legends.experts),
        super.expectText(legends.witnessesDeadline),
      ],
      { runAxe: false },
    );
  }

  async verifyEnteredSdoDetails() {
    await super.runVerifications(
      [
        super.expectOptionChecked(checkboxes.sendDocs.selector),
        super.expectOptionChecked(checkboxes.sendWitness.selector),
        super.expectOptionChecked(radioButtons.docsBothParties.selector),
        super.expectOptionChecked(radioButtons.witnessesBothParties.selector),
        super.expectOptionChecked(radioButtons.yesExpert.selector),
        super.expectInputValue(inputs.expertReport.selector, inputs.expertReport.value),
        // super.expectDropdownOption(dropdowns.extraDirection.selector, dropdowns.extraDirection.options[0]),
        // super.expectDropdownOption(dropdowns.directionParty.selector, dropdowns.directionParty.options[0]),
        super.expectInputValue(
          inputs.otherDirectionsExtraDocUpload.selector,
          inputs.otherDirectionsExtraDocUpload.value,
        ),
        // super.expectDropdownOption(dropdowns.hearingCourt.selector, dropdowns.hearingCourt.options[0]),
        // super.expectDropdownOption(dropdowns.hearingDuration.selector, dropdowns.hearingDuration.options[0])
      ],
      { runAxe: false },
    );
  }

  async enterSdoDetails() {
    await super.clickBySelector(buttons.addNewExtraDocInstruction.selector);
    await super.inputText(inputs.extraDocUpload.value, inputs.extraDocUpload.selector);
    await super.clickBySelector(radioButtons.yesExpert.selector);
    await super.inputText(inputs.expertReport.value, inputs.expertReport.selector);
    await super.clickBySelector(buttons.addDirection.selector);
    await super.selectFromDropdown(
      dropdowns.extraDirection.options[0],
      dropdowns.extraDirection.selector,
    );
    await super.expectLabel(dropdowns.directionParty.label);
    // await super.expectSubheading(subheadings.sendDocsInstructions);
    await super.selectFromDropdown(
      dropdowns.directionParty.options[2],
      dropdowns.directionParty.selector,
    );
    await super.clickBySelector(buttons.addNewOtherDirectionsExtraDocInstruction.selector);
    await super.inputText('Test', inputs.otherDirectionsExtraDocUpload.selector);
    await super.selectFromDropdown(
      dropdowns.hearingCourt.options[0],
      dropdowns.hearingCourt.selector,
    );
    await super.selectFromDropdown(
      dropdowns.hearingDuration.options[0],
      dropdowns.hearingDuration.selector,
    );
  }

  async submit() {
    throw new Error('Method not implemented.');
  }
}
