import BasePageFactory from '../../../../base/base-page-factory';
import DefendantResponseCheckYourAnswersPage from './check-and-submit/defendant-response-check-your-answers/defendant-response-check-your-answers-page';
import DefendantResponseConfirmationPage from './check-and-submit/defendant-response-confirmation/defendant-response-confirmation-page';
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

  get defendantResponseCheckYourAnswersPage() {
    return new DefendantResponseCheckYourAnswersPage(this.page, this.axeBuilder);
  }

  get defendantResponseConfirmationPage() {
    return new DefendantResponseConfirmationPage(this.page, this.axeBuilder);
  }
}
