module.exports = {
    TestEndToEndUrl: process.env.EXUI_URL,
    TestFrontEndUrl: process.env.CITIZEN_APP_URL,
    TestShowBrowserWindow: process.env.SHOW_BROWSER_WINDOW || false,
    TestRetryFeatures: process.env.RETRY_FEATURES || 0,
    TestRetryScenarios: process.env.RETRY_SCENARIOS || 2,
    TestPathToRun: process.env.E2E_TEST_PATH || './paths/*.js',
    TestOutputDir: process.env.E2E_OUTPUT_DIR || './functional-output',
    TestTimeToWaitForText: parseInt(process.env.E2E_TEST_TIME_TO_WAIT_FOR_TEXT || 120),
    TestAutoDelayEnabled: process.env.E2E_AUTO_DELAY_ENABLED === 'true',
    TestForAccessibility: process.env.TESTS_FOR_ACCESSIBILITY === 'true',
    TestForCrossBrowser: process.env.TESTS_FOR_CROSS_BROWSER === 'true',
    LegalAdvisorUser: {
        password: process.env.LA_USER_PASSWORD,
        email: process.env.LA_USER_EMAIL
    },
    CaseWorkerUser: {
        password: process.env.CW_USER_PASSWORD,
        email: process.env.CW_USER_EMAIL
    },
    JudgeUser: {
        password: process.env.JUDGE_USER_PASSWORD,
        email: process.env.JUDGE_USER_EMAIL
    },
    citizenUser: {
        password: process.env.USER_PASSWORD,
        email: process.env.USER_EMAIL,
    },
    url: {
        authProviderApi: process.env.SERVICE_AUTH_PROVIDER_API_BASE_URL,
        ccdDataStore: process.env.CCD_DATA_STORE_URL,
        dmStore: process.env.DM_STORE_URL,
        idamApi: process.env.IDAM_API_URL,
        claimStore: process.env.CLAIM_STORE_URL
    },
    definition: {
        jurisdiction: 'CMC',
        caseType: 'MoneyClaimCase'
    },
    s2s: {
        microservice: process.env.S2S_MICROSERVICE_KEY_CMC,
        secret: process.env.S2S_MICROSERVICE_KEY_PWD,
    },
    featureToggles: {
        enabled: process.env.LD_ENABLED || true,
        launchDarklyKey: process.env.LAUNCHDARKLY_KEY,
        flags: {
            oconenhancements: 'ocon-enhancements',
            enhancedMediation: 'enhanced-mediation-journey',
            breathingSpace: 'breathing-space'
        }
    },
    env: process.env.TEST_ENV || 'local',
    runFullSuite: process.env.RUN_FULL_REGRESSION_SUITE || 'NO',
    proxy: ''
};
