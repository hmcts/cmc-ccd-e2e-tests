import { test } from '../playwright-fixtures/index';

test.describe('Ocon9x', async () => {
  test('Paper response admission', async ({ IdamSteps, CreateClaimSteps, ApiCaseDataSteps, ExuiDashboardSteps, CaseworkerEventsSteps }) => {
    await IdamSteps.ClaimantLogin();
    await CreateClaimSteps.CreateDraftClaim();
    await CreateClaimSteps.ChangeDraftClaimDefAsOrg();
    await CreateClaimSteps.CheckAndSubmit();
    await CreateClaimSteps.GetClaimReference();
    await ApiCaseDataSteps.FetchClaimStoreCaseDataWithLetterId();
    await ApiCaseDataSteps.FetchCCDCaseData();
    await IdamSteps.CaseworkerLogin();
    await ExuiDashboardSteps.GoToCaseDetails();
    await CaseworkerEventsSteps.IssuePaperDefenceForms();
    await CaseworkerEventsSteps.PaperResponseReviewed();
    await CaseworkerEventsSteps.ReviewOcon9xPaperResponse();
    await CaseworkerEventsSteps.PaperResponseAdmission();
  });

  test('Paper response defence', async ({ IdamSteps, CreateClaimSteps, ApiCaseDataSteps, ExuiDashboardSteps, CaseworkerEventsSteps }) => {
    await IdamSteps.ClaimantLogin();
    await CreateClaimSteps.CreateDraftClaim();
    await CreateClaimSteps.ChangeDraftClaimDefAsOrg();
    await CreateClaimSteps.CheckAndSubmit();
    await CreateClaimSteps.GetClaimReference();
    await ApiCaseDataSteps.FetchClaimStoreCaseDataWithLetterId();
    await ApiCaseDataSteps.FetchCCDCaseData();
    await IdamSteps.CaseworkerLogin();
    await ExuiDashboardSteps.GoToCaseDetails();
    await CaseworkerEventsSteps.IssuePaperDefenceForms();
    await CaseworkerEventsSteps.PaperResponseReviewed();
    await CaseworkerEventsSteps.ReviewOcon9xPaperResponse();
    await CaseworkerEventsSteps.PaperResponseDefence();
  });
});
