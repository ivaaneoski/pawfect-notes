import type { Greeting, StickerType } from '../types/greeting';

const CSS_VARIABLES = `
:root {
  --color-cream: #F5F0E8;
  --color-ink: #1A1A14;
  --color-blush: #E8A5A0;
  --color-dusty-rose: #C97D7D;
  --color-lavender: #C8C0D8;
  --color-sage: #A8B89A;
  --color-soft-white: #FDFAF5;
  --color-warm-gray: #C2BAB0;
  --color-deep-taupe: #6B5E56;
  --color-charcoal-ink: #2E2820;
}
`;

const GREETING_STYLES = `
${CSS_VARIABLES}
* { box-sizing: border-box; }
body {
  margin: 0;
  background: ${'var(--color-cream)'};
  color: var(--color-ink);
  font-family: 'Space Mono', monospace;
}
.viewport {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 48px 16px;
}
.container {
  width: 100%;
  max-width: 600px;
  position: relative;
}
.card {
  position: relative;
  z-index: 1;
}
.deco-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: radial-gradient(circle at 50% 10%, rgba(255,255,255,0.4) 0%, transparent 40%);
}
.cover {
  text-align: center;
  margin-bottom: 48px;
  padding: 32px 0;
}
.cover h1 {
  font-size: clamp(2.5rem, 8vw, 4rem);
  margin: 0 0 16px;
  line-height: 1.1;
}
.recipient {
  font-family: 'Dancing Script', cursive;
  font-size: 1.75rem;
  color: var(--color-dusty-rose);
}
.images-grid {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 48px;
  position: relative;
}
.image-wrapper {
  border-radius: 2px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  border: 6px solid white;
  background-color: white;
}
.image-wrapper img {
  width: 100%;
  display: block;
}
.message {
  background-color: var(--color-soft-white);
  padding: 40px;
  border-radius: 2px;
  border: 1px solid var(--color-warm-gray);
  box-shadow: 0 4px 12px rgba(0,0,0,0.02);
  margin-bottom: 48px;
  position: relative;
  white-space: pre-wrap;
}
.message::before {
  content: '"';
  font-family: 'Space Mono', monospace;
  font-size: 6rem;
  color: var(--color-warm-gray);
  opacity: 0.3;
  position: absolute;
  top: -20px;
  left: 20px;
  line-height: 1;
}
.video-section {
  margin-bottom: 48px;
  padding: 24px;
  background: rgba(255,255,255,0.72);
  border: 1px solid var(--color-warm-gray);
}
.video-link {
  color: var(--color-dusty-rose);
  word-break: break-all;
}
.footer {
  text-align: center;
  padding: 32px 0;
  border-top: 1px dashed var(--color-warm-gray);
  color: var(--color-deep-taupe);
  font-size: 0.875rem;
}
.sticker {
  position: absolute;
  width: 48px;
  height: 48px;
  z-index: 10;
}
.sticker-top-left { top: -20px; left: -20px; transform: rotate(-15deg); }
.sticker-top-right { top: -20px; right: -20px; transform: rotate(15deg); }
.sticker-bottom-left { bottom: -20px; left: -20px; transform: rotate(10deg); }
.sticker-bottom-right { bottom: -20px; right: -20px; transform: rotate(-10deg); }
.font-serif { font-family: Georgia, 'Times New Roman', serif; }
.font-script { font-family: 'Dancing Script', cursive; }
.font-handwritten { font-family: 'Dancing Script', cursive; }
.font-minimal { font-family: 'Space Mono', monospace; }
.msg-normal { font-family: 'Space Mono', monospace; font-size: 1.125rem; line-height: 1.8; }
.msg-handwritten { font-family: 'Dancing Script', cursive; font-size: 1.5rem; line-height: 1.8; }
@media (max-width: 640px) {
  .viewport { padding: 32px 12px; }
  .message { padding: 32px 20px; }
}
`;

const cornerClasses = [
  'sticker-top-left',
  'sticker-top-right',
  'sticker-bottom-left',
  'sticker-bottom-right',
];

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const sanitizeFileName = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'pawfect-greeting';

const getYoutubeEmbedId = (youtubeUrl: string | null) => {
  if (!youtubeUrl) return '';
  const match = youtubeUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
  return match?.[1] ?? '';
};

