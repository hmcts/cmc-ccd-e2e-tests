import AxeBuilder from '@axe-core/playwright';
import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../types/case-data/ccd-case-data';
import ExuiEvent from '../../../exui-event/exui-event';
import SdoFragment from '../../../fragments/sdo/sdo-fragment';
import { heading } from './draw-directions-order-2-content';
import { Page } from 'playwright-core';

@AllMethodsStep
export default class DrawDirectionsOrder2Page extends ExuiEvent(BasePage){
  private sdoFragment: SdoFragment;

  constructor(sdoFragment: SdoFragment, page: Page, axeBuilder: AxeBuilder) {
    super(page, axeBuilder);
    this.sdoFragment = sdoFragment;
  }

  async verifyContent(caseData: CCDCaseData) {
    await Promise.all([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      this.sdoFragment.verifyContent(),
    ]);
  }

  async enterSdoDetails() {
    await this.sdoFragment.enterSdoDetails();
    await super.clickSubmit();
  }

  async submitEvent() {
    throw new Error('Method not implemented.');
  }
}