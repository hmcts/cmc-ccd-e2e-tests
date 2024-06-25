import { heading } from './link-letter-holder-content';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import BasePage from '../../../../base/base-page';
import ExuiEvent from '../../mixins/exui-event';
import CaseworkerEvents from '../../../../enums/events/caseworker-events';
import { getCaseTitle } from '../../exui-common-content';
import { TruthyParams } from '../../../../decorators/truthy-params';
import CCDCaseData from '../../../../types/case-data/ccd-case-data';

@AllMethodsStep
export default class LinkLetterHolderPage extends ExuiEvent(BasePage) {

  async verifyContent(caseData: CCDCaseData) {
    await Promise.all([
      super.expectHeading(heading),
      super.expectHeading(getCaseTitle(caseData)),
      super.verifyEventSummaryContent(),
    ]);
  }

  async submitEvent() {
    await super.fillEventDetails(CaseworkerEvents.LINK_LETTER_HOLDER_ID);
    await super.clickSubmit();
  }
}
