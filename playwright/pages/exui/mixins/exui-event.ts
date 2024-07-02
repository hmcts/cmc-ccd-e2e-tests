import BasePage from '../../../base/base-page';
import { AllMethodsStep } from '../../../decorators/test-steps';
import CCDCaseData from '../../../types/case-data/ccd-case-data';
import ExuiEvents from '../../../types/exui-events';
import { cButtons, cInputs, getCaseTitle } from '../exui-common-content'

export default function ExuiEvent<TBase extends abstract new (...args: any[]) => BasePage>(Base: TBase) {
  
  @AllMethodsStep
  abstract class ExuiEvent extends Base {
    protected async verifyEventSummaryContent() {
      await Promise.all([
        super.expectLabel(cInputs.eventSummary.label),
        super.expectLabel(cInputs.eventSummary.helperText),
        super.expectLabel(cInputs.eventDescription.label),
      ]);
    }

    protected async verifyCaseTitle(caseData: CCDCaseData) {
      await super.expectHeading(getCaseTitle(caseData))
    }

    protected async uploadFile(filePath: string, selector: string, retries = 3, timeout = 5000) {
      while(retries > 0) {
        try {
          await super.uploadFile(filePath, selector);
          await super.waitForSelectorToDetach('span.error-message', {timeout});
          break;
        } catch (error) {
          retries--;
          console.log('\n' + '-'.repeat(100));
          if(retries <= 0) throw error;
          // console.log(error);
          console.log('Uploading document again');
          console.log(`Retries: ${retries} remaining`);
        }
      }
    }

    protected async fillEventDetails(event: ExuiEvents) {
      await super.fill(event, cInputs.eventSummary.selector);
      await super.fill(event, cInputs.eventDescription.selector);
    }

    protected async clickSubmit() {
      await super.clickBySelector(cButtons.submit.selector);
    }

    abstract submitEvent(...args: any[]): Promise<void>;
  }

  return ExuiEvent;
}
