export async function getProposal(env,id){return env.DB.prepare('SELECT * FROM proposals WHERE id=?').bind(id).first()}
export async function claim(env,id){const r=await env.DB.prepare("UPDATE proposals SET status='processing' WHERE id=? AND status='pending' AND expires_at > ?").bind(id,new Date().toISOString()).run();return r.meta.changes===1}
export async function finalize(env,id,status,actor,detail=''){
 await env.DB.prepare("UPDATE proposals SET status=?,decided_at=?,decided_by=? WHERE id=? AND status='processing'").bind(status,new Date().toISOString(),String(actor),id).run();
 await env.DB.prepare('INSERT INTO approval_events(proposal_id,event_type,actor_id,created_at,details) VALUES(?,?,?,?,?)').bind(id,status,String(actor),new Date().toISOString(),detail).run();
}
