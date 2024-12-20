import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import DateHelper from '../../../../../helpers/date-helper';
import ClaimStoreCaseData from '../../../../../models/case-data/claim-store-case-data';
import { heading, links, subheadings } from './defendant-response-dashboard-content';

@AllMethodsStep()
export default class DefendantResponseDashboardPage extends BasePage {
  async verifyContent(caseData: ClaimStoreCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectSubheading(subheadings.applicationIncomplete),
      super.expectSubheading(subheadings.prepareYourResponse),
      super.expectSubheading(subheadings.respondToClaim),
      super.expectSubheading(subheadings.submit),
      super.expectText(caseData.referenceNumber),
      super.expectText(DateHelper.formatDate(caseData.responseDeadline)),
      super.expectText(parseInt(caseData.totalAmountTillToday.toString())),
    ]);
  }

  async verifyContentAfterDisputeAll() {
    await super.runVerifications([
      super.expectSubheading(subheadings.resolveClaim),
      super.expectSubheading(subheadings.hearingDetails),
    ]);
  }

  async confirmYourDetails() {
    await super.clickLink(links.confirmYourDetails.title);
    await super.expectUrlEnd('/your-details');
  }

  async needMoreTime() {
    await super.clickLink(links.needMoreTime.title);
    await super.expectUrlEnd('/more-time-request');
  }

  async chooseResponse() {
    await super.clickLink(links.chooseResponse.title);
    await super.expectUrlEnd('/response-type');
  }

  async whyYouDisagree() {
    await super.clickLink(links.whyYouDisagree.title);
    await super.expectUrlEnd('/your-defence');
  }

  async checkAndSubmit() {
    await super.clickLink(links.checkAndSubmit.title);
  }
}
