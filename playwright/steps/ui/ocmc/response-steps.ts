import BaseSteps from '../../../base/base-steps';
import { AllMethodsStep } from '../../../decorators/test-steps';
import ResponseFactory from '../../../pages/ocmc/response/response/response-factory';
import TestData from '../../../models/test-data';

@AllMethodsStep()
export default abstract class ResponseSteps extends BaseSteps {
  private responseFactory: ResponseFactory;

  constructor(responseFactory: ResponseFactory, testData: TestData) {
    super(testData);
    this.responseFactory = responseFactory;
  }

  async FreeMediation() {
    const { responseDashboardPage } = this.responseFactory;
    await responseDashboardPage.freeMediation();

    const { freeTelephoneMediationPage } = this.responseFactory;
    await freeTelephoneMediationPage.verifyContent();
    await freeTelephoneMediationPage.yesMediation();

    const { confirmYourNumberPage } = this.responseFactory;
    await confirmYourNumberPage.verifyContent();
    await confirmYourNumberPage.noPhoneNumber();
  }

  async HearingDetails() {
    const { responseDashboardPage } = this.responseFactory;
    await responseDashboardPage.hearingDetails();

    const { determinationWithoutHearingPage } = this.responseFactory;
    await determinationWithoutHearingPage.verifyContent();
    await determinationWithoutHearingPage.chooseNoDeterminationWithoutHearing();

    const { supportRequiredPage } = this.responseFactory;
    await supportRequiredPage.verifyContent();
    await supportRequiredPage.chooseRequirements();

    const { hearingLocationPage } = this.responseFactory;
    await hearingLocationPage.verifyContent();
    await hearingLocationPage.yesHearingLocation();

    const { expertPage } = this.responseFactory;
    await expertPage.verifyContent();
    await expertPage.chooseNoExpert();

    const { selfWitnessPage } = this.responseFactory;
    await selfWitnessPage.verifyContent();
    await selfWitnessPage.chooseNoGiveEvidence();

    const { witnessesPage } = this.responseFactory;
    await witnessesPage.verifyContent();
    await witnessesPage.noWitnesses();

    const { vulnerabilityQuestionsPage } = this.responseFactory;
    await vulnerabilityQuestionsPage.verifyContent();
    await vulnerabilityQuestionsPage.yesVulnerability();

    const { hearingDatePage } = this.responseFactory;
    await hearingDatePage.verifyContent();
    await hearingDatePage.chooseNoHearingDates();
  }
}
