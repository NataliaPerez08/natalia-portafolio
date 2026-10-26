import {getProposal,claim,finalize} from './db.js';
import {verifyPR,mergePR,closePR,github} from './github.js';
export async function decide(env,id,action,actor){
 const rec=await getProposal(env,id);
 if(!rec) throw Error('Propuesta inexistente');
 if(rec.status!=='pending') throw Error(`Estado actual: ${rec.status}`);
 if(!(await claim(env,id))) throw Error('Propuesta expirada o ya procesada');
 try {
   if(action==='approve'){
     await verifyPR(env,rec);
     const res=await mergePR(env,rec);
     if(!res.merged)throw Error('GitHub rechazó el merge');
     await finalize(env,id,'approved',actor);
     return `✅ PR #${rec.pr_number} aprobado e integrado`;
   }
   if(action==='reject'){
     const pr=await github(env,`/pulls/${rec.pr_number}`);
     if(pr.state==='open') await closePR(env,rec);
     await finalize(env,id,'rejected',actor);
     return `❌ PR #${rec.pr_number} rechazado`;
   }
   throw Error('Acción desconocida');
 }catch(e){await finalize(env,id,'failed',actor,String(e.message).slice(0,400));throw e}
}
