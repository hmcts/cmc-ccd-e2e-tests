import { heading } from './review-order-content';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import BasePage from '../../../../../base/base-page';
import ExuiEvent from '../../../exui-event/exui-event';
import CCDCaseData from '../../../../../models/case-data/ccd-case-data';
import DraftOrderFragment from '../../../fragments/draft-order/draft-order-fragment';
import { Page } from 'playwright-core';

@AllMethodsStep()
export default class ReviewOrderPage extends ExuiEvent(BasePage) {
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

  async reviewOrder() {
    await this.draftOrderFragment.assignTo();
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
