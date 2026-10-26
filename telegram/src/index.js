import {authorized,webhookAuthorized,apiAuthorized} from './auth.js';
import {tg,notify} from './telegram.js';
import {decide} from './proposals.js';
import {github,isAllowedChangeSet,diffDigest} from './github.js';

async function register(request,env){
 if(!apiAuthorized(request,env))
    return new Response('Forbidden',{status:403});
 
 const payload=await request.json();
 const prNum=Number(payload.pr_number);
 
 if(!Number.isSafeInteger(prNum)||prNum<1)return new Response('Bad PR',{status:400});
 
  const pr=await github(env,`/pulls/${prNum}`);
  
  if(pr.state!=='open'||pr.base.ref!=='main'||pr.head.repo?.full_name!==`${env.GITHUB_OWNER}/${env.GITHUB_REPO}`||pr.head.repo?.fork!==false||pr.base.repo?.full_name!==`${env.GITHUB_OWNER}/${env.GITHUB_REPO}`||!pr.head.ref.startsWith('portfolio/sync-'))return new Response('Invalid proposal',{status:422});
  const files=await github(env,`/pulls/${prNum}/files?per_page=100`);
  
  if(!isAllowedChangeSet(files))return new Response('Invalid changes',{status:422});
  const id=`pr${prNum}-${pr.head.sha.slice(0,12)}`;
  const rec={id,pr_number:prNum,head_sha:pr.head.sha,base_sha:pr.base.sha,diff_digest:await diffDigest(files),summary:`Actualización del snapshot de GitHub. PR #${prNum}`,created_at:new Date().toISOString(),expires_at:new Date(Date.now()+48*3600e3).toISOString()};
 const result=await env.DB.prepare('INSERT OR IGNORE INTO proposals(id,pr_number,head_sha,base_sha,diff_digest,summary,created_at,expires_at) VALUES(?,?,?,?,?,?,?,?)').bind(rec.id,rec.pr_number,rec.head_sha,rec.base_sha,rec.diff_digest,rec.summary,rec.created_at,rec.expires_at).run();
 if(result.meta.changes===1)await notify(env,rec);
 return Response.json({id,created:result.meta.changes===1});
}
async function telegram(request,env){
 if(!webhookAuthorized(request,env))return new Response('Forbidden',{status:403});
 const update=await request.json();
 if(!authorized(update,env))return new Response('ok');
 const q=update.callback_query;
 if(q){
   const match=/^(approve|reject):(pr\d+-[a-f0-9]{12})$/.exec(q.data||'');
   if(!match)return new Response('ok');
   await tg(env,'answerCallbackQuery',{callback_query_id:q.id,text:'Solicitud recibida'});
   try{ const result=await decide(env,match[2],match[1],q.from.id);await tg(env,'sendMessage',{chat_id:env.TELEGRAM_CHAT_ID,text:result}); }
   catch(e){await tg(env,'sendMessage',{chat_id:env.TELEGRAM_CHAT_ID,text:`⚠️ No autorizado: ${String(e.message).slice(0,250)}`});}
 }else if(update.message?.text?.trim()==='/pending'){
   const list=await env.DB.prepare("SELECT pr_number,expires_at FROM proposals WHERE status='pending' AND expires_at>? ORDER BY created_at DESC LIMIT 15").bind(new Date().toISOString()).all();
   await tg(env,'sendMessage',{chat_id:env.TELEGRAM_CHAT_ID,text:list.results.length?list.results.map(p=>`PR #${p.pr_number} hasta ${p.expires_at}`).join('\n'):'Sin propuestas pendientes'});
 }else if(update.message?.text?.trim()==='/start'){
   await tg(env,'sendMessage',{chat_id:env.TELEGRAM_CHAT_ID,text:'Bot de aprobación activo. Usa /pending.'});
 }
 return new Response('ok');
}


async function githubHealth(request, env) {
  if (request.method !== "GET") {
    return new Response("Method not allowed", {
      status: 405
    });
  }

  if (!apiAuthorized(request, env)) {
    return new Response("Unauthorized", {
      status: 401
    });
  }

  try {
    const repo = await github(env, "");

    return Response.json({
      ok: true,
      repository: repo.full_name,
      authenticated: true
    });

  } catch (error) {
    console.error("GitHub health error:", error.message);

    return Response.json(
      {
        ok: false,
        error: "GitHub authentication failed"
      },
      { status: 502 }
    );
  }
}

async function stats(request, env) {
  if (request.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }
  if (!apiAuthorized(request, env)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const proposals = await env.DB.prepare(
    "SELECT status, COUNT(*) AS n FROM proposals GROUP BY status"
  ).all();
  const events = await env.DB.prepare(
    "SELECT event_type, COUNT(*) AS n FROM approval_events GROUP BY event_type"
  ).all();

  return Response.json({
    proposals: Object.fromEntries(proposals.results.map((r) => [r.status, r.n])),
    events: Object.fromEntries(events.results.map((r) => [r.event_type, r.n])),
  });
}

async function expirePending(env) {
  const now = new Date().toISOString();
  const expired = await env.DB.prepare(
    "SELECT id FROM proposals WHERE status='pending' AND expires_at<=?"
  ).bind(now).all();

  for (const p of expired.results) {
    await env.DB.prepare(
      "UPDATE proposals SET status='expired', decided_at=? WHERE id=? AND status='pending'"
    ).bind(now, p.id).run();
    await env.DB.prepare(
      "INSERT INTO approval_events(proposal_id,event_type,created_at) VALUES(?,?,?)"
    ).bind(p.id, "expired", now).run();
  }
  return expired.results.length;
}


export default {
  async fetch(request, env) {
    try {
      const path = new URL(request.url).pathname;
      if (request.method === 'POST' && path === '/telegram') return await telegram(request, env);
      if (request.method === 'POST' && path === '/register') return await register(request, env);
      if (request.method === 'GET' && path === '/health') return new Response('OK');
      if (request.method === 'GET' && path === '/github-health') return await githubHealth(request, env);
      if (request.method === 'GET' && path === '/stats') return await stats(request, env);
      return new Response('Not found', { status: 404 });
    } catch (e) { console.error('Worker error:', e); return new Response('Error', { status: 500 }); }
  },
  async scheduled(event, env, ctx) {
    ctx.waitUntil((async () => {
      const n = await expirePending(env);
      if (n > 0) console.log(`Expired ${n} pending proposals`);
    })());
  }
};
