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
  ...nxE2EPreset(__filename, { testDir: './tests' }),
  timeout: 1 * 90 * 1000,
  expect: {
    timeout: 15* 1000,
  },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: process.env.test_env ==='prod' ? "https://www.vrai.com/" : process.env.test_env ==='stage' ? "https://main.vrai.qa/" : process.env.test_env.startsWith('http') ? process.env.test_env :  "http://localhost:4200" ,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    video: "retain-on-failure"

  },
  reporter: [['html', { outputFolder: './output'}]],

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions:{
          slowMo: 1500 },
        // It is important to define the `viewport` property after destructuring `devices`,
        // since devices also define the `viewport` for that device.
        viewport: { width: 1880, height: 1000 },
      },
    },
  ],
   webServer: {
     command: 'pnpm run start',
     url: 'http://127.0.0.1:4200',
     reuseExistingServer: !process.env.CI,
     cwd: workspaceRoot,
   },
});
