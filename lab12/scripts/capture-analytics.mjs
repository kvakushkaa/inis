import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '../screenshots');
mkdirSync(outDir, { recursive: true });

const CLIENT = process.env.CLIENT_URL || 'http://127.0.0.1:51712';
const API = process.env.API_URL || 'http://127.0.0.1:5012';

async function main() {
  const summaryRes = await fetch(`${API}/api/analytics/summary`);
  const summary = await summaryRes.json();
  writeFileSync(join(outDir, 'analytics-summary.json'), JSON.stringify(summary, null, 2));

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${CLIENT}/analytics`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.getByTestId('analytics-chart').waitFor({ timeout: 60000 });
  await page.waitForSelector('.js-plotly-plot', { timeout: 60000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: join(outDir, '01-analytics-page.png'), fullPage: true });
  await browser.close();
  console.log('Saved screenshots and analytics-summary.json');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
