import { chromium } from '/Users/prabhas/dev/magicuidesign-portfolio-5ef12e4/node_modules/playwright/index.mjs';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
await page.goto('file:///Users/prabhas/24dev/ads/creatives/carousels.html');
await page.waitForTimeout(2500); // let Inter load

const slides = await page.locator('.slide').all();
for (const slide of slides) {
  const name = await slide.getAttribute('data-name');
  await slide.screenshot({ path: `/Users/prabhas/24dev/ads/creatives/${name}.png` });
  console.log(`rendered ${name}.png`);
}
await browser.close();
