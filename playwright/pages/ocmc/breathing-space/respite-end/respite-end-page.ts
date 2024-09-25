import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import DateHelper from '../../../../helpers/date-helper';
import OcmcEvent from '../../ocmc-event/ocmc-event';
import { paragraphs, heading, inputs } from './respite-end-content';

@AllMethodsStep()
export default class RespiteEndPage extends OcmcEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectText(paragraphs.descriptionText),
      super.expectLabel(inputs.day.label),
      super.expectLabel(inputs.month.label),
      super.expectLabel(inputs.year.label),
    ]);
  }

  async enterRespiteEndDate() {
    const date = DateHelper.addToToday({ months: 1 });
    await super.inputText(date.getDate(), inputs.day.selector);
    await super.inputText(date.getMonth(), inputs.month.selector);
    await super.inputText(date.getFullYear(), inputs.year.selector);
    await super.clickSaveAndContinue();
  }
}
