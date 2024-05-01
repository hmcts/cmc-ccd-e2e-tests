import { claimant, defendant } from '../../config/users';
import { test } from '../../playwright-fixtures';

test('Claimant test', async ({ IdamSteps, CitizenDashboardSteps }) => {
  await IdamSteps.CitizenFrontEndLogin(claimant);
  await CitizenDashboardSteps.GoToDashboard();
});

test('Defendant test', async ({ IdamSteps, CitizenDashboardSteps }) => {
  await IdamSteps.CitizenFrontEndLogin(defendant);
  await CitizenDashboardSteps.GoToDashboard();
});
