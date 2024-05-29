import BasePage from '../../../base/base-page';
import ExuiEvents from '../../../types/exui-events';
import { cButtons, cInputs } from '../exui-common-content';

export default function ExuiEvent<TBase extends abstract new (...args: any[]) => BasePage>(Base: TBase) {
  abstract class ExuiEvent extends Base {
    protected async verifyEventSummaryContent() {
      await Promise.all([
        super.expectLabelToBeVisible(cInputs.eventSummary.label),
        super.expectLabelToBeVisible(cInputs.eventSummary.helperText),
        super.expectLabelToBeVisible(cInputs.eventDescription.label),
      ]);
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
