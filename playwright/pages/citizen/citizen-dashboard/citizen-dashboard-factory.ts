
import BasePageFactory from '../../../base/base-page-factory';
import PageCookiesManager from '../../common/page-cookies-manager';
import DashboardPage from './dashboard/dashboard-page';
import CitizenCookiesBanner from './citizen-cookies-banner/citizen-cookies-banner';
import CitizenNavBar from './citizen-nav-bar/citizen-nav-bar';
import DefendantClaimDetailsPage from './claim-details/defendant/defendant-claim-details-page';
import ClaimantClaimDetailsPage from './claim-details/claimant/claimant-claim-details-page';

export default class CitizenDashboardFactory extends BasePageFactory {
  
  get pageCookiesManager() {
    return new PageCookiesManager(this.page);
  }

  get citizensCookiesBanner() {
    return new CitizenCookiesBanner(this.page, this.axeBuilder);
  }
  
  get navBar() {
    return new CitizenNavBar(this.page, this.axeBuilder);
  }
  
  get dashboardPage() {
    return new DashboardPage(this.page, this.axeBuilder);
  }

  get defendantClaimDetailsPage() {
    return new DefendantClaimDetailsPage(this.page, this.axeBuilder);
  }

  get claimantClaimDetailsPage() {
    return new ClaimantClaimDetailsPage(this.page, this.axeBuilder);
  }
}