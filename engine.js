export const VERSION = 1;
export function shuffle(list, random = Math.random) {
 const a = [...list]; for (let i=a.length-1; i>0; i--) {const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a;
}
export function createSession(ids, mode, original=false) {
 return {mode,original,ids:[...ids],queue:shuffle(ids),done:[],attempts:0,errors:0,skips:0,answer:null,choiceOrder:null,started:Date.now()};
}
export function answerQuiz(session, id, right) {
 if (session.answer!==null || session.queue[0]!==id) return false;
 session.attempts++; if(!right) session.errors++;
 session.answer=right?'correct':'wrong'; return true;
}
export function advanceSession(session, correct) {
 const id=session.queue.shift();
 if(correct) {if(!session.done.includes(id))session.done.push(id);} else session.queue.push(id);
 session.answer=null; session.choiceOrder=null; session.selected=null;
 return session.queue.length===0;
}
export function skipCard(session) {
 if(session.mode!=='cards'||session.queue.length<2)return false;
 session.queue.push(session.queue.shift());
 session.skips=(session.skips||0)+1;
 session.answer=null;session.choiceOrder=null;session.selected=null;
 return true;
}
export function cleanState(raw, validIds) {
 const valid=new Set(validIds),obj=raw&&typeof raw==='object'?raw:{};
 const array=k=>Array.isArray(obj[k])?[...new Set(obj[k].filter(x=>valid.has(x)))]:[];
 const stats={}; if(obj.stats&&typeof obj.stats==='object')for(const [id,v]of Object.entries(obj.stats))if(valid.has(id)&&v&&typeof v==='object')stats[id]={correct:Number.isFinite(v.correct)?Math.max(0,v.correct):0,wrong:Number.isFinite(v.wrong)?Math.max(0,v.wrong):0,lastWrong:v.lastWrong===true};
 let session=null;const s=obj.session;
 if(s&&['cards','quiz'].includes(s.mode)&&Array.isArray(s.ids)&&Array.isArray(s.queue)&&Array.isArray(s.done)){
 const ids=[...new Set(s.ids.filter(x=>valid.has(x)))],queue=s.queue.filter(x=>ids.includes(x)),done=[...new Set(s.done.filter(x=>ids.includes(x)))];
 if(ids.length&&queue.length===new Set(queue).size&&!queue.some(x=>done.includes(x))&&ids.length===queue.length+done.length){
 session={...s,ids,queue,done,original:s.original===true,attempts:Number.isFinite(s.attempts)?s.attempts:0,errors:Number.isFinite(s.errors)?s.errors:0,skips:Number.isFinite(s.skips)?Math.max(0,s.skips):0,answer:['wrong','correct'].includes(s.answer)?s.answer:null,choiceOrder:Array.isArray(s.choiceOrder)&&s.choiceOrder.length===4&&new Set(s.choiceOrder).size===4&&s.choiceOrder.every(n=>Number.isInteger(n)&&n>=0&&n<4)?s.choiceOrder:null};
 }
 }
 return {version:VERSION,known:array('known'),bookmarks:array('bookmarks'),stats,session,theme:['system','light','dark'].includes(obj.theme)?obj.theme:'system',motion:obj.motion!==false};
}
