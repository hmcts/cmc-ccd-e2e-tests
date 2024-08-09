import BasePage from '../../../base/base-page';
import { AllMethodsStep } from '../../../decorators/test-steps';
import CCDCaseData from '../../../types/case-data/ccd-case-data';
import ExuiEvents from '../../../types/exui-events';
import { eventInputs, buttons, components } from './exui-event-content';

export default function ExuiEvent<TBase extends abstract new (...args: any[]) => BasePage>(
  Base: TBase,
) {
  @AllMethodsStep()
  abstract class ExuiEvent extends Base {
    protected async verifyEventSummaryContent(options: { timeout: number } = { timeout: 0 }) {
      await super.runVerifications(
        [
          super.expectLabel(eventInputs.eventSummary.label, options),
          super.expectLabel(eventInputs.eventSummary.helperText, options),
          super.expectLabel(eventInputs.eventDescription.label, options),
        ],
        { axe: false },
      );
    }

    protected async verifyCaseTitle(caseData: CCDCaseData) {
      await super.expectHeading(caseData.caseName);
    }

    protected async retryUploadFile(
      filePath: string,
      selector: string,
      retries = 3,
      timeout = 5000,
    ) {
      await this.retryAction(
        () => super.retryUploadFile(filePath, selector),
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
      await super.retryClickBySelectorTimeout(
        buttons.submit.selector,
        async () => {
          await super.waitForSelectorToDetach(components.loading.selector, {
            timeout: 30_000,
          });
          await super.expectNoSelector(components.error.selector, {
            timeout: 500,
          });
          if (expect) await expect();
        },
        { timeout: 60_000 },
      );
    }

    abstract submit(...args: any[]): Promise<void>;
  }

  return ExuiEvent;
}
