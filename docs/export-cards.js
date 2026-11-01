// Renders every .card in ad-creatives-preview.html to a 1080x1080 PNG via headless Chrome.
// SAFE-ZONE build: artwork is scaled into the centre ~80% of the frame so Meta's 4:5 feed
// cover-crop (~108px / 10% off each side) only ever bites the dark background, never text/logo.
// The full-bleed background + green glow still reach every edge. Output → ad-export/.
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DOCS = '/Users/prabhas/24dev/docs';
const SRC = path.join(DOCS, 'ad-creatives-preview.html');
const OUT = path.join(DOCS, 'ad-export');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const SCALE = 1080 / 380;
const SAFE = 0.80; // artwork occupies centre 80% → ~108px dead-safe border each side

const html = fs.readFileSync(SRC, 'utf8');
const style = html.match(/<style>([\s\S]*?)<\/style>/)[1];
const fontLink = (html.match(/<link href="https:\/\/fonts[^>]*>/g) || []).join('\n');

// depth-parse every <div class="card"> ... </div>
function extractCards(s) {
  const cards = [];
  const open = '<div class="card"';
  let i = 0;
  while ((i = s.indexOf(open, i)) !== -1) {
    let depth = 0, j = i;
    while (j < s.length) {
      if (s.startsWith('<div', j)) { depth++; j += 4; }
      else if (s.startsWith('</div>', j)) { depth--; j += 6; if (depth === 0) break; }
      else j++;
    }
    cards.push(s.slice(i, j));
    i = j;
  }
  return cards;
}

let cards = extractCards(html);
console.log('Found ' + cards.length + ' cards');

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

// absolute image paths so export files resolve correctly
const fix = (c) => c.replace(/src="ad-assets\/([^"]+)"/g, 'src="file://' + DOCS + '/ad-assets/$1"');

const names = [];
const counts = [10, 10, 10]; // Ad 1, Ad 2, Ad 3 = 10 cards each
for (let a = 0; a < counts.length; a++) for (let c = 1; c <= counts[a]; c++) names.push(`ad${a + 1}-card${c}`);

cards.forEach((card, idx) => {
  const name = names[idx] || ('card' + (idx + 1));
  const page = `<!DOCTYPE html><html><head><meta charset="UTF-8">${fontLink}<style>${style}
    html,body{margin:0;padding:0;width:1080px;height:1080px;overflow:hidden;background:#0B0B0C;
      /* full-bleed texture + corner glow so the safe border is NOT a flat dead frame */
      background-image:
        radial-gradient(rgba(255,255,255,.022) 1px, transparent 1px),
        radial-gradient(115% 85% at 100% 0%, rgba(15,255,0,.10), transparent 56%);
      background-size:36px 36px, 100% 100%; background-position:center, center;}
    .stage{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
    .scaler{transform:scale(${SCALE * SAFE});transform-origin:center center;width:380px;height:380px}
    /* card itself goes transparent so the body texture/glow show through uniformly */
    .card{border-radius:0 !important;box-shadow:none !important;border:none !important;background:transparent !important}
    .card > .glow, .card > .tex{display:none !important}
    .card .swipe::after{animation:none !important}.card .wm .dot{animation:none !important}
  </style></head><body><div class="stage"><div class="scaler">${fix(card)}</div></div></body></html>`;
  const htmlPath = path.join(OUT, name + '.html');
  const pngPath = path.join(OUT, name + '.png');
  fs.writeFileSync(htmlPath, page);
  execSync(`"${CHROME}" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --window-size=1080,1080 --virtual-time-budget=3500 --screenshot="${pngPath}" "file://${htmlPath}" 2>/dev/null`);
  console.log('✓ ' + name + '.png');
});

// cleanup temp html
fs.readdirSync(OUT).filter(f => f.endsWith('.html')).forEach(f => fs.unlinkSync(path.join(OUT, f)));
console.log('\nDone → ' + OUT);
