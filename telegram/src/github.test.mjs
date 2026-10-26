import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ALLOWED_PATHS,
  isAllowedChangeSet,
  diffDigest,
  checkPasses
} from './github.js';

test('isAllowedChangeSet only accepts the allowlisted file', () => {
  assert.equal(isAllowedChangeSet([{ filename: ALLOWED_PATHS[0] }]), true);
  assert.equal(isAllowedChangeSet([]), false);
  assert.equal(isAllowedChangeSet([{ filename: 'src/App.jsx' }]), false);
  assert.equal(
    isAllowedChangeSet([{ filename: ALLOWED_PATHS[0] }, { filename: 'src/App.jsx' }]),
    false
  );
});

test('diffDigest is order-independent and changes with content', async () => {
  const files = [
    { filename: 'src/data/generated/github-projects.json', sha: 'abc', status: 'modified', additions: 1, deletions: 0 }
  ];
  assert.equal(await diffDigest(files), await diffDigest([...files].reverse()));
  assert.notEqual(await diffDigest(files), await diffDigest([{ ...files[0], sha: 'def' }]));
});

test('checkPasses requires identity, exact commit and success', () => {
  const base = {
    name: 'test',
    app: { slug: 'github-actions', id: 15368 },
    head_sha: 'deadbeef',
    status: 'completed',
    conclusion: 'success'
  };
  assert.equal(checkPasses(base, 'deadbeef'), true);
  assert.equal(checkPasses({ ...base, head_sha: 'other' }, 'deadbeef'), false);
  assert.equal(checkPasses({ ...base, name: 'build' }, 'deadbeef'), false);
  assert.equal(checkPasses({ ...base, app: { slug: 'travis-ci' } }, 'deadbeef'), false);
  assert.equal(checkPasses({ ...base, conclusion: 'failure' }, 'deadbeef'), false);
});
