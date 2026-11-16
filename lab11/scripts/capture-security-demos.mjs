import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '../screenshots');
mkdirSync(outDir, { recursive: true });

const BASE = process.env.API_BASE || 'http://127.0.0.1:5011';

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1000, height: 900 } });
  const page = await context.newPage();

  let beforeDialog = false;
  let afterDialog = false;

  // --- BEFORE ---
  page.on('dialog', async (dialog) => {
    beforeDialog = true;
    await dialog.accept();
  });

  await page.goto(`${BASE}/demos/xss-before.html`, { waitUntil: 'domcontentloaded' });
  await page.click('button[type="submit"]');
  await page.waitForSelector('#xss-flag[data-fired="1"]', { timeout: 10000 });
  await page.waitForTimeout(300);
  await page.screenshot({ path: join(outDir, '01-xss-before.png'), fullPage: true });

  // --- AFTER ---
  page.removeAllListeners('dialog');
  page.on('dialog', async (dialog) => {
    afterDialog = true;
    await dialog.dismiss();
  });

  await page.goto(`${BASE}/demos/xss-after.html`, { waitUntil: 'domcontentloaded' });
  await page.click('button[type="submit"]');
  await page.waitForSelector('#status', { timeout: 10000 });
  await page.waitForTimeout(400);
  await page.screenshot({ path: join(outDir, '02-xss-after.png'), fullPage: true });

  // --- Headers ---
  const response = await page.goto(`${BASE}/api/reviews`, { waitUntil: 'domcontentloaded' });
  const headers = response.headers();
  const interesting = [
    'content-security-policy',
    'x-content-type-options',
    'x-frame-options',
    'referrer-policy',
    'strict-transport-security',
    'cross-origin-opener-policy',
  ];

  await page.setContent(`<!doctype html><html><head><meta charset="utf-8"></head>
  <body style="font-family:ui-monospace,Menlo,monospace;background:#0b1220;color:#e2e8f0;padding:28px">
    <h1 style="color:#86efac;font-family:system-ui">HTTP security headers (Helmet.js)</h1>
    <pre style="white-space:pre-wrap;line-height:1.55;font-size:13px">${interesting
      .map((key) => `${key}:\n  ${headers[key] || '(missing)'}`)
      .join('\n\n')}</pre>
  </body></html>`);
  await page.screenshot({ path: join(outDir, '03-helmet-headers.png'), fullPage: true });

  writeFileSync(
    join(outDir, 'headers.json'),
    JSON.stringify(
      {
        beforeDialogAccepted: beforeDialog,
        afterDialogFired: afterDialog,
        headers: Object.fromEntries(interesting.map((k) => [k, headers[k] || null])),
      },
      null,
      2,
    ),
  );

  await browser.close();
  console.log('Screenshots saved to', outDir);
  console.log({ beforeDialog, afterDialog });
  if (!beforeDialog) {
    console.warn('Warning: native alert may not have fired, but XSS flag was shown');
  }
  if (afterDialog) {
    console.error('Secure path still triggered a dialog');
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
