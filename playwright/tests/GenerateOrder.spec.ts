import { test } from '../playwright-fixtures/index';

test.describe('LA Draws Direction Order (Generate Order flow - claim amount < 500)', () => {
  test('Full Defence → Dispute All → Reject mediation by Defendant → Decide to proceed is Yes (claimant)', async ({ ApiCaseEventsSteps, IdamSteps, ExuiDashboardSteps, JudgeEventsSteps, LegalAdvisorEventsSteps }) => {
    await ApiCaseEventsSteps.CreateGenerateOrderDisputeAllRejectMediationClaim();
    await ApiCaseEventsSteps.ClaimantRejects();
    await ApiCaseEventsSteps.AssignForDirections();
    await IdamSteps.JudgeLogin();
    await ExuiDashboardSteps.GoToCaseDetails();
    await JudgeEventsSteps.ProvideDirections();
    await IdamSteps.LegalAdvisorLogin();
    await ExuiDashboardSteps.GoToCaseDetails();
    await LegalAdvisorEventsSteps.GenerateOrder();
    await IdamSteps.JudgeLogin();
    await ExuiDashboardSteps.GoToCaseDetails();
    await JudgeEventsSteps.ReviewOrder();
    await IdamSteps.LegalAdvisorLogin();
    await ExuiDashboardSteps.GoToCaseDetails();
    await LegalAdvisorEventsSteps.ActionReviewComments();
    await IdamSteps.JudgeLogin();
    await ExuiDashboardSteps.GoToCaseDetails();
    await JudgeEventsSteps.ApproveDirectionsOrder();
    await IdamSteps.LegalAdvisorLogin();
    await ExuiDashboardSteps.GoToCaseDetails();
    await LegalAdvisorEventsSteps.DrawDirectionsOrder();
  });
});
