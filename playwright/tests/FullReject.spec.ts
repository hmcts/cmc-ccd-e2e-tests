import { test } from '../playwright-fixtures/index';

test.describe('Full reject', async () => {
  test('Claimant creates claim, then defendant rejects and caseworker verifies defendant reject event', {tag: '@debug'},  async ({IdamSteps, CreateClaimSteps, ApiSteps, DefendantResponseSteps, ExuiDashboardSteps}) => {
    await IdamSteps.ClaimantLogin();
    await CreateClaimSteps.CreateDraftClaim();
    await CreateClaimSteps.CheckAndSubmit();
    await CreateClaimSteps.GetClaimReference();
    await ApiSteps.FetchClaimStoreCaseDataWithLetterId();
    await ApiSteps.FetchClaimSecurityPin();
    await DefendantResponseSteps.LinkClaim();
    await DefendantResponseSteps.GoToResponseDashboard();
    await DefendantResponseSteps.ConfirmYourDetails();
    await DefendantResponseSteps.DecideIfYouNeedMoreTime();
    await DefendantResponseSteps.ChooseResponse();
    await DefendantResponseSteps.WhyYouDisagree();
    await DefendantResponseSteps.FreeMediation();
    await DefendantResponseSteps.HearingDetails();
    await DefendantResponseSteps.CheckAndSubmit();
    await IdamSteps.JudgeLogin();
    await ApiSteps.FetchCCDCaseData();
    await ExuiDashboardSteps.VerifyDefendantFullReject();
  });
});
