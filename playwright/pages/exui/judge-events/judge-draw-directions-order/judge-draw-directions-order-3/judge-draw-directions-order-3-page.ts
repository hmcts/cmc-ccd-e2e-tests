import { Page } from 'playwright-core';
import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/case-data/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';
import DraftOrderFragment from '../../../fragments/draft-order/draft-order-fragment';
import { heading } from './judge-draw-directions-order-3-content';

@AllMethodsStep()
export default class JudgeDrawDirectionsOrder3Page extends ExuiPage(BasePage) {
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

  async submit() {
    await super.retryClickSubmit();
  }
}
