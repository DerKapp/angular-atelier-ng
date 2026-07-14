// Fetches Rafael's and Elisa's Medium RSS feeds at build time, merges and
// sorts the items, and writes the result to src/app/data/blog-posts.generated.json.
// This keeps the deployed site fully static — no runtime network calls, no
// CORS issues — at the cost of the post list only being as fresh as the last
// build. Run automatically via the npm "prebuild" script, or manually with
// `npm run fetch:blog`.
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import Parser from 'rss-parser';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, '../src/app/data/blog-posts.generated.json');
const FETCH_TIMEOUT_MS = 10_000;
const WORDS_PER_MINUTE = 200;

const FEEDS = [
  { url: 'https://medium.com/feed/@e.kapprafael', author: 'Rafael Kapp' },
  { url: 'https://medium.com/feed/@schnabelelisa0', author: 'Elisa Schnabel' },
];

const parser = new Parser({
  customFields: { item: [['content:encoded', 'contentEncoded']] },
});

function stripHtml(html) {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractExcerpt(html) {
  const text = stripHtml(html ?? '');
  return text.length > 160 ? `${text.slice(0, 160).trimEnd()}…` : text;
}

function extractThumbnail(html) {
  const match = /<img[^>]+src="([^">]+)"/.exec(html ?? '');
  return match?.[1] ?? 'images/illustrations/hero.png';
}

function estimateReadTime(html) {
  const wordCount = stripHtml(html ?? '')
    .split(' ')
    .filter(Boolean).length;
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
}

async function fetchFeed({ url, author }) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const xml = await response.text();
    const feed = await parser.parseString(xml);

    return (feed.items ?? []).map((item) => {
      const content = item.contentEncoded ?? item.content ?? '';
      return {
        title: item.title ?? '',
        excerpt: extractExcerpt(content),
        link: item.link ?? '',
        author,
        pubDate: item.pubDate ?? new Date().toISOString(),
        thumbnail: extractThumbnail(content),
        readTimeMinutes: estimateReadTime(content),
      };
    });
  } catch (error) {
    console.warn(`[fetch-blog-posts] Could not fetch feed for ${author} (${url}):`, error.message);
    return [];
  }
}

async function main() {
  const results = await Promise.all(FEEDS.map(fetchFeed));
  const merged = results
    .flat()
    .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  await writeFile(OUTPUT_PATH, JSON.stringify(merged, null, 2) + '\n', 'utf-8');
  console.log(`[fetch-blog-posts] Wrote ${merged.length} posts to ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.warn('[fetch-blog-posts] Unexpected failure, writing empty post list:', error);
  writeFile(OUTPUT_PATH, '[]\n', 'utf-8').finally(() => process.exit(0));
});
