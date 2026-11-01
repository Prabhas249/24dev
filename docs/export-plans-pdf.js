// Renders client-plans.html to sendable PDFs via headless Chrome --print-to-pdf.
//  • 24dev-plans.pdf            → the full deck (all pages)
//  • <data-name>.pdf            → one single-page PDF per PLAN tier (self-contained, send to one lead)
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DOCS = '/Users/prabhas/24dev/docs';
const SRC = path.join(DOCS, 'client-plans.html');
const OUT = path.join(DOCS, 'client-export');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const html = fs.readFileSync(SRC, 'utf8');
const head = html.slice(0, html.indexOf('</head>') + 7); // keep fonts + <style>
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const pdf = (htmlPath, pdfPath) =>
  execSync(`"${CHROME}" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=5000 --print-to-pdf="${pdfPath}" "file://${htmlPath}" 2>/dev/null`);

// ---- 1. full deck ----
const fullPdf = path.join(OUT, '24dev-plans.pdf');
pdf(SRC, fullPdf);
console.log('✓ 24dev-plans.pdf (full deck)');

// ---- 2. one PDF per <div class="page plan" data-name="..."> ----
function extractPlanPages(s) {
  const out = [];
  const open = '<div class="page plan"';
  let i = 0;
  while ((i = s.indexOf(open, i)) !== -1) {
    let depth = 0, j = i;
    while (j < s.length) {
      if (s.startsWith('<div', j)) { depth++; j += 4; }
      else if (s.startsWith('</div>', j)) { depth--; j += 6; if (depth === 0) break; }
      else j++;
    }
    const block = s.slice(i, j);
    const name = (block.match(/data-name="([^"]+)"/) || [])[1] || ('plan' + out.length);
    out.push({ name, block });
    i = j;
  }
  return out;
}

const plans = extractPlanPages(html);
plans.forEach(({ name, block }) => {
  const page = `${head}<body>${block}</body></html>`;
  const htmlPath = path.join(OUT, name + '.html');
  const pdfPath = path.join(OUT, name + '.pdf');
  fs.writeFileSync(htmlPath, page);
  pdf(htmlPath, pdfPath);
  fs.unlinkSync(htmlPath);
  console.log('✓ ' + name + '.pdf');
});

console.log('\nDone → ' + OUT + '  (' + (plans.length + 1) + ' PDFs)');
