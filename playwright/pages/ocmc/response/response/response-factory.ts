import BasePageFactory from '../../../../base/base-page-factory';
import ConfirmYourNumberPage from './free-mediation/confirm-your-number/confirm-your-number-page';
import FreeTelephoneMediationPage from './free-mediation/free-telephone-mediation/free-telephone-mediation-page';
import MediationPhoneNumberPage from './free-mediation/mediation-phone-number/mediation-phone-number-page';
import DeterminationWithoutHearingPage from './hearing-details/determination-without-hearing/determination-without-hearing-page';
import ExpertPage from './hearing-details/expert/expert-page';
import HearingDatesPage from './hearing-details/hearing-dates/hearing-dates-page';
import HearingLocationPage from './hearing-details/hearing-location/hearing-location-page';
import SelfWitnessPage from './hearing-details/self-witness/self-witness-page';
import SupportRequiredPage from './hearing-details/support-required/support-required-page';
import VulnerabilityQuestionsPage from './hearing-details/vulnerability-questions/vulnerability-questions-page';
import WitnessesPage from './hearing-details/witnesses/witnesses-page';
import ResponseDashboardPage from './response-dashboard/response-dashboard-page';

export default class ResponseFactory extends BasePageFactory {
  get responseDashboardPage() {
    return new ResponseDashboardPage(this.page);
  }

  get freeTelephoneMediationPage() {
    return new FreeTelephoneMediationPage(this.page);
  }

  get mediationPhoneNumberPage() {
    return new MediationPhoneNumberPage(this.page);
  }

  get confirmYourNumberPage() {
    return new ConfirmYourNumberPage(this.page);
  }

  get determinationWithoutHearingPage() {
    return new DeterminationWithoutHearingPage(this.page);
  }

  get supportRequiredPage() {
    return new SupportRequiredPage(this.page);
  }

  get hearingLocationPage() {
    return new HearingLocationPage(this.page);
  }

  get expertPage() {
    return new ExpertPage(this.page);
  }

  get selfWitnessPage() {
    return new SelfWitnessPage(this.page);
  }

  get witnessesPage() {
    return new WitnessesPage(this.page);
  }

  get vulnerabilityQuestionsPage() {
    return new VulnerabilityQuestionsPage(this.page);
  }

  get hearingDatePage() {
    return new HearingDatesPage(this.page);
  }
}
