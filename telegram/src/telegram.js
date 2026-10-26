export async function tg(env, method, payload) {
  const r=await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/${method}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
  if(!r.ok) throw Error(`Telegram ${method}: ${r.status}`);
  return r.json();
}
export async function notify(env, record) {
  const text=`📋 Propuesta #${record.pr_number}\n${record.summary}\nRevisa el diff antes de decidir: https://github.com/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/pull/${record.pr_number}\nExpira: ${record.expires_at}`;
  return tg(env,'sendMessage',{chat_id:env.TELEGRAM_CHAT_ID,text,reply_markup:{inline_keyboard:[
    [{text:'✅ Aprobar',callback_data:`approve:${record.id}`},{text:'❌ Rechazar',callback_data:`reject:${record.id}`}],
    [{text:'Ver cambios en GitHub',url:`https://github.com/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/pull/${record.pr_number}`}]
  ]}});
}
