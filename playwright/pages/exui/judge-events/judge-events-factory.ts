import BasePageFactory from '../../../base/base-page-factory';
import DrawDirectionsOrder1Page from './draw-directions-order/draw-directions-order-1/draw-directions-order-1-page';
import DrawDirectionsOrder2Page from './draw-directions-order/draw-directions-order-2/draw-directions-order-2-page';
import DrawDirectionsOrder3Page from './draw-directions-order/draw-directions-order-3/draw-directions-order-3-page';

export default class JudgeEventsFactory extends BasePageFactory {

  get drawDirectionsOrder1Page() {
    return new DrawDirectionsOrder1Page(this.page, this.axeBuilder);
  }

  get drawDirectionsOrder2Page() {
    return new DrawDirectionsOrder2Page(this.page, this.axeBuilder);
  }

  get drawDirectionsOrder3Page() {
    return new DrawDirectionsOrder3Page(this.page, this.axeBuilder);
  }

}