import BasePageFactory from '../../../base/base-page-factory';
import DraftOrderFragment from '../fragments/draft-order/draft-order-fragment';
import SdoFragment from '../fragments/sdo/sdo-fragment';
import ApproveDirectionsOrderSubmitPage from './approve-directions-order/approve-directions-order-submit/approve-directions-order-submit-page';
import ApproveDirectionsOrderPage from './approve-directions-order/approve-directions-order/approve-directions-order-page';
import JudgeDrawDirectionsOrder1Page from './judge-draw-directions-order/judge-draw-directions-order-1/judge-draw-directions-order-1-page';
import JudgeDrawDirectionsOrder2Page from './judge-draw-directions-order/judge-draw-directions-order-2/judge-draw-directions-order-2-page';
import JudgeDrawDirectionsOrder3Page from './judge-draw-directions-order/judge-draw-directions-order-3/judge-draw-directions-order-3-page';
import JudgeDrawDirectionsOrderSubmitPage from './judge-draw-directions-order/judge-draw-directions-order-submit/judge-draw-directions-order-submit-page';
import ProvideDirectionsSubmitPage from './provide-directions/provide-directions-submit/provide-directions-submit-page';
import ReviewOrderSubmitPage from './review-order/review-order-submit/review-order-submit-page';
import ReviewOrderPage from './review-order/review-order/review-order-page';

export default class JudgeEventsFactory extends BasePageFactory {
  get judgeDrawDirectionsOrder1Page() {
    return new JudgeDrawDirectionsOrder1Page(this.page, this.axeBuilder);
  }

  get judgeDrawDirectionsOrder2Page() {
    const sdoFragment = new SdoFragment(this.page, this.axeBuilder);
    return new JudgeDrawDirectionsOrder2Page(sdoFragment, this.page, this.axeBuilder);
  }

  get judgeDrawDirectionsOrder3Page() {
    const draftOrderFragment = new DraftOrderFragment(this.page, this.axeBuilder);
    return new JudgeDrawDirectionsOrder3Page(draftOrderFragment, this.page, this.axeBuilder);
  }

  get judgeDrawDirectionsOrderSubmitPage() {
    return new JudgeDrawDirectionsOrderSubmitPage(this.page, this.axeBuilder);
  }

  get provideDirectionsSubmitPage() {
    return new ProvideDirectionsSubmitPage(this.page, this.axeBuilder);
  }

  get reviewOrderPage() {
    const draftOrderFragment = new DraftOrderFragment(this.page, this.axeBuilder);
    return new ReviewOrderPage(draftOrderFragment, this.page, this.axeBuilder);
  }

  get reviewOrderSubmitPage() {
    return new ReviewOrderSubmitPage(this.page, this.axeBuilder);
  }

  get approveDirectionsOrderPage() {
    const draftOrderFragment = new DraftOrderFragment(this.page, this.axeBuilder);
    return new ApproveDirectionsOrderPage(draftOrderFragment, this.page, this.axeBuilder);
  }

  get approveDirectionsOrdeSubmitPage() {
    return new ApproveDirectionsOrderSubmitPage(this.page, this.axeBuilder);
  }
}
