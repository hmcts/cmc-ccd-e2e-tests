import 'dotenv/config';

export const config = {
  idamStudEnabled: process.env.IDAM_STUB_ENABLED === 'true',
  skipAuthSetup: process.env.SKIP_AUTH_SETUP === 'true',
  skipCitizenSetup: process.env.SKIP_CITIZEN_SETUP === 'true',
  showBrowserWindow: process.env.SHOW_BROWSER_WINDOW === 'true',
  runAccessibilityTests: process.env.RUN_ACCESSIBILITY_TESTS ==='true',
  definition: {
    jurisdiction: 'CMC',
    caseType: 'MoneyClaimCase',
  },
  s2s: {
    microservice: process.env.S2S_MICROSERVICE_KEY_CMC,
    secret: process.env.S2S_MICROSERVICE_KEY_PWD,
  },
};

