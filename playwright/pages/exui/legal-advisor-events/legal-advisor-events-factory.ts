import BasePageFactory from '../../../base/base-page-factory';
import DraftOrderFragment from '../fragments/draft-order/draft-order-fragment';
import SdoFragment from '../fragments/sdo/sdo-fragment';
import ActionReviewComments1Page from './action-review-comments/action-review-comments-1/action-review-comments-1-page';
import ActionReviewComments2Page from './action-review-comments/action-review-comments-2/action-review-comments-2-page';
import ActionReviewCommentsSubmitPage from './action-review-comments/action-review-comments-submit/action-review-comments-submit-page';
import GenerateOrder1Page from './generate-order/generate-order-1/generate-order-1-page';
import GenerateOrder2Page from './generate-order/generate-order-2/generate-order-2-page';
import GenerateOrderSubmitPage from './generate-order/generate-order-submit/generate-order-submit-page';
import LaDrawDirectionsOrderSubmitPage from './la-draw-directions-order/la-draw-directions-order-submit/la-draw-directions-order-submit-page';
import LaDrawDirectionsOrderPage from './la-draw-directions-order/la-draw-directions-order/la-draw-directions-order-page';

export default class LegalAdvisorEventsFactory extends BasePageFactory {
  get generateOrder1Page() {
    const sdoFragment = new SdoFragment(this.page, this.axeBuilder);
    return new GenerateOrder1Page(sdoFragment, this.page, this.axeBuilder);
  }

  get generateOrder2Page() {
    const draftOrderFragment = new DraftOrderFragment(this.page, this.axeBuilder);
    return new GenerateOrder2Page(draftOrderFragment, this.page, this.axeBuilder);
  }

  get generateOrderSubmitPage() {
    return new GenerateOrderSubmitPage(this.page, this.axeBuilder);
  }

  get actionReviewComments1Page() {
    const sdoFragment = new SdoFragment(this.page, this.axeBuilder);
    return new ActionReviewComments1Page(sdoFragment, this.page, this.axeBuilder);
  }

  get actionReviewComments2Page() {
    const draftOrderFragment = new DraftOrderFragment(this.page, this.axeBuilder);
    return new ActionReviewComments2Page(draftOrderFragment, this.page, this.axeBuilder);
  }

  get actionReviewCommentsSubmitPage() {
    return new ActionReviewCommentsSubmitPage(this.page, this.axeBuilder);
  }

  get drawDirectionsOrderPage() {
    const draftOrderFragment = new DraftOrderFragment(this.page, this.axeBuilder);
    return new LaDrawDirectionsOrderPage(draftOrderFragment, this.page, this.axeBuilder);
  }

  get drawDirectionsOrderSubmitPage() {
    return new LaDrawDirectionsOrderSubmitPage(this.page, this.axeBuilder);
  }
}
