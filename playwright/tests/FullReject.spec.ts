import { test } from '../playwright-fixtures/index';

test.describe('Full reject', async () => {
  test('Claimant creates claim, then defendant rejects and caseworker verifies defendant reject event', async ({ IdamSteps, CreateClaimSteps, ApiCaseDataSteps, OcmcDashboardSteps, DefendantResponseSteps, ExuiDashboardSteps }) => {
    await IdamSteps.ClaimantLogin();
    await CreateClaimSteps.CreateDraftClaim();
    await CreateClaimSteps.CheckAndSubmit();
    await CreateClaimSteps.GetClaimReference();
    await ApiCaseDataSteps.FetchClaimStoreCaseDataWithLetterId();
    await ApiCaseDataSteps.FetchClaimSecurityPin();
    await DefendantResponseSteps.CuiLinkClaim();
    await OcmcDashboardSteps.GoToDefendantClaimDetails();
    await DefendantResponseSteps.GoToResponseDashboard();
    await DefendantResponseSteps.ConfirmYourDetails();
    await DefendantResponseSteps.DecideIfYouNeedMoreTime();
    await DefendantResponseSteps.ChooseResponse();
    await DefendantResponseSteps.WhyYouDisagree();
    await DefendantResponseSteps.FreeMediation();
    await DefendantResponseSteps.HearingDetails();
    await DefendantResponseSteps.CheckAndSubmit();
    await IdamSteps.CaseworkerLogin();
    await ApiCaseDataSteps.FetchCCDCaseData();
    await ExuiDashboardSteps.GoToCaseDetails();
    await ExuiDashboardSteps.VerifyDefendantFullReject();
  });
});
