import BasePageFactory from '../../../base/base-page-factory';
import DraftOrderFragment from '../fragments/draft-order/draft-order-fragment';
import SdoFragment from '../fragments/sdo/sdo-fragment';
import ApproveDirectionsOrderPage from './approve-directions-order/approve-directions-order-page';
import DrawDirectionsOrder1Page from './draw-directions-order/draw-directions-order-1/draw-directions-order-1-page';
import DrawDirectionsOrder2Page from './draw-directions-order/draw-directions-order-2/draw-directions-order-2-page';
import DrawDirectionsOrder3Page from './draw-directions-order/draw-directions-order-3/draw-directions-order-3-page';
import ProvideDirectionsPage from './provide-directions/provide-directions-page';
import ReviewOrderPage from './review-order/review-order-page';

export default class JudgeEventsFactory extends BasePageFactory {

  get drawDirectionsOrder1Page() {
    return new DrawDirectionsOrder1Page(this.page, this.axeBuilder);
  }

  get drawDirectionsOrder2Page() {
    const sdoFragment = new SdoFragment(this.page, this.axeBuilder);
    return new DrawDirectionsOrder2Page(sdoFragment, this.page, this.axeBuilder);
  }

  get drawDirectionsOrder3Page() {
    const draftOrderFragment = new DraftOrderFragment(this.page, this.axeBuilder);
    return new DrawDirectionsOrder3Page(draftOrderFragment, this.page, this.axeBuilder);
  }

  get provideDirectionsPage() {
    return new ProvideDirectionsPage(this.page, this.axeBuilder);
  }

  get reviewOrderPage() {
    const draftOrderFragment = new DraftOrderFragment(this.page, this.axeBuilder);
    return new ReviewOrderPage(draftOrderFragment, this.page, this.axeBuilder);
  }

  get approveDirectionsOrderPage() {
    const draftOrderFragment = new DraftOrderFragment(this.page, this.axeBuilder);
    return new ApproveDirectionsOrderPage(draftOrderFragment, this.page, this.axeBuilder);
  }

}