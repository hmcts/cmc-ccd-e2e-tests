import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../types/case-data/ccd-case-data';
import ExuiEvent from '../../../exui-event/exui-event';
import { heading } from './action-review-comment-2-content';
import DraftOrderFragment from '../../../fragments/draft-order/draft-order-fragment';
import { Page } from 'playwright-core';

@AllMethodsStep()
export default class ActionReviewComments2Page extends ExuiEvent(BasePage) {
  private draftOrderFragment: DraftOrderFragment;

  constructor(draftOrderFragment: DraftOrderFragment, page: Page) {
    super(page);
    this.draftOrderFragment = draftOrderFragment;
  }

  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      this.draftOrderFragment.verifyContent(caseData),
    ]);
  }

  async assign() {
    await this.draftOrderFragment.assignTo();
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
