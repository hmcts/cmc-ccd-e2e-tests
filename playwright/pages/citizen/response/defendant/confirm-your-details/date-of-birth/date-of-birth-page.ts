import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import CitizenEvent from '../../../../mixins/citizen-events';
import { heading, inputs } from './date-of-birth-content';

@AllMethodsStep
export default class DateOfBirthPage extends CitizenEvent(BasePage){
  
  async verifyContent() {
    await Promise.all([
      super.expectHeading(heading),
      super.expectLabel(inputs.day.label),
      super.expectLabel(inputs.month.label),
      super.expectLabel(inputs.year.label),
    ]);
  }

  async fillDateOfBirth() {
    await super.fill('10', inputs.day.selector);
    await super.fill('12', inputs.month.selector);
    await super.fill('2000', inputs.year.selector);
    await super.clickSaveAndContinue();
  }
}