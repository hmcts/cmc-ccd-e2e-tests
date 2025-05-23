import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/case-data/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';
import { heading, radioButtons } from './generate-order-2-content';
import DraftOrderFragment from '../../../fragments/draft-order/draft-order-fragment';
import { Page } from 'playwright-core';

@AllMethodsStep()
export default class GenerateOrder2Page extends ExuiPage(BasePage) {
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

  async chooseJudgeReviewFirst() {
    await super.clickBySelector(radioButtons.judgeReviewFirst.selector);
    await this.draftOrderFragment.assignTo();
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
