import BasePage from '../../../base/base-page';
import config from '../../../config/config';
import { AllMethodsStep } from '../../../decorators/test-steps';
import CCDCaseData from '../../../models/case-data/ccd-case-data';
import ExuiEvents from '../../../models/exui-events';
import { eventInputs, buttons, components, links } from './exui-content';

export default function ExuiPage<TBase extends abstract new (...args: any[]) => BasePage>(
  Base: TBase,
) {
  @AllMethodsStep()
  abstract class ExuiPage extends Base {
    protected async verifyEventSummaryContent(options: { timeout: number } = { timeout: 0 }) {
      await super.runVerifications(
        [
          super.expectLabel(eventInputs.eventSummary.label, options),
          super.expectLabel(eventInputs.eventSummary.helperText, options),
          super.expectLabel(eventInputs.eventDescription.label, options),
        ],
        { runAxe: false },
      );
    }

    protected async verifyCaseTitle(caseData: CCDCaseData) {
      await super.expectHeading(caseData.caseName);
    }

    protected async waitForPageToLoad() {
      await Promise.race([
        super.waitForSelectorToDetach(components.loading.selector, {
          timeout: config.exui.pageSubmitTimeout,
        }),
        super.waitForUrlToChange({ timeout: config.exui.pageSubmitTimeout }),
      ]);
    }

    protected async retryUploadFile(
      filePath: string,
      selector: string,
      { retries = 3, timeout = 5000 } = {},
    ) {
      await this.retryAction(
        () => super.uploadFile(filePath, selector),
        () =>
          super.expectNoSelector(components.uploadDocError.selector, {
            timeout,
            all: true,
            message: 'Uploading document failed',
          }),
        undefined,
        { retries, message: 'Uploading document failed, trying again...' },
      );
    }

    protected async fillEventDetails(event: ExuiEvents) {
      await super.inputText(event, eventInputs.eventSummary.selector);
      await super.inputText(event, eventInputs.eventDescription.selector);
    }

    protected async clickSubmit() {
      await super.clickBySelector(buttons.submit.selector);
      await super.waitForSelectorToDetach(components.loading.selector);
    }

    protected async retryClickSubmit(expect?: () => Promise<void>) {
      await super.retryClickBySelector(
        buttons.submit.selector,
        async () => {
          await this.waitForPageToLoad();
          await super.expectNoSelector(components.error.selector, {
            timeout: 200,
            all: true,
          });
          if (expect) await expect();
        },
        async () =>
          super.expectNoSelector(components.loading.selector, {
            timeout: 15,
            message: `Loading spinner expected to disappear after ${config.exui.pageSubmitTimeout}ms`,
          }),
        {
          retries: 2,
          message: 'Clicking submit button failed, trying again',
        },
      );
      await super.expectNoSelector(components.fieldError.selector, {
        timeout: 200,
        all: true,
        message: 'Field Validation Error on UI',
      });
    }

    abstract submit(...args: any[]): Promise<void>;
  }

  return ExuiPage;
}
