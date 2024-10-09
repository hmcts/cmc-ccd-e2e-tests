import BasePageFactory from '../../../base/base-page-factory';
import OcmcClaimDetailsPage from './claim-details/ocmc-claim-details-page';
import OcmcEnterClaimNumberPage from './enter-claim-number/ocmc-enter-claim-number-page';
import OcmcEnterSecurityCodePage from './enter-security-code/ocmc-enter-security-code-page';
import OcmcRespondToClaimPage from './respond-to-claim/ocmc-respond-to-claim-page';

export default class OcmcLinkClaimFactory extends BasePageFactory {
  get ocmcRespondToClaimPage() {
    return new OcmcRespondToClaimPage(this.page);
  }

  get ocmcEnterClaimNumberPage() {
    return new OcmcEnterClaimNumberPage(this.page);
  }

  get ocmcEnterSecurityCodePage() {
    return new OcmcEnterSecurityCodePage(this.page);
  }

  get ocmcClaimDetailsPage() {
    return new OcmcClaimDetailsPage(this.page);
  }
}
