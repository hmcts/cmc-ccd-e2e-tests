import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import CitizenEvent from '../../citizen-event/citizen-event';
import { heading, tableHeadings } from './check-answers-content';

@AllMethodsStep
export default class CheckAnswersPage extends CitizenEvent(BasePage){
  
  async verifyContent(){
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectText(tableHeadings.refNum, {exact: true}),
      super.expectText(tableHeadings.respiteStart),
      super.expectText(tableHeadings.respiteType),
      super.expectText(tableHeadings.respiteEnd),
    ]);
  }

  async submit() {
    await super.clickSubmit();
  }

}