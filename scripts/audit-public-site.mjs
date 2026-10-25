const origin = process.argv[2] || "https://qzdxrv.com";
const sitemap = await fetch(`${origin}/sitemap.xml`).then(response => response.text());
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]).pathname);
const results = [];
for (let index = 0; index < paths.length; index += 5) {
  await Promise.all(paths.slice(index, index + 5).map(async path => {
    const started = performance.now();
    try {
      const response = await fetch(new URL(path, origin), {redirect: "follow"});
      const html = await response.text();
      const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] || "";
      const description = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] || "";
      const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i)?.[1] || "";
      const h1 = [...html.matchAll(/<h1(?:\s[^>]*)?>/gi)].length;
      const links = [...html.matchAll(/<a\b[^>]*\bhref="([^"]*)"/gi)].map(match => match[1]).filter(href => href.startsWith("/") && !href.startsWith("//"));
      results.push({path, status: response.status, ms: Math.round(performance.now() - started), title, description: Boolean(description), canonical, h1, links});
    } catch (error) {
      results.push({path, error: String(error)});
    }
  }));
}
const linkTargets = [...new Set(results.flatMap(result => result.links || []).map(href => new URL(href, origin).pathname))];
const targetResults = [];
for (let index = 0; index < linkTargets.length; index += 8) {
  await Promise.all(linkTargets.slice(index, index + 8).map(async path => {
    try {
      const response = await fetch(new URL(path, origin), {method: "HEAD", redirect: "follow"});
      if (response.status >= 400) targetResults.push({path, status: response.status});
    } catch (error) { targetResults.push({path, error: String(error)}); }
  }));
}
console.log(JSON.stringify({origin, pages: results.length, linkTargets: linkTargets.length, failures: results.filter(result => result.error || result.status >= 400), missingDescriptions: results.filter(result => !result.description).map(result => result.path), missingCanonicals: results.filter(result => !result.canonical).map(result => result.path), badH1: results.filter(result => result.h1 !== 1).map(result => ({path: result.path, h1: result.h1})), slowest: results.toSorted((a,b) => (b.ms || 0) - (a.ms || 0)).slice(0, 10).map(({path,ms}) => ({path,ms})), brokenLinks: targetResults}, null, 2));
