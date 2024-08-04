import BasePageFactory from '../../../base/base-page-factory';
import CheckAnswersPage from './check-answers/check-answers-page';
import ReferenceNumberPage from './reference-number/reference-number-page';
import RespiteEndPage from './respite-end/respite-end-page';
import RespiteStartPage from './respite-start/respite-start-page';
import RespiteTypePage from './respite-type/respite-type-page';

export default class BreathingSpaceFactory extends BasePageFactory {
  get referenceNumberPage() {
    return new ReferenceNumberPage(this.page, this.axeBuilder);
  }

  get respiteStartPage() {
    return new RespiteStartPage(this.page, this.axeBuilder);
  }

  get respiteTypePage() {
    return new RespiteTypePage(this.page, this.axeBuilder);
  }

  get respiteEndPage() {
    return new RespiteEndPage(this.page, this.axeBuilder);
  }

  get checkAnswersPage() {
    return new CheckAnswersPage(this.page, this.axeBuilder);
  }
}
