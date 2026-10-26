export function repositoryKey(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.toLowerCase() !== 'github.com') return null;
    const path = u.pathname.replace(/\.git\/?$/i, '').split('/').filter(Boolean);
    if (path.length !== 2) return null;
    return path.join('/').toLowerCase();
  } catch { return null; }
}

export function mergeProjects(editorial, github) {
  // Modelo híbrido: los campos editoriales (summary, stack, featured,
  // category, caseStudy, status) tienen prioridad; GitHub solo enriquece
  // datos objetivos bajo `github.*` (stars, language, updatedAt, archived,
  // description). Un proyecto editorial sin match en GitHub se conserva tal
  // cual. La procedencia queda marcada en `source`.
  const remote = new Map(github.filter(r => repositoryKey(r.repository)).map(r => [repositoryKey(r.repository), r]));
  const existing = new Set(editorial.map(p => repositoryKey(p.repository)).filter(Boolean));
  const preserved = editorial.map(p => {
    const r = remote.get(repositoryKey(p.repository));
    return r ? {
      ...r, ...p,
      source: 'editorial',
      github: { stars: r.stars, language: r.language, updatedAt: r.updatedAt, archived: r.archived, description: r.summary }
    } : { ...p, source: 'editorial' };
  });
  const discovered = github.filter(r => r.topics.includes('portfolio') && !r.archived && !existing.has(repositoryKey(r.repository)))
    .map(r => ({ ...r, category: ['other'], featured: false, caseStudy: false, status: 'active', source: 'github' }));
  return [...preserved, ...discovered];
}
