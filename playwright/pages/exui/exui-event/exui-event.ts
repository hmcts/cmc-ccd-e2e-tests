import BasePage from '../../../base/base-page';
import { DetailedStep } from '../../../decorators/test-steps';
import CCDCaseData from '../../../types/case-data/ccd-case-data';
import ExuiEvents from '../../../types/exui-events';
import { eventInputs, buttons, components } from './exui-event-content';

const classKey = 'ExuiEvent';

export default function ExuiEvent<TBase extends abstract new (...args: any[]) => BasePage>(Base: TBase) {
  abstract class ExuiEvent extends Base {
    protected async verifyEventSummaryContent(options: { timeout: number } = { timeout: 0 }) {
      await super.runVerifications([super.expectLabel(eventInputs.eventSummary.label, options), super.expectLabel(eventInputs.eventSummary.helperText, options), super.expectLabel(eventInputs.eventDescription.label, options)], { axe: false });
    }

    protected async verifyCaseTitle(caseData: CCDCaseData) {
      await super.expectHeading(caseData.caseName);
    }

    @DetailedStep(classKey, 'filePath', 'selector')
    protected async uploadFile(filePath: string, selector: string, retries = 3, timeout = 5000) {
      await this.retryAction(
        () => super.uploadFile(filePath, selector),
        () => super.waitForSelectorToDetach('span.error-message', { timeout }),
        'Uploading document failed, trying again...',
        { retries },
      );
    }

    protected async fillEventDetails(event: ExuiEvents) {
      await super.inputText(event, eventInputs.eventSummary.selector);
      await super.inputText(event, eventInputs.eventDescription.selector);
    }

    protected async clickSubmit(options: { count?: number } = {}) {
      await super.clickBySelector(buttons.submit.selector, options);
      await super.waitForSelectorToDetach(components.loading.selector);
    }

    protected async retryClickSubmit(expect?: () => Promise<void>) {
      await super.retryClickBySelector(buttons.submit.selector, async () => {
        await super.waitForSelectorToDetach(components.loading.selector, {
          timeout: 30_000,
        });
        await super.expectSelector(components.error.selector, {
          visible: false,
          timeout: 2000,
        });
        if (expect) await expect();
      });
    }

    abstract submit(...args: any[]): Promise<void>;
  }

  return ExuiEvent;
}
