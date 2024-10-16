import BasePageFactory from '../../../base/base-page-factory';
import CuiClaimDetailsPage from './claim-details/cui-claim-details-page';
import CuiEnterClaimNumberPage from './enter-claim-number/cui-enter-claim-number-page';
import CuiEnterSecurityCodePage from './enter-security-code/cui-enter-security-code-page';
import CuiRespondToClaimPage from './respond-to-claim/cui-respond-to-claim-page';

export default class CuiLinkClaimFactory extends BasePageFactory {
  get cuiRespondToClaimPage() {
    return new CuiRespondToClaimPage(this.page);
  }

  get cuiEnterClaimNumberPage() {
    return new CuiEnterClaimNumberPage(this.page);
  }

  get cuiEnterSecurityCodePage() {
    return new CuiEnterSecurityCodePage(this.page);
  }

  get cuiClaimDetailsPage() {
    return new CuiClaimDetailsPage(this.page);
  }
}