const getStickerMarkup = (type: StickerType) => {
  const common = 'viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"';
  switch (type) {
    case 'cat-orange':
      return `<svg ${common}><rect x="3" y="2" width="2" height="2" fill="#f9a826"/><rect x="11" y="2" width="2" height="2" fill="#f9a826"/><rect x="2" y="4" width="12" height="8" fill="#f9a826"/><rect x="4" y="6" width="2" height="2" fill="#111"/><rect x="10" y="6" width="2" height="2" fill="#111"/><rect x="7" y="8" width="2" height="2" fill="#e65a7e"/><rect x="3" y="12" width="3" height="2" fill="#fff"/><rect x="10" y="12" width="3" height="2" fill="#fff"/><rect x="7" y="4" width="2" height="2" fill="#d97706"/></svg>`;
    case 'cat-white':
      return `<svg ${common}><rect x="3" y="2" width="2" height="2" fill="#fff"/><rect x="11" y="2" width="2" height="2" fill="#fff"/><rect x="2" y="4" width="12" height="8" fill="#fff"/><rect x="4" y="6" width="2" height="2" fill="#111"/><rect x="10" y="6" width="2" height="2" fill="#111"/><rect x="7" y="8" width="2" height="2" fill="#e65a7e"/><rect x="3" y="12" width="3" height="2" fill="#f3f4f6"/><rect x="10" y="12" width="3" height="2" fill="#f3f4f6"/><rect x="2" y="8" width="2" height="2" fill="#fbcfe8"/><rect x="12" y="8" width="2" height="2" fill="#fbcfe8"/></svg>`;
    case 'cat-black':
      return `<svg ${common}><rect x="3" y="2" width="2" height="2" fill="#1f2937"/><rect x="11" y="2" width="2" height="2" fill="#1f2937"/><rect x="2" y="4" width="12" height="8" fill="#1f2937"/><rect x="4" y="6" width="2" height="4" fill="#fef08a"/><rect x="10" y="6" width="2" height="4" fill="#fef08a"/><rect x="7" y="9" width="2" height="1" fill="#fbcfe8"/><rect x="3" y="12" width="3" height="2" fill="#111827"/><rect x="10" y="12" width="3" height="2" fill="#111827"/></svg>`;
    case 'cat-calico':
      return `<svg ${common}><rect x="3" y="2" width="2" height="2" fill="#f9a826"/><rect x="11" y="2" width="2" height="2" fill="#1f2937"/><rect x="2" y="4" width="12" height="8" fill="#fff"/><rect x="2" y="4" width="3" height="3" fill="#f9a826"/><rect x="9" y="8" width="4" height="4" fill="#1f2937"/><rect x="4" y="6" width="2" height="2" fill="#111"/><rect x="10" y="6" width="2" height="2" fill="#111"/><rect x="7" y="8" width="2" height="2" fill="#e65a7e"/><rect x="3" y="12" width="3" height="2" fill="#f3f4f6"/><rect x="10" y="12" width="3" height="2" fill="#f3f4f6"/></svg>`;
    case 'cat-siamese':
      return `<svg ${common}><rect x="3" y="2" width="2" height="2" fill="#452b1b"/><rect x="11" y="2" width="2" height="2" fill="#452b1b"/><rect x="2" y="4" width="12" height="8" fill="#fef3c7"/><rect x="5" y="5" width="6" height="5" fill="#452b1b"/><rect x="4" y="6" width="2" height="2" fill="#38bdf8"/><rect x="10" y="6" width="2" height="2" fill="#38bdf8"/><rect x="7" y="8" width="2" height="2" fill="#111"/><rect x="3" y="12" width="3" height="2" fill="#452b1b"/><rect x="10" y="12" width="3" height="2" fill="#452b1b"/></svg>`;
    case 'cat-gray':
      return `<svg ${common}><rect x="3" y="2" width="2" height="2" fill="#9ca3af"/><rect x="11" y="2" width="2" height="2" fill="#9ca3af"/><rect x="2" y="4" width="12" height="8" fill="#9ca3af"/><rect x="4" y="6" width="2" height="2" fill="#111"/><rect x="10" y="6" width="2" height="2" fill="#111"/><rect x="7" y="8" width="2" height="2" fill="#e65a7e"/><rect x="3" y="12" width="3" height="2" fill="#d1d5db"/><rect x="10" y="12" width="3" height="2" fill="#d1d5db"/><rect x="7" y="4" width="2" height="2" fill="#4b5563"/><rect x="2" y="7" width="2" height="1" fill="#4b5563"/><rect x="12" y="7" width="2" height="1" fill="#4b5563"/></svg>`;
    case 'yarn-ball':
      return `<svg ${common}><rect x="4" y="3" width="8" height="10" fill="#ef4444"/><rect x="3" y="4" width="10" height="8" fill="#ef4444"/><rect x="5" y="4" width="6" height="2" fill="#b91c1c"/><rect x="4" y="8" width="8" height="2" fill="#b91c1c"/><rect x="9" y="13" width="1" height="2" fill="#ef4444"/><rect x="10" y="14" width="3" height="1" fill="#ef4444"/></svg>`;
    case 'heart':
      return `<svg ${common}><rect x="4" y="3" width="2" height="2" fill="#e11d48"/><rect x="10" y="3" width="2" height="2" fill="#e11d48"/><rect x="3" y="5" width="10" height="3" fill="#e11d48"/><rect x="4" y="8" width="8" height="3" fill="#e11d48"/><rect x="5" y="11" width="6" height="2" fill="#e11d48"/><rect x="6" y="13" width="4" height="2" fill="#e11d48"/></svg>`;
    case 'star':
      return `<svg ${common}><rect x="7" y="1" width="2" height="3" fill="#facc15"/><rect x="5" y="4" width="6" height="2" fill="#facc15"/><rect x="1" y="6" width="14" height="2" fill="#facc15"/><rect x="4" y="8" width="8" height="2" fill="#facc15"/><rect x="6" y="10" width="4" height="5" fill="#facc15"/></svg>`;
    case 'paw-print':
    default:
      return `<svg ${common}><rect x="4" y="7" width="8" height="6" fill="#e8a5a0"/><rect x="6" y="13" width="4" height="2" fill="#e8a5a0"/><rect x="2" y="9" width="2" height="4" fill="#e8a5a0"/><rect x="12" y="9" width="2" height="4" fill="#e8a5a0"/><rect x="2" y="3" width="3" height="4" fill="#e8a5a0"/><rect x="6.5" y="1" width="3" height="4" fill="#e8a5a0"/><rect x="11" y="3" width="3" height="4" fill="#e8a5a0"/></svg>`;
  }
};

