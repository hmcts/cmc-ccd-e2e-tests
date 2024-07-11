import BasePage from '../../../base/base-page';
import CCDCaseData from '../../../types/case-data/ccd-case-data';
import ExuiEvents from '../../../types/exui-events';
import { eventInputs, buttons } from './exui-event-content';

export default function ExuiEvent<TBase extends abstract new (...args: any[]) => BasePage>(Base: TBase) {
  
  abstract class ExuiEvent extends Base {
    protected async verifyEventSummaryContent(options: {timeout: number} = {timeout: 0}) {
      await Promise.all([
        super.expectLabel(eventInputs.eventSummary.label, options),
        super.expectLabel(eventInputs.eventSummary.helperText, options),
        super.expectLabel(eventInputs.eventDescription.label, options),
      ]);
    }

    protected async verifyCaseTitle(caseData: CCDCaseData) {
      await super.expectHeading(caseData.caseName);
    }

    protected async uploadFile(filePath: string, selector: string, retries = 3, timeout = 5000) {
      await this.retryAction(
        () => super.uploadFile(filePath, selector), 
        () => super.waitForSelectorToDetach('span.error-message', {timeout}), 
        'Uploading document failed, trying again...', 
        {retries},
      );
    }

    protected async fillEventDetails(event: ExuiEvents) {
      await super.fill(event, eventInputs.eventSummary.selector);
      await super.fill(event, eventInputs.eventDescription.selector);
    }

    protected async clickSubmit(options: {count?: number} = {}) {
      await super.clickBySelector(buttons.submit.selector, options);
    }

    protected async retryClickSubmit(expect: () => Promise<void>) {
      await super.retryClick(buttons.submit.selector, expect);
    }

    abstract submitEvent(...args: any[]): Promise<void>;
  }

  return ExuiEvent;
}
