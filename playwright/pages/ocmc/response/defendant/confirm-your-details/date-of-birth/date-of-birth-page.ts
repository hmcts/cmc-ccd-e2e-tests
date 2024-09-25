import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import OcmcEvent from '../../../../ocmc-event/ocmc-event';
import { heading, inputs } from './date-of-birth-content';

@AllMethodsStep()
export default class DateOfBirthPage extends OcmcEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectLabel(inputs.day.label),
      super.expectLabel(inputs.month.label),
      super.expectLabel(inputs.year.label),
    ]);
  }

  async fillDateOfBirth() {
    await super.inputText('10', inputs.day.selector);
    await super.inputText('12', inputs.month.selector);
    await super.inputText('2000', inputs.year.selector);
    await super.clickSaveAndContinue();
  }
}
