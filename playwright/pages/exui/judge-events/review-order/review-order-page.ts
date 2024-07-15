import { heading } from './review-order-content';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import BasePage from '../../../../base/base-page';
import ExuiEvent from '../../exui-event/exui-event';
import CCDCaseData from '../../../../types/case-data/ccd-case-data';
import JudgeEvents from '../../../../enums/events/judge-events';
import DraftOrderFragment from '../../fragments/draft-order/draft-order-fragment';
import { Page } from 'playwright-core';
import AxeBuilder from '@axe-core/playwright';

@AllMethodsStep
export default class ReviewOrderPage extends ExuiEvent(BasePage) {
  private draftOrderFragment: DraftOrderFragment;

  constructor(draftOrderFragment: DraftOrderFragment, page: Page, axeBuilder: AxeBuilder) {
    super(page, axeBuilder);
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
    await super.clickSubmit();
  }

  async submitEvent() {
    await super.verifyEventSummaryContent(),
    await super.fillEventDetails(JudgeEvents.REVIEW_ORDER);
    await super.clickSubmit();
  }
}