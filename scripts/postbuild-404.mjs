// Copies the prerendered /not-found route to 404.html at the output root, so a plain
// Apache host (Hostpoint) can serve it via `ErrorDocument 404 /404.html` (see
// public/.htaccess) for any unmatched real URL — no server-side routing needed.
import { copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BROWSER_DIR = path.join(__dirname, '../dist/angular-atelier-ng/browser');
const SOURCE = path.join(BROWSER_DIR, 'not-found/index.html');
const DEST = path.join(BROWSER_DIR, '404.html');

await copyFile(SOURCE, DEST);
console.log(`[postbuild-404] Copied ${SOURCE} -> ${DEST}`);
