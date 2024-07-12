import BasePageFactory from '../../../../base/base-page-factory';
import CheckYourAnswersPage from './check-and-submit/check-your-answers/check-your-answers-page';
import ConfirmationPage from './check-and-submit/confirmation/confirmation-page';
import EligibilityAndDiversityPage from './check-and-submit/eligibility-and-diversity/eligibility-and-diversity-page';
import HowDoYouRespondToClaimPage from './choose-a-response/how-do-you-respond-to-the-claim/how-do-you-respond-to-the-claim-page';
import WhyYouDontOweMoneyPage from './choose-a-response/why-you-dont-owe-money/why-you-dont-owe-money-page';
import ConfirmYourDetailsPage from './confirm-your-details/confirm-your-details/confirm-your-details-page';
import DateOfBirthPage from './confirm-your-details/date-of-birth/date-of-birth-page';
import PhoneNumberPage from './confirm-your-details/phone-number/phone-number-page';
import ExtraTimeToRespondPage from './decide-if-you-need-more-time/extra-time-to-respond/extra-time-to-respond-page';
import MoreTimePage from './decide-if-you-need-more-time/more-time-to-respond/more-time-page';
import DefendantResponseDashboardPage from './defendant-response-dashboard/defendant-response-dashboard-page';
import EvidencePage from './why-you-disagree/evidence/evidence-page';
import TimelinePage from './why-you-disagree/timeline/timeline-page';
import YourDefencePage from './why-you-disagree/your-defence/your-defence-page';

export default class DefendantResponseFactory extends BasePageFactory {

  get defendantResponseDashboardPage() {
    return new DefendantResponseDashboardPage(this.page, this.axeBuilder);
  }

  get confirmYourDetailsPage() {
    return new ConfirmYourDetailsPage(this.page, this.axeBuilder);
  }

  get dateOfBirthPage() {
    return new DateOfBirthPage(this.page, this.axeBuilder);
  }

  get phoneNumberPage() {
    return new PhoneNumberPage(this.page, this.axeBuilder);
  }

  get moreTimePage() {
    return new MoreTimePage(this.page, this.axeBuilder);
  }

  get extraTimeToRespondPage() {
    return new ExtraTimeToRespondPage(this.page, this.axeBuilder);
  }

  get howDoYouWantToRespondToClaimPage() {
    return new HowDoYouRespondToClaimPage(this.page, this.axeBuilder);
  }

  get whyYouDontOweMoneyPage() {
    return new WhyYouDontOweMoneyPage(this.page, this.axeBuilder);
  }

  get yourDefencePage() {
    return new YourDefencePage(this.page, this.axeBuilder);
  }

  get timelinePage() {
    return new TimelinePage(this.page, this.axeBuilder);
  }

  get evidencePage() {
    return new EvidencePage(this.page, this.axeBuilder);
  }

  get eligibilityAndDiversityPage() {
    return new EligibilityAndDiversityPage(this.page, this.axeBuilder);
  }

  get checkYourAnswersPage() {
    return new CheckYourAnswersPage(this.page, this.axeBuilder);
  }

  get confirmationPage() {
    return new ConfirmationPage(this.page, this.axeBuilder);
  }
}