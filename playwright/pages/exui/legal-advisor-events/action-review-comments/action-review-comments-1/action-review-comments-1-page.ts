import AxeBuilder from '@axe-core/playwright';
import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../types/case-data/ccd-case-data';
import ExuiEvent from '../../../exui-event/exui-event';
import SdoFragment from '../../../fragments/sdo/sdo-fragment';
import { Page } from 'playwright-core';
import { heading } from './action-review-comments-1-content';

@AllMethodsStep()
export default class ActionReviewComments1Page extends ExuiEvent(BasePage){
  private sdoFragment: SdoFragment;

  constructor(sdoFragment: SdoFragment, page: Page, axeBuilder: AxeBuilder) {
    super(page, axeBuilder);
    this.sdoFragment = sdoFragment;
  }

  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      this.sdoFragment.verifyEnteredSdoDetails(),
    ]);
  }

  async confirmSdoDetails() {
    await super.clickSubmit();
  }

  async submitEvent() {
    throw new Error('Method not implemented.');
  }
}