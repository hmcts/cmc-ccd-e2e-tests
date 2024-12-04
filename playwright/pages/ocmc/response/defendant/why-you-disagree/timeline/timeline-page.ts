import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import OcmcEvent from '../../../../ocmc-event/ocmc-event';
import { heading, subheadings, inputs } from './timeline-content';

@AllMethodsStep()
export default class TimelinePage extends OcmcEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectSubheading(subheadings.addTimeline),
      // super.expectSubheading(subheadings.theirTimeline),
      // super.expectLabel(inputs.date1.label),
      // super.expectLabel(inputs.date2.label),
    ]);
  }

  async fillTimelineDetails() {
    await super.inputText('10 December 2023', inputs.date1.selector);
    await super.inputText('Nothing happened', inputs.timeline1.selector);
    await super.inputText('15 December 2023', inputs.date2.selector);
    await super.inputText('Nothing happened', inputs.timeline2.selector);
    await super.inputText('No comment', inputs.comment.selector);
    await super.clickSaveAndContinue();
  }
}
