import BasePage from "../../../../../base/base-page";
import { AllMethodsStep } from "../../../../../decorators/test-steps";
import DateHelper from "../../../../../helpers/date-helper";
import ClaimStoreCaseData from "../../../../../types/case-data/claim-store-case-data";
import ResponseDashboardPage from "../../common/response-dashboard/response-dashboard-page";
import { heading, links, subHeadings } from "./defendant-response-dashboard-content";

@AllMethodsStep
export default class DefendantResponseDashboardPage extends BasePage {
  async verifyContent(caseData: ClaimStoreCaseData) {
    await Promise.all([
      super.expectHeading(heading),
      super.expectSubHeading(subHeadings.applicationIncomplete),
      super.expectSubHeading(subHeadings.prepareYourResponse),
      super.expectSubHeading(subHeadings.respondToClaim),
      super.expectSubHeading(subHeadings.submit),
      super.expectText(caseData.referenceNumber),
      super.expectText(DateHelper.formatDate(caseData.responseDeadline)),
      super.expectText(parseInt(caseData.totalAmountTillToday.toString())),
    ]);
  }

  async verifyContentAfterDisputeAll() {
    await Promise.all([
      super.expectSubHeading(subHeadings.resolveClaim),
      super.expectSubHeading(subHeadings.hearingDetails),
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