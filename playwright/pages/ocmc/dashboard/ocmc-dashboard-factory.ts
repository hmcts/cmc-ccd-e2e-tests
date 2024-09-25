import BasePageFactory from '../../../base/base-page-factory';
import OcmcClaimantClaimDetailsPage from './claim-details/claimant/ocmc-claimant-claim-details-page';
import OcmcDefendantClaimDetailsPage from './claim-details/defendant/ocmc-defendant-claim-details-page';
import OcmcCookiesBanner from './cookies-banner/ocmc-cookies-banner';
import OcmcDashboardPage from './dashboard/ocmc-dashboard-page';
import OcmcNavBar from './nav-bar/ocmc-nav-bar';

export default class OcmcDashboardFactory extends BasePageFactory {
  get ocmcCookiesBanner() {
    return new OcmcCookiesBanner(this.page, this.axeBuilder);
  }

  get ocmcNavBar() {
    return new OcmcNavBar(this.page, this.axeBuilder);
  }

  get ocmcDashboardPage() {
    return new OcmcDashboardPage(this.page, this.axeBuilder);
  }

  get ocmcDefendantClaimDetailsPage() {
    return new OcmcDefendantClaimDetailsPage(this.page, this.axeBuilder);
  }

  get ocmcClaimantClaimDetailsPage() {
    return new OcmcClaimantClaimDetailsPage(this.page, this.axeBuilder);
  }
}
