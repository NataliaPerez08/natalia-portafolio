export function authorized(update, env) {
  const u=update.callback_query?.from||update.message?.from;
  const chat=update.callback_query?.message?.chat||update.message?.chat;
  return chat?.type==='private'&&String(u?.id)===String(env.TELEGRAM_ADMIN_USER_ID)&&String(chat?.id)===String(env.TELEGRAM_CHAT_ID);
}
export function webhookAuthorized(request,env){
  return Boolean(env.TELEGRAM_WEBHOOK_SECRET)&&request.headers.get('X-Telegram-Bot-Api-Secret-Token')===env.TELEGRAM_WEBHOOK_SECRET;
}
export function apiAuthorized(request,env){
  return Boolean(env.PROPOSAL_API_SECRET)&&request.headers.get('Authorization')===`Bearer ${env.PROPOSAL_API_SECRET}`;
}
