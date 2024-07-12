import { test } from '../playwright-fixtures/index';

test.describe('Breathing Space', () => {
  test('Claimant enters breathing space and caseworker lifts breathing space', async ({IdamSteps, CreateClaimSteps, ApiCaseDataSteps, CitizenDashboardSteps, ClaimantResponseSteps, ExuiDashboardSteps, CaseworkerEventsSteps}) => {
    await IdamSteps.ClaimantLogin();
    await CreateClaimSteps.CreateDraftClaim();
    await CreateClaimSteps.ChangeDraftClaimDefAsOrg();
    await CreateClaimSteps.CheckAndSubmit();
    await CreateClaimSteps.GetClaimReference();
    await ApiCaseDataSteps.FetchClaimStoreCaseData();
    await ApiCaseDataSteps.FetchCCDCaseData();
    await CitizenDashboardSteps.GoToClaimantClaimDetails();
    await ClaimantResponseSteps.EnterBreathingSpace();
    await IdamSteps.JudgeLogin();
    await ExuiDashboardSteps.GoToCaseDetails();
    await CaseworkerEventsSteps.VerifyBreathingSpace();
    // await CaseworkerEventsSteps.LiftBreathingSpace();
  });

  test('Caseworker enters breathing space and lifts breathing space', async ({IdamSteps, CreateClaimSteps, ApiCaseDataSteps, ExuiDashboardSteps, CaseworkerEventsSteps}) => {
    await IdamSteps.ClaimantLogin();
    await CreateClaimSteps.CreateDraftClaim();
    await CreateClaimSteps.ChangeDraftClaimDefAsOrg();
    await CreateClaimSteps.CheckAndSubmit();
    await CreateClaimSteps.GetClaimReference();
    await ApiCaseDataSteps.FetchClaimStoreCaseData();
    await ApiCaseDataSteps.FetchCCDCaseData();
    await IdamSteps.JudgeLogin();
    await ExuiDashboardSteps.GoToCaseDetails();
    await CaseworkerEventsSteps.EnterBreathingSpace();
    await CaseworkerEventsSteps.LiftBreathingSpace();
  });

  test('Caseworker cannot enter breathing space when case handed to CCBC', async ({IdamSteps, CreateClaimSteps, ApiCaseDataSteps, ExuiDashboardSteps, CaseworkerEventsSteps}) => {
    await IdamSteps.ClaimantLogin();
    await CreateClaimSteps.CreateDraftClaim();
    await CreateClaimSteps.ChangeDraftClaimDefAsOrg();
    await CreateClaimSteps.CheckAndSubmit();
    await CreateClaimSteps.GetClaimReference();
    await ApiCaseDataSteps.FetchClaimStoreCaseData();
    await ApiCaseDataSteps.FetchCCDCaseData();
    await IdamSteps.JudgeLogin();
    await ExuiDashboardSteps.GoToCaseDetails();
    await CaseworkerEventsSteps.CaseHandedToCCBC();
    await CaseworkerEventsSteps.EnterBreathingSpaceError();
  });
});