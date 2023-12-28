import { workspaceRoot } from '@nx/devkit';
import { nxE2EPreset } from '@nx/playwright/preset';
import { defineConfig, devices } from '@playwright/test';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

// For CI, you may want to set BASE_URL to the deployed application.
//const baseURL = process.env['BASE_URL'] || 'http://localhost:4200';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './e2e' }),
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: process.env.test_env ==='prod' ? "https://www.vrai.com/" : process.env.test_env ==='stage' ? "https://main.vrai.qa/" : process.env.test_env.startsWith('http') ? process.env.test_env :  "http://localhost:4200" ,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    video: "retain-on-failure"

  },
  reporter: [['html', { outputFolder: './e2e/output'}]],

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // It is important to define the `viewport` property after destructuring `devices`,
        // since devices also define the `viewport` for that device.
        viewport: { width: 1680, height: 900 },
      },
    },
  ],
  /* Run your local dev server before starting the tests */
  //  webServer: {
  //    command: 'pnpm run start',
  //    url: 'http://127.0.0.1:4200',
  //    reuseExistingServer: !process.env.CI,
  //    cwd: workspaceRoot,
  //  },
});
