import { test } from '../playwright-fixtures/index';

test.describe('LA Draws Direction Order (Generate Order flow - claim amount < 500)', () => {
  test('Full Defence → Dispute All → Reject mediation by Defendant → Decide to proceed is Yes (claimant)', async ({ApiCaseEventsSteps, IdamSteps, ExuiDashboardSteps}) => {
    await ApiCaseEventsSteps.CreateGenerateOrderDisputeAllRejectMediationClaim();
    await ApiCaseEventsSteps.ClaimantRejects();
    await ApiCaseEventsSteps.AssignForJudgeDirections();
    await IdamSteps.JudgeLogin();
    await ExuiDashboardSteps.GoToCaseDetails();
  });
});