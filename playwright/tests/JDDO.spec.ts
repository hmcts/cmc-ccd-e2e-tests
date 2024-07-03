import { test } from '../playwright-fixtures/index';

test.describe('Judge Draw Direction Order (JDDO - claim amount > 500)', () => {
  test('Full Defence → Dispute All → Reject mediation by Defendant → Decide to proceed is Yes (claimant)', {tag: '@debug'}, async ({ApiCaseEventsSteps, IdamSteps, ExuiDashboardSteps, JudgeEventsSteps}) => {
    await ApiCaseEventsSteps.CreateDisputeAllBothRejectMediationClaim();
    await ApiCaseEventsSteps.ClaimantRejects();
    await ApiCaseEventsSteps.AssignForJudgeDirections();
    await IdamSteps.JudgeLogin();
    await ExuiDashboardSteps.GoToCaseDetails();
    await JudgeEventsSteps.DrawDirectionsOrder();
  });
});