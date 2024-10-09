import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../types/case-data/ccd-case-data';
import ExuiEvent from '../../../exui-event/exui-event';
import SdoFragment from '../../../fragments/sdo/sdo-fragment';
import { Page } from 'playwright-core';
import { heading } from './generate-order-1-content';

@AllMethodsStep()
export default class GenerateOrder1Page extends ExuiEvent(BasePage) {
  private sdoFragment: SdoFragment;

  constructor(sdoFragment: SdoFragment, page: Page) {
    super(page);
    this.sdoFragment = sdoFragment;
  }

  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      this.sdoFragment.verifyContent(),
    ]);
  }

  async enterSdoDetails() {
    await this.sdoFragment.enterSdoDetails();
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
