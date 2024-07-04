import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import CitizenEvent from '../../../../mixins/citizen-events/citizen-events';
import { checkboxes, heading, inputs } from './support-required-content';

@AllMethodsStep
export default class SupportRequiredPage extends CitizenEvent(BasePage) {

  async verifyContent() {
    await Promise.all([
      super.expectHeading(heading),
      super.expectLabel(checkboxes.disabledAccess.label),
      super.expectLabel(checkboxes.hearingLoop.label),
      super.expectLabel(checkboxes.signLanguageInterpreter.label),
      super.expectLabel(checkboxes.languageInterpreter.label, {exact: true}),
      super.expectLabel(checkboxes.otherSupport.label),
    ]);
  }

  async chooseRequirements() {
    await super.clickBySelector(checkboxes.disabledAccess.selector);
    await super.clickBySelector(checkboxes.hearingLoop.selector);
    await super.clickBySelector(checkboxes.signLanguageInterpreter.selector);
    await super.fill('BSL', inputs.signLanguageInterpreter.selector);
    await super.clickBySelector(checkboxes.languageInterpreter.selector);
    await super.fill('Russian', inputs.languageInterpreter.selector);
    await super.clickBySelector(checkboxes.otherSupport.selector);
    await super.fill('Nothing', inputs.otherSupport.selector);
    await super.clickSaveAndContinue();
  }
}