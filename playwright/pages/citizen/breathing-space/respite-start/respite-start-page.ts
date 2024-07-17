import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import DateHelper from '../../../../helpers/date-helper';
import CitizenEvent from '../../citizen-event/citizen-event';
import { heading, inputs, paragraphs } from './respite-start-content';

@AllMethodsStep
export default class RespiteStartPage extends CitizenEvent(BasePage){
  async verifyContent(){
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectText(paragraphs.descriptionText),
      super.expectLabel(inputs.day.label),
      super.expectLabel(inputs.month.label),
      super.expectLabel(inputs.year.label),
    ]);
  }

  async enterRespiteStartDate() {
    const date = DateHelper.subtractFromToday({days: 1});
    await super.fill(date.getDate(), inputs.day.selector);
    await super.fill(date.getMonth(), inputs.month.selector);
    await super.fill(date.getFullYear(), inputs.year.selector);
    await super.clickSaveAndContinue();
  }

}