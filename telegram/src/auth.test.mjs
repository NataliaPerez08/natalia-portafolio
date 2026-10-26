import test from 'node:test';
import assert from 'node:assert/strict';
import { authorized, webhookAuthorized, apiAuthorized } from './auth.js';

const env = {
  TELEGRAM_ADMIN_USER_ID: '111',
  TELEGRAM_CHAT_ID: '222',
  TELEGRAM_WEBHOOK_SECRET: 'webhook-secret',
  PROPOSAL_API_SECRET: 'api-secret',
};

test('authorized: only the admin in a private chat is accepted', () => {
  const admin = {
    callback_query: { from: { id: 111 }, message: { chat: { id: 222, type: 'private' } } },
  };
  assert.equal(authorized(admin, env), true);

  const nonAdmin = {
    callback_query: { from: { id: 999 }, message: { chat: { id: 222, type: 'private' } } },
  };
  assert.equal(authorized(nonAdmin, env), false);

  const groupChat = {
    callback_query: { from: { id: 111 }, message: { chat: { id: 222, type: 'group' } } },
  };
  assert.equal(authorized(groupChat, env), false);

  const wrongChat = {
    callback_query: { from: { id: 111 }, message: { chat: { id: 333, type: 'private' } } },
  };
  assert.equal(authorized(wrongChat, env), false);
});

test('webhookAuthorized: requires the Telegram secret header', () => {
  assert.equal(webhookAuthorized({ headers: { get: () => 'webhook-secret' } }, env), true);
  assert.equal(webhookAuthorized({ headers: { get: () => 'bad' } }, env), false);
  assert.equal(webhookAuthorized({ headers: { get: () => 'webhook-secret' } }, {}), false);
});

test('apiAuthorized: requires the bearer proposal secret', () => {
  assert.equal(apiAuthorized({ headers: { get: () => 'Bearer api-secret' } }, env), true);
  assert.equal(apiAuthorized({ headers: { get: () => 'Bearer bad' } }, env), false);
  assert.equal(apiAuthorized({ headers: { get: () => 'Bearer api-secret' } }, {}), false);
});
