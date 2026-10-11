export const VERSION = 1;
export function shuffle(list, random = Math.random) {
 const a = [...list]; for (let i=a.length-1; i>0; i--) {const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a;
}
export function createSession(ids, mode, original=true, kind='practice', ordering='mixed') {
 const order=ordering==='sorted'?'sorted':'mixed';
 return {mode,kind:mode==='quiz'&&kind==='exam'?'exam':'practice',ordering:order,original,ids:[...ids],queue:order==='sorted'?[...ids]:shuffle(ids),done:[],attempts:0,errors:0,skips:0,answer:null,choiceOrder:null,selected:null,history:[],reviewIndex:null,results:{},ended:false,started:Date.now()};
}
export const isReviewing = session => Number.isInteger(session?.reviewIndex);
export const reviewEntry = session => isReviewing(session) ? session.history[session.reviewIndex] : null;
// Translate choice indices, never the recorded score, when changing wording.
export function convertSessionWording(session, original, questions) {
 if(!session||session.original===original)return;
 const byId=new Map(questions.map(q=>[q.id,q]));
 const convert=(entry,id)=>{
  const map=byId.get(id)?.originalChoiceMap;if(!map)return;
  const index=n=>n===null||n===undefined?null:original?map[n]:map.indexOf(n);
  entry.selected=index(entry.selected);
  if(entry.choiceOrder)entry.choiceOrder=entry.choiceOrder.map(index);
 };
 convert(session,session.queue[0]);
 for(const entry of session.history||[])convert(entry,entry.id);
 for(const [id,entry]of Object.entries(session.results||{}))convert(entry,id);
 session.original=original;
}
export function answerQuiz(session, id, right, selected=null) {
 if (session.ended || isReviewing(session) || session.answer!==null || session.queue[0]!==id || session.kind==='exam'&&session.results[id]) return false;
 session.attempts++; if(!right) session.errors++;
 session.answer=right?'correct':'wrong';session.selected=selected;
 if(session.kind==='exam')session.results[id]={correct:right,selected};
 return true;
}
function remember(session, answer) {
 session.history ||= [];
 session.history.push({id:session.queue[0],answer,selected:session.selected??null,choiceOrder:session.choiceOrder?[...session.choiceOrder]:null});
 if(session.history.length>1000)session.history.shift();
 session.reviewIndex=null;
}
function clearAnswer(session) {session.answer=null;session.choiceOrder=null;session.selected=null;}
export function advanceSession(session, correct) {
 if(session.ended||isReviewing(session)||!session.queue.length)return false;
 remember(session,correct?'correct':'wrong');
 const id=session.queue.shift();
 if(correct||session.kind==='exam') {if(!session.done.includes(id))session.done.push(id);} else session.queue.push(id);
 clearAnswer(session);
 return session.queue.length===0;
}
export function skipQuestion(session) {
 if(session.ended||isReviewing(session)||session.answer!==null||session.queue.length<2)return false;
 remember(session,'skipped');
 session.queue.push(session.queue.shift());
 session.skips=(session.skips||0)+1;
 clearAnswer(session);
 return true;
}
export const skipCard = skipQuestion;
export function goBack(session) {
 if(!session.history?.length)return false;
 if(!isReviewing(session))session.reviewIndex=session.history.length-1;
 else if(session.reviewIndex>0)session.reviewIndex--;
 else return false;
 return true;
}
export function goForward(session) {
 if(!isReviewing(session))return false;
 session.reviewIndex=session.reviewIndex<session.history.length-1?session.reviewIndex+1:null;
 return true;
}
export function resumeQuestion(session, id) {
 if(session.ended||!isReviewing(session)||session.answer!==null)return false;
 const index=session.queue.indexOf(id);
 if(index<0||session.kind==='exam'&&session.results[id])return false;
 session.queue.splice(index,1);session.queue.unshift(id);session.reviewIndex=null;clearAnswer(session);
 return true;
}
export function finishSession(session) {
 if(session.ended)return;
 session.reviewIndex=null;
 if(session.mode==='quiz'&&session.answer!==null)advanceSession(session,session.answer==='correct');
 session.ended=true;session.endedAt=Date.now();
}
export function examScore(session) {
 const answers=session.results||{},correct=session.ids.filter(id=>answers[id]?.correct===true).length;
 const answered=session.ids.filter(id=>answers[id]).length,total=session.ids.length;
 return {correct,wrong:answered-correct,open:total-answered,total,percent:Math.round(correct/Math.max(1,total)*1000)/10};
}
export function cleanState(raw, validIds) {
 const valid=new Set(validIds),obj=raw&&typeof raw==='object'?raw:{};
 const array=k=>Array.isArray(obj[k])?[...new Set(obj[k].filter(x=>valid.has(x)))]:[];
 const number=n=>Number.isFinite(n)?Math.max(0,Math.floor(n)):0;
 const choice=n=>Number.isInteger(n)&&n>=0&&n<4?n:null;
 const order=a=>Array.isArray(a)&&a.length===4&&new Set(a).size===4&&a.every(n=>choice(n)!==null)?[...a]:null;
 const stats={}; if(obj.stats&&typeof obj.stats==='object')for(const [id,v]of Object.entries(obj.stats))if(valid.has(id)&&v&&typeof v==='object')stats[id]={correct:number(v.correct),wrong:number(v.wrong),lastWrong:v.lastWrong===true};
 let session=null;const s=obj.session;
 if(s&&['cards','quiz'].includes(s.mode)&&Array.isArray(s.ids)&&Array.isArray(s.queue)&&Array.isArray(s.done)){
 const ids=[...new Set(s.ids.filter(x=>valid.has(x)))],queue=s.queue.filter(x=>ids.includes(x)),done=[...new Set(s.done.filter(x=>ids.includes(x)))];
 if(ids.length&&queue.length===new Set(queue).size&&!queue.some(x=>done.includes(x))&&ids.length===queue.length+done.length){
 const history=Array.isArray(s.history)?s.history.filter(e=>e&&ids.includes(e.id)&&['correct','wrong','skipped'].includes(e.answer)).slice(-1000).map(e=>({id:e.id,answer:e.answer,selected:choice(e.selected),choiceOrder:order(e.choiceOrder)})):[];
 const results={};if(s.mode==='quiz'&&s.kind==='exam'&&s.results&&typeof s.results==='object')for(const [id,v]of Object.entries(s.results))if(ids.includes(id)&&v&&typeof v.correct==='boolean')results[id]={correct:v.correct,selected:choice(v.selected)};
 session={mode:s.mode,ordering:s.ordering==='sorted'?'sorted':'mixed',kind:s.mode==='quiz'&&s.kind==='exam'?'exam':'practice',ids,queue,done,original:s.original===true,attempts:number(s.attempts),errors:number(s.errors),skips:number(s.skips),answer:['wrong','correct'].includes(s.answer)?s.answer:null,choiceOrder:order(s.choiceOrder),selected:choice(s.selected),history,reviewIndex:Number.isInteger(s.reviewIndex)&&s.reviewIndex>=0&&s.reviewIndex<history.length?s.reviewIndex:null,results,ended:s.ended===true,started:number(s.started)||Date.now(),endedAt:number(s.endedAt)};
 }
 }
 return {version:VERSION,simpleLanguage:obj.simpleLanguage===true,roundOrder:obj.roundOrder==='sorted'?'sorted':'mixed',known:array('known'),bookmarks:array('bookmarks'),stats,session,theme:['system','light','dark'].includes(obj.theme)?obj.theme:'system',motion:obj.motion!==false};
}
