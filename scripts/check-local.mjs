const base = process.env.PREVIEW_URL || 'http://localhost:3000';
const response = await fetch(`${base}/sitemap.xml`);
if (!response.ok) throw new Error(`Sitemap returned ${response.status}`);
const xml = await response.text();
const paths = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]).pathname);
const pending = [...new Set(paths)];
const results = [];
await Promise.all(Array.from({length: 6}, async () => {
 while (pending.length) {
  const path = pending.shift();
  try { const r = await fetch(base + path); const html = await r.text(); results.push({path, status:r.status, hasHeading: /<h1[\s>]/.test(html)}); }
  catch (error) { results.push({path, error: String(error)}); }
 }
}));
const failed = results.filter(r => r.status !== 200 || !r.hasHeading);
console.log(JSON.stringify({checked:results.length, failed}, null, 2));
process.exitCode = failed.length ? 1 : 0;
