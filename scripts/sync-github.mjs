import { mkdir, writeFile } from 'node:fs/promises';

const owner = 'NataliaPerez08';
const api = 'https://api.github.com';

const headers = (token) => ({
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': 'natalia-portfolio-sync',
  ...(token ? { Authorization: `Bearer ${token}` } : {})
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function githubFetch(path, token, attempt = 0) {
  const res = await fetch(`${api}${path}`, { headers: headers(token) });

  const rateLimited =
    res.status === 429 ||
    (res.status === 403 && res.headers.get('x-ratelimit-remaining') === '0');
  if (rateLimited && attempt < 5) {
    const retryAfter = Number(res.headers.get('retry-after')) || 60;
    await sleep(retryAfter * 1000);
    return githubFetch(path, token, attempt + 1);
  }

  if (res.status >= 500 && attempt < 5) {
    await sleep(1000 * 2 ** attempt);
    return githubFetch(path, token, attempt + 1);
  }

  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
  return res.json();
}

const all = [];
for (let page = 1; ; page++) {
  const batch = await githubFetch(
    `/users/${owner}/repos?per_page=100&page=${page}&type=owner`,
    process.env.GITHUB_TOKEN
  );
  all.push(...batch);
  if (batch.length < 100) break;
}

const byId = new Map();
for (const r of all) {
  if (r.fork) continue;
  if (!byId.has(r.id)) byId.set(r.id, r);
}

const repos = [...byId.values()]
  .map((r) => ({
    id: r.id,
    slug: r.name.toLowerCase(),
    name: r.name,
    type: 'project',
    repository: r.html_url,
    summary: r.description || '',
    language: r.language,
    stack: r.language ? [r.language] : [],
    topics: [...(r.topics || [])].sort(),
    stars: r.stargazers_count,
    updatedAt: r.pushed_at,
    archived: r.archived,
  }))
  .sort((a, b) => a.repository.localeCompare(b.repository));

await mkdir('src/data/generated', { recursive: true });
await writeFile(
  'src/data/generated/github-projects.json',
  JSON.stringify(repos, null, 2) + '\n'
);
console.log(`Synced ${repos.length} repositories`);
