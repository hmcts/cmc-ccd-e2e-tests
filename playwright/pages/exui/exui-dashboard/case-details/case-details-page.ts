import BasePage from '../../../../base/base-page';
import urls from '../../../../config/urls';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { TruthyParams } from '../../../../decorators/truthy-params';
import CaseData from '../../../../types/case-data';
import { tabs, getHeading, dropdowns, buttons } from './case-details-content';

@AllMethodsStep
export default class CaseDetailsPage extends BasePage {
  async verifyContent(caseData: CaseData): Promise<void> {
    await Promise.all([
      super.expectHeadingToBeVisible(getHeading(caseData)),
      super.expectTextToBeVisible(tabs.claimHistory.title),
      super.expectTextToBeVisible(tabs.claimDetails.title),
      super.expectTextToBeVisible(tabs.defendantDetails.title),
      super.expectTextToBeVisible(tabs.claimDocs.title),
      super.expectLabelToBeVisible(dropdowns.nextStep.label),
    ]);
  }

  @TruthyParams('caseNumber')
  async goToCaseDetails(caseNumber: number) {
    await super.goTo(`${urls.manageCase}/cases/case-details/${caseNumber}`);
  }

  private async chooseNextStep(option: string) {
    await super.selectFromDropdown(option, dropdowns.nextStep.selector);
    await super.clickBySelector(buttons.go.selector);
  }

  async startClaimNotes(option: string) {
    await this.chooseNextStep(dropdowns.nextStep.options.claimNotes);
  }
}
