import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import CitizenEvent from '../../../../citizen-event/citizen-event';
import { heading, subHeadings, inputs } from './timeline-content';

@AllMethodsStep()
export default class TimelinePage extends CitizenEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectSubHeading(subHeadings.addTimeline),
      // super.expectSubHeading(subHeadings.theirTimeline),
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
