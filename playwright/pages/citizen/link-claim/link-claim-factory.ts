import BasePageFactory from '../../../base/base-page-factory';
import ClaimDetailsPage from './claim-details/claim-details-page';
import EnterClaimNumberPage from './enter-claim-number/enter-claim-number-page';
import EnterSecurityCodePage from './enter-security-code/enter-security-code-page';
import RespondToClaimPage from './respond-to-claim/respond-to-claim-page';

export default class LinkClaimFactory extends BasePageFactory {

  get respondToClaimPage() {
    return new RespondToClaimPage(this.page, this.axeBuilder);
  }
  
  get enterClaimNumberPage() {
    return new EnterClaimNumberPage(this.page, this.axeBuilder);
  }

  get enterSecurityCodePage() {
    return new EnterSecurityCodePage(this.page, this.axeBuilder);
  }

  get claimDetailsPage() {
    return new ClaimDetailsPage(this.page, this.axeBuilder);
  }

}