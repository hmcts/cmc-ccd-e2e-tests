import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ClaimStoreCaseData from '../../../../../models/case-data/claim-store-case-data';
import { getHeading, links, tabs } from './ocmc-defendant-claim-details-content';

@AllMethodsStep()
export default class OcmcDefendantClaimDetailsPage extends BasePage {
  async verifyContent(caseData: ClaimStoreCaseData) {
    await super.runVerifications([
      super.expectHeading(getHeading(caseData)),
      super.expectText(caseData.referenceNumber),
      super.expectText(tabs.latestUpdate),
      super.expectText(tabs.documents, { exact: true }),
    ]);
  }

  async respondToClaim() {
    await super.clickLink(links.respond.title);
  }
}
