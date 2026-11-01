// Renders every .creative in client-creatives.html to a PNG at its own data-w x data-h size.
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DOCS = '/Users/prabhas/24dev/docs';
const SRC = path.join(DOCS, 'client-creatives.html');
const OUT = path.join(DOCS, 'client-export');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const html = fs.readFileSync(SRC, 'utf8');
const style = html.match(/<style>([\s\S]*?)<\/style>/)[1];
const fontLink = (html.match(/<link href="https:\/\/fonts[^>]*>/g) || []).join('\n');

function extract(s) {
  const out = [];
  const open = '<div class="creative"';
  let i = 0;
  while ((i = s.indexOf(open, i)) !== -1) {
    let depth = 0, j = i;
    while (j < s.length) {
      if (s.startsWith('<div', j)) { depth++; j += 4; }
      else if (s.startsWith('</div>', j)) { depth--; j += 6; if (depth === 0) break; }
      else j++;
    }
    out.push(s.slice(i, j));
    i = j;
  }
  return out;
}

const cards = extract(html);
console.log('Found ' + cards.length + ' creatives');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

cards.forEach((card) => {
  const name = (card.match(/data-name="([^"]+)"/) || [])[1] || 'creative';
  const w = (card.match(/data-w="([^"]+)"/) || [])[1] || '1080';
  const h = (card.match(/data-h="([^"]+)"/) || [])[1] || '1350';
  const page = `<!DOCTYPE html><html><head><meta charset="UTF-8">${fontLink}<style>${style}
    html,body{margin:0;padding:0;width:${w}px;height:${h}px;overflow:hidden;background:#0B0B0C;display:block}
    .creative{box-shadow:none !important}
    .creative .wm .dot{animation:none !important}
  </style></head><body>${card}</body></html>`;
  const htmlPath = path.join(OUT, name + '.html');
  const pngPath = path.join(OUT, name + '.png');
  fs.writeFileSync(htmlPath, page);
  execSync(`"${CHROME}" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --window-size=${w},${h} --virtual-time-budget=3500 --screenshot="${pngPath}" "file://${htmlPath}" 2>/dev/null`);
  console.log('✓ ' + name + '.png (' + w + 'x' + h + ')');
});

fs.readdirSync(OUT).filter(f => f.endsWith('.html')).forEach(f => fs.unlinkSync(path.join(OUT, f)));
console.log('\nDone → ' + OUT);
