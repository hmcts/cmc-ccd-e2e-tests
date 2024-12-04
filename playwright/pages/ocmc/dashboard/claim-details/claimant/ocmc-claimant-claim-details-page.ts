import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ClaimStoreCaseData from '../../../../../models/case-data/claim-store-case-data';
import { getSubHeading, links, tabs } from './ocmc-claimant-claim-details-content';

@AllMethodsStep()
export default class OcmcClaimantClaimDetailsPage extends BasePage {
  async verifyContent(caseData: ClaimStoreCaseData) {
    await super.runVerifications([
      super.expectSubheading(getSubHeading(caseData)),
      super.expectText(caseData.referenceNumber),
      super.expectText(tabs.latestUpdate),
      super.expectText(tabs.documents, { exact: true }),
    ]);
  }

  async breathingSpace() {
    await super.clickLink(links.breathingSpace.title);
  }
}
