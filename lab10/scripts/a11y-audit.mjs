import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { createServer } from 'node:http';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'screenshots');
mkdirSync(outDir, { recursive: true });

function startStaticServer(filePath, port) {
  const html = readFileSync(filePath);
  const server = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  });
  return new Promise((resolve) => {
    server.listen(port, '127.0.0.1', () => resolve(server));
  });
}

async function auditPage(page, label) {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();

  const summary = {
    label,
    url: page.url(),
    violations: results.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      description: v.description,
      nodes: v.nodes.length,
    })),
    counts: {
      violations: results.violations.length,
      passes: results.passes.length,
      incomplete: results.incomplete.length,
    },
  };

  return summary;
}

function renderReportPng(summary, fileName, title) {
  // lightweight PNG via raw canvas-less text file + note; actual PNG made in python after
  writeFileSync(join(outDir, fileName.replace('.png', '.json')), JSON.stringify(summary, null, 2));
  writeFileSync(
    join(outDir, fileName.replace('.png', '.txt')),
    [
      title,
      `URL: ${summary.url}`,
      `Violations: ${summary.counts.violations}`,
      `Passes: ${summary.counts.passes}`,
      '',
      ...summary.violations.map(
        (v, i) => `${i + 1}. [${v.impact}] ${v.id} — ${v.description} (nodes: ${v.nodes})`,
      ),
      summary.violations.length === 0 ? 'Критических нарушений по выбранным правилам не найдено.' : '',
    ].join('\n'),
  );
}

async function main() {
  const beforeServer = await startStaticServer(join(root, 'a11y/before.html'), 5191);
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // BEFORE
  await page.goto('http://127.0.0.1:5191/', { waitUntil: 'domcontentloaded' });
  await page.locator('#open').click();
  await page.locator('#modal.is-open').waitFor();
  const before = await auditPage(page, 'before');
  renderReportPng(before, '01-axe-before.png', 'Axe DevTools / axe-core — ДО исправлений');

  // AFTER — preview app (must be running)
  const afterUrl = process.env.A11Y_AFTER_URL || 'http://127.0.0.1:5180/';
  try {
    await page.route('**/api/products**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            _id: 'ui-kit-pro',
            name: 'UI Kit Pro',
            price: 89,
            imageUrl: '',
            description: 'Design system pack',
            category: 'UI KIT',
          },
        ]),
      });
    });
    await page.goto(afterUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.getByTestId('catalog').waitFor({ timeout: 10000 });
    await page.getByTestId('quick-view-ui-kit-pro').click();
    await page.getByTestId('quick-view-dialog').waitFor();
    const after = await auditPage(page, 'after');
    renderReportPng(after, '02-axe-after.png', 'Axe DevTools / axe-core — ПОСЛЕ исправлений');
  } catch (error) {
    console.warn('After-audit skipped (start preview on :5180):', error.message);
    writeFileSync(
      join(outDir, '02-axe-after.txt'),
      'Axe after: app not running. Run `npm run preview` then `npm run a11y:audit`.',
    );
  }

  await browser.close();
  beforeServer.close();
  console.log('A11y audit written to screenshots/');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
