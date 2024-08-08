import BasePage from '../../../../../base/base-page';
import ClaimStoreCaseData from '../../../../../types/case-data/claim-store-case-data';
import { getSubHeading, links, tabs } from './claimant-claim-details-content';

export default class ClaimantClaimDetailsPage extends BasePage {
  async verifyContent(caseData: ClaimStoreCaseData) {
    await super.runVerifications([
      super.expectSubHeading(getSubHeading(caseData)),
      super.expectText(caseData.referenceNumber),
      super.expectText(tabs.latestUpdate),
      super.expectText(tabs.documents, { exact: true }),
    ]);
  }

  async breathingSpace() {
    await super.clickLink(links.breathingSpace.title);
  }
}
