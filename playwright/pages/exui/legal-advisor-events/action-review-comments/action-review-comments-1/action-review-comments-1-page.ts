import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/case-data/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';
import SdoFragment from '../../../fragments/sdo/sdo-fragment';
import { Page } from 'playwright-core';
import { heading } from './action-review-comments-1-content';

@AllMethodsStep()
export default class ActionReviewComments1Page extends ExuiPage(BasePage) {
  private sdoFragment: SdoFragment;

  constructor(sdoFragment: SdoFragment, page: Page) {
    super(page);
    this.sdoFragment = sdoFragment;
  }

  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      this.sdoFragment.verifyEnteredSdoDetails(),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
