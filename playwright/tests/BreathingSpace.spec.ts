import { test } from '../playwright-fixtures/index';

test.describe('Breathing Space', () => {
  test('Claimant enters breathing space and caseworker lifts breathing space', async ({ IdamSteps, CreateClaimSteps, OcmcDashboardSteps, ApiCaseDataSteps, ClaimantResponseSteps, ExuiDashboardSteps }) => {
    await IdamSteps.ClaimantLogin();
    await CreateClaimSteps.CreateDraftClaim();
    await CreateClaimSteps.ChangeDraftClaimDefAsOrg();
    await CreateClaimSteps.CheckAndSubmit();
    await CreateClaimSteps.GetClaimReference();
    await ApiCaseDataSteps.FetchClaimStoreCaseData();
    await ApiCaseDataSteps.FetchCCDCaseData();
    await OcmcDashboardSteps.GoToClaimantClaimDetails();
    await ClaimantResponseSteps.EnterBreathingSpace();
    await IdamSteps.CaseworkerLogin();
    await ExuiDashboardSteps.GoToCaseDetails();
    // await CaseworkerEventsSteps.VerifyBreathingSpace();
    // await CaseworkerEventsSteps.LiftBreathingSpace();
  });

  test('Caseworker enters breathing space and lifts breathing space', { tag: '@debug' }, async ({ IdamSteps, CreateClaimSteps, ApiCaseDataSteps, ExuiDashboardSteps, CaseworkerEventsSteps }) => {
    await IdamSteps.ClaimantLogin();
    await CreateClaimSteps.CreateDraftClaim();
    await CreateClaimSteps.ChangeDraftClaimDefAsOrg();
    await CreateClaimSteps.CheckAndSubmit();
    await CreateClaimSteps.GetClaimReference();
    await ApiCaseDataSteps.FetchClaimStoreCaseData();
    await ApiCaseDataSteps.FetchCCDCaseData();
    await IdamSteps.CaseworkerLogin();
    await ExuiDashboardSteps.GoToCaseDetailsAndWait();
    await CaseworkerEventsSteps.EnterBreathingSpace();
    await CaseworkerEventsSteps.LiftBreathingSpace();
  });

  test('Caseworker unable to enter breathing space when case is handed to CCBC', async ({ IdamSteps, CreateClaimSteps, ApiCaseDataSteps, ExuiDashboardSteps, CaseworkerEventsSteps }) => {
    await IdamSteps.ClaimantLogin();
    await CreateClaimSteps.CreateDraftClaim();
    await CreateClaimSteps.ChangeDraftClaimDefAsOrg();
    await CreateClaimSteps.CheckAndSubmit();
    await CreateClaimSteps.GetClaimReference();
    await ApiCaseDataSteps.FetchClaimStoreCaseData();
    await ApiCaseDataSteps.FetchCCDCaseData();
    await IdamSteps.CaseworkerLogin();
    await ExuiDashboardSteps.GoToCaseDetailsAndWait();
    await CaseworkerEventsSteps.CaseHandedToCCBC();
    await CaseworkerEventsSteps.EnterBreathingSpaceError();
  });
});
