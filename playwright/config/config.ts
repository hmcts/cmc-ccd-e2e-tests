import 'dotenv/config';

export const config = {
  idamStudEnabled: process.env.IDAM_STUB_ENABLED === 'true',
  skipAuthSetup: process.env.SKIP_AUTH_SETUP === 'true',
  skipCitizenSetup: process.env.SKIP_CITIZEN_SETUP === 'true',
  showBrowserWindow: process.env.SHOW_BROWSER_WINDOW === 'true',
  runAccessibilityTests: process.env.RUN_ACCESSIBILITY_TESTS ==='true',
};

