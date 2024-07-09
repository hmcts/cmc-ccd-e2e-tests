import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import LegalAdvisorEvents from '../../../../../enums/events/legal-advisor-events';
import CCDCaseData from '../../../../../types/case-data/ccd-case-data';
import ExuiEvent from '../../../exui-event/exui-event';
import { heading, radioButtons } from './generate-order-2-content';
import DraftOrderFragment from '../../../fragments/draft-order/draft-order-fragment';
import { Page } from 'playwright-core';
import AxeBuilder from '@axe-core/playwright';

@AllMethodsStep
export default class GenerateOrder2Page extends ExuiEvent(BasePage){

  private draftOrderFragment: DraftOrderFragment;

  constructor(draftOrderFragment: DraftOrderFragment, page: Page, axeBuilder: AxeBuilder) {
    super(page, axeBuilder);
    this.draftOrderFragment = draftOrderFragment;
  }

  async verifyContent(caseData: CCDCaseData) {
    await Promise.all([
      super.expectHeading(heading),
      super.verifyCaseTitle(caseData),
      this.draftOrderFragment.verifyContent(caseData),
    ]);
  }

  async chooseJudgeReviewFirst() {
    await super.clickBySelector(radioButtons.judgeReviewFirst.selector);
    await this.draftOrderFragment.assignTo();
    await super.clickSubmit();
  }


  async submitEvent() {
    await super.verifyEventSummaryContent()
    await super.fillEventDetails(LegalAdvisorEvents.GENERATE_ORDER);
    await super.clickSubmit();
  }
}