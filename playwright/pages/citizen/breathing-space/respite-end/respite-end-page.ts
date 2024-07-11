import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import DateHelper from '../../../../helpers/date-helper';
import CitizenEvent from '../../citizen-event/citizen-event';
import { paragraphs, heading, inputs } from './respite-end-content';

@AllMethodsStep
export default class RespiteEndPage extends CitizenEvent(BasePage){
  async verifyContent(){
    await Promise.all([
      super.expectHeading(heading),
      super.expectText(paragraphs.descriptionText),
      super.expectLabel(inputs.day.label),
      super.expectLabel(inputs.month.label),
      super.expectLabel(inputs.year.label),
    ]);
  }

  async enterRespiteEndDate() {
    const date = DateHelper.addToToday({months: 1});
    await super.fill(date.getDate(), inputs.day.selector);
    await super.fill(date.getMonth(), inputs.month.selector);
    await super.fill(date.getFullYear(), inputs.year.selector);
    await super.clickSaveAndContinue();
  }

}