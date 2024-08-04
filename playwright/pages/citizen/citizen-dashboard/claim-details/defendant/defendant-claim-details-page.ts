import BasePage from '../../../../../base/base-page';
import ClaimStoreCaseData from '../../../../../types/case-data/claim-store-case-data';
import { getHeading, links, tabs } from './defendant-claim-details-content';

export default class DefendantClaimDetailsPage extends BasePage {
  async verifyContent(caseData: ClaimStoreCaseData) {
    await super.runVerifications([super.expectHeading(getHeading(caseData)), super.expectText(caseData.referenceNumber), super.expectText(tabs.latestUpdate), super.expectText(tabs.documents, { exact: true })]);
  }

  async respondToClaim() {
    await super.clickLink(links.respond.title);
  }
}
