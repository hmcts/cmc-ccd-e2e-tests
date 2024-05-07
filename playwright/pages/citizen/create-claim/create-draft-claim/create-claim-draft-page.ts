import BasePage from '../../../../base/base-page';
import { heading, buttons } from './create-claim-draft-content';

export default class CreateClaimDraftPage extends BasePage{
  
  async verifyContent(): Promise<void> {
    await super.expectHeadingToBeVisible(heading);
  }

  async clickCreateClaimDraft() {
    await super.clickButtonByName(buttons.createClaimDraft);
  }
  
}