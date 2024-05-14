import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { heading, buttons } from './create-claim-draft-content';

@AllMethodsStep
export default class CreateClaimDraftPage extends BasePage{
  
  async verifyContent(): Promise<void> {
    await super.expectHeadingToBeVisible(heading);
  }

  async clickCreateClaimDraft() {
    await super.clickButtonByName(buttons.createClaimDraft);
  }
  
}