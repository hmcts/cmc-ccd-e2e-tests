module.exports = {
    TestEndToEndUrl: process.env.TEST_E2E_URL || 'https://www-ccd.aat.platform.hmcts.net/',
    TestShowBrowserWindow: process.env.SHOW_BROWSER_WINDOW || false,
    TestRetryFeatures: process.env.RETRY_FEATURES || 0,
    TestRetryScenarios: process.env.RETRY_SCENARIOS || 2,
    TestPathToRun: process.env.E2E_TEST_PATH || './paths/**/*.js',
    TestOutputDir: process.env.E2E_OUTPUT_DIR || './functional-output',
    TestTimeToWaitForText: parseInt(process.env.BO_E2E_TEST_TIME_TO_WAIT_FOR_TEXT || 60),
    TestAutoDelayEnabled: process.env.E2E_AUTO_DELAY_ENABLED === 'true',
    TestEnvCWUser: process.env.CW_USER_EMAIL,
    TestEnvCWPassword: process.env.CW_USER_PASSWORD,
    TestEnvLAUser: process.env.LA_USER_EMAIL,
    TestEnvLAPassword: process.env.LA_USER_PASSWORD,
    TestEnvJudgeUser: process.env.JUDGE_USER_EMAIL,
    TestEnvJudgePassword: process.env.JUDGE_USER_PASSWORD,
    TestForAccessibility: process.env.TESTS_FOR_ACCESSIBILITY === 'true',
    TestForCrossBrowser: process.env.TESTS_FOR_CROSS_BROWSER === 'true'
};
