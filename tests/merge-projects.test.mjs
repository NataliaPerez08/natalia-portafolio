import test from 'node:test';
import assert from 'node:assert/strict';
import { mergeProjects, repositoryKey } from '../src/data/merge-projects.js';
test('editorial descriptions and featured flags win', () => {
  const e = [{ slug:'x', name:'Editorial', summary:'Curated', stack:['Rust'], featured:true, category:['systems'], caseStudy:true, repository:'https://github.com/NataliaPerez08/X' }];
  const g = [{ slug:'x', name:'Remote', summary:'Changed', stack:['Go'], featured:false, repository:'https://github.com/nataliaperez08/x', stars:3, updatedAt:'2026-01-01', topics:[] }];
  const [r] = mergeProjects(e, g);
  assert.equal(r.summary,'Curated'); assert.equal(r.featured,true); assert.deepEqual(r.stack,['Rust']); assert.equal(r.github.stars,3); assert.equal(r.caseStudy,true);
});
test('new projects require topic portfolio and are not featured', () => {
  const g = [{name:'A',repository:'https://github.com/NataliaPerez08/A',topics:['portfolio'],archived:false},{name:'B',repository:'https://github.com/NataliaPerez08/B',topics:[],archived:false}];
  const r=mergeProjects([],g); assert.equal(r.length,1); assert.equal(r[0].featured,false);
});
test('URLs normalize case and .git', () => assert.equal(repositoryKey('https://github.com/Me/Repo.git'), 'me/repo'));
test('editorial project missing from GitHub is preserved', () => {
  const e = [{ slug:'gone', name:'Gone', summary:'Kept', featured:true, repository:'https://github.com/NataliaPerez08/gone' }];
  const r = mergeProjects(e, []);
  assert.equal(r.length, 1); assert.equal(r[0].summary, 'Kept'); assert.equal(r[0].source, 'editorial');
});
test('provenance is marked on both editorial and discovered', () => {
  const e = [{ slug:'a', name:'A', repository:'https://github.com/NataliaPerez08/A' }];
  const g = [
    { slug:'a', name:'A', repository:'https://github.com/NataliaPerez08/A', topics:[], stars:5 },
    { slug:'b', name:'B', repository:'https://github.com/NataliaPerez08/B', topics:['portfolio'], archived:false }
  ];
  const r = mergeProjects(e, g);
  const a = r.find(p => p.slug === 'a');
  const b = r.find(p => p.slug === 'b');
  assert.equal(a.source, 'editorial'); assert.equal(a.github.stars, 5);
  assert.equal(b.source, 'github'); assert.equal(b.featured, false);
});