const buildStickerLayer = (stickers: Greeting['stickers']) =>
  stickers
    .map((sticker, index) => `<div class="sticker ${cornerClasses[index % cornerClasses.length]}">${getStickerMarkup(sticker.type)}</div>`)
    .join('');

const resolveFontClass = (fontStyle: Greeting['fontStyle']) => `font-${fontStyle}`;

const resolveMessageClass = (messageStyle: Greeting['messageStyle']) =>
  messageStyle === 'handwritten' ? 'msg-handwritten' : 'msg-normal';

export const downloadGreetingAsHtml = (greeting: Greeting) => {
  const title = escapeHtml(greeting.title || 'Untitled Greeting');
  const recipient = greeting.recipientName ? escapeHtml(greeting.recipientName) : '';
  const message = escapeHtml(greeting.message || '');
  const youtubeId = getYoutubeEmbedId(greeting.youtubeUrl);
  const stickerMarkup = buildStickerLayer(greeting.stickers);
  const imagesMarkup = greeting.images
    .map((image, index) => `<div class="image-wrapper"${index % 2 === 1 ? ' style="transform: rotate(1.5deg);"' : ''}><img src="${image}" alt="Greeting moment ${index + 1}" /></div>`)
    .join('');
  const youtubeMarkup = youtubeId
    ? `<section class="video-section"><p style="margin-top:0;">Included song/video:</p><a class="video-link" href="https://www.youtube.com/watch?v=${youtubeId}" target="_blank" rel="noreferrer noopener">https://www.youtube.com/watch?v=${youtubeId}</a></section>`
    : '';
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
    <style>${GREETING_STYLES}</style>
  </head>
  <body>
    <div class="viewport" style="background-color:${greeting.backgroundColor};">
      <div class="container">
        <div class="deco-layer"></div>
        <main class="card">
          <section class="cover">
            <h1 class="${resolveFontClass(greeting.fontStyle)}">${title}</h1>
            ${recipient ? `<p class="recipient">For ${recipient}</p>` : ''}
          </section>
          ${imagesMarkup ? `<section class="images-grid">${stickerMarkup}${imagesMarkup}</section>` : ''}
          ${message ? `<section class="message"><div class="${resolveMessageClass(greeting.messageStyle)}">${stickerMarkup}${message}</div></section>` : ''}
          ${youtubeMarkup}
          <footer class="footer">
            <p>Saved from PawfectNotes</p>
            <p>Created ${new Date(greeting.createdAt).toLocaleString()}</p>
          </footer>
        </main>
      </div>
    </div>
  </body>
</html>`;

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${sanitizeFileName(greeting.title || greeting.id)}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
};

export const isGreetingSavedLocally = (id: string) => !!window.localStorage.getItem(`greeting_${id}`);
