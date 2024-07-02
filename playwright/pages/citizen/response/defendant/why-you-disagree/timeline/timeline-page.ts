import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import CitizenEvent from '../../../../mixins/citizen-events';
import { heading, subHeadings, inputs } from './timeline-content';

@AllMethodsStep
export default class TimelinePage extends CitizenEvent(BasePage) {
  async verifyContent() {
    await Promise.all([
      super.expectHeading(heading),
      super.expectSubHeading(subHeadings.addTimeline),
      // super.expectSubHeading(subHeadings.theirTimeline),
      super.expectLabel(inputs.date1.label),
      super.expectLabel(inputs.date2.label),
    ]);
  }

  async fillTimelineDetails() {
    await super.fill('10 December 2023', inputs.date1.selector);
    await super.fill('Nothing happened', inputs.timeline1.selector);
    await super.fill('15 December 2023', inputs.date2.selector);
    await super.fill('Nothing happened', inputs.timeline2.selector);
    await super.fill('No comment', inputs.comment.selector);
    await super.clickSaveAndContinue();
  }
}