// Growth Engine Walk-Through: the interactive worksheet behind /cai-growth.
// Vanilla DOM app from the client's cai-growth.html handoff (eight "functions":
// ICP, uniques, one-liner, stages, qualification bar, 30-day plan, drill, export),
// state in localStorage (ge_state_v1). Mounted from src/pages/cai-growth.astro,
// which renders the shell (#ge-root, #ge-app, masthead buttons). Styles:
// src/styles/growth-engine.css. The Cameron card + book club form come from
// src/lib/book-club-form.js (shared with the /book-club landing page).
// Kept as plain JS on purpose: the handoff is ES5-style and it is not worth a
// strict-TS rewrite. @ts-nocheck keeps `astro check` out of it.
// @ts-nocheck
import { el, copyText, CALENDAR_URL, ctaCall, ctaBookClub } from "./book-club-form.js";
(function(){
"use strict";

/* ---------------------------------------------------------------- state */
var BLANK = {
  firm:{assoc:"",routes:"",bd:""},
  icp:{clones:"",easy:"",regret:"",dims:[],geo:"",solve:"",evidence:""},
  uniques:{candidates:"",kept:[]},
  one:{who:"",pain:"",outcome:"",without:"",followup:"",hero:""},
  stages:{list:null,home:""},
  qual:{anchors:null,floor:12,dq:"",decline:"",testScore:null},
  plan:{number:"",owner:"",proof:"",week:["","",""],weeks:null,one:"",date:"",blocker:""},
  drill:{asked:0,correct:0,weak:[],sessions:0},
  status:{}
};
var S = load();
function load(){
  try{
    var raw = localStorage.getItem("ge_state_v1");
    if(raw){ var o = JSON.parse(raw); return Object.assign(JSON.parse(JSON.stringify(BLANK)), o); }
  }catch(e){}
  return JSON.parse(JSON.stringify(BLANK));
}
function save(){ try{ localStorage.setItem("ge_state_v1", JSON.stringify(S)); }catch(e){} }

/* ---------------------------------------------------------------- content */
var SAMENESS = ["responsive","communication","we care","caring","experienced","local","professional","full-service","full service","boutique","family-owned","family owned","proactive","transparent","dedicated","passionate","white-glove","white glove","partnership"];

var FUNCTIONS = [
  {id:"icp",   n:1, title:"My ICP",               sub:"who you are best for, and who you are not", min:8},
  {id:"uniques",n:2,title:"My three uniques",     sub:"claims a competitor could not honestly make", min:10},
  {id:"one",   n:3, title:"My one-liner",         sub:"one sentence a board member would repeat", min:7},
  {id:"stages",n:4, title:"My stages",            sub:"six stages, each with one fact to advance", min:8},
  {id:"qual",  n:5, title:"My qualification bar", sub:"six criteria, a floor, one disqualifier", min:8},
  {id:"plan",  n:6, title:"My 30-day plan",       sub:"Monday, this week, five weeks, one commitment", min:9},
  {id:"drill", n:7, title:"Drill me",             sub:"quiz yourself or your team on any of it", min:5},
  {id:"export",n:8, title:"Review and export",    sub:"assemble it all into one playbook", min:3}
];

var DEFAULT_STAGES = [
  {name:"Identified",     fact:"Named community, inside a route we serve, contract end date known or asked for"},
  {name:"Qualified",      fact:"Scored at or above our floor, no automatic disqualifier present"},
  {name:"Discovery done", fact:"The six discovery answers in writing, including the notice window"},
  {name:"Proposal out",   fact:"Proposal delivered to a named decision path, board decision date on our calendar"},
  {name:"Decision",       fact:"Board has voted, or told us the date they will"},
  {name:"Won / Lost",     fact:"Signed, or a loss reason captured in the board's own words"}
];

var CRITERIA = [
  {k:"Board readiness",   q:"A real decision process, or one frustrated person?"},
  {k:"Route and density", q:"Can a manager already in that area serve it?"},
  {k:"Financial condition",q:"Aged AR, delinquency, reserve study, open litigation"},
  {k:"Pain level",        q:"Genuinely broken, or irritation that will pass?"},
  {k:"Timeline",          q:"A contract end date and a notice window you can still hit"},
  {k:"Culture fit",       q:"Would your manager be set up to succeed here?"}
];

var DQ_OPTIONS = [
  "Notice window already passed for this contract year",
  "Board in active litigation with the prior manager",
  "Outside any current route by more than our stated limit",
  "The board will not name a decision process",
  "Requires on-site staff we do not employ"
];

var WEEK_ITEMS = [
  {t:"Set the weekly review", d:"30 minutes, same day, same agenda: what moved, what didn't, who do I call"},
  {t:"Build the list",        d:"10 to 15 named communities, with contract end and notice dates"},
  {t:"Map your stages",       d:"Six stages live wherever your seven fields live"},
  {t:"Set the follow-up standard", d:"5 touches over 30 days, then one honest closing note, then diaried"},
  {t:"Build the handoff page",d:"Discovery answers, what was promised out loud, inclusions, board personalities"}
];

/* method deck: fixed questions, three difficulty levels */
var DECK_B = [
  {lvl:1, q:"What makes something an exit fact rather than an opinion?",
   opts:["Someone who was not in the meeting could verify it","The rep is confident about it","It is written in the CRM","The board sounded positive"],
   a:0, why:"An exit fact is checkable by a third party. That is the whole test.",
   hint:"Think about who has to be able to confirm it."},
  {lvl:1, q:"A firm says it is 'responsive and local.' What is that?",
   opts:["Table stakes","A unique","A positioning statement","A value proposition"],
   a:0, why:"Every firm in the room says it, so it differentiates nobody.",
   hint:"Would a competitor's brochure say the same thing?"},
  {lvl:1, q:"Which belongs in the 'without' clause of a one-liner?",
   opts:["The tradeoff the board is afraid of","Your years in business","Your software","Your service menu"],
   a:0, why:"A board's real question is what they lose by switching. Answer it in the sentence.",
   hint:"It is about their fear, not your features."},
  {lvl:2, q:"A board says 'send us a proposal.' What does that usually mean?",
   opts:["They are already frustrated with someone","They are ready to buy","They want a price comparison","Nothing, it is routine"],
   a:0, why:"It is a symptom, not a starting point. Discovery still has to happen.",
   hint:"Ask what happened right before they called you."},
  {lvl:2, q:"Which question kills the most deals when it goes unasked?",
   opts:["When does the contract end, and what is the notice window","How many doors","Who is on the board","What software do you use"],
   a:0, why:"If the notice window passed, you are selling next year, and everything else is wasted effort.",
   hint:"It is the one about time."},
  {lvl:2, q:"Why is fit a margin strategy rather than a preference?",
   opts:["A bad-fit account consumes manager capacity your best communities needed","It makes the brand look premium","It reduces marketing cost","It improves close rate"],
   a:0, why:"Capacity is the real constraint. A bad fit spends it twice.",
   hint:"Think about what the account costs after it is signed."},
  {lvl:3, q:"A unique passes the competitor test and the board-repeat test, but operations can only deliver it on a good week. What is it?",
   opts:["A goal, not a unique","A unique with a caveat","Still a unique if sales explains it","A marketing claim worth making"],
   a:0, why:"Promises made in a meeting become obligations on day 91. Two of three tests is a goal.",
   hint:"Count the tests it actually passed."},
  {lvl:3, q:"You score an opportunity at 11 against a floor of 12, and it is the best-fit property you have seen all year. What is the honest move?",
   opts:["Name what is missing and decide deliberately, in writing","Take it, the floor is a guideline","Decline automatically","Lower the floor"],
   a:0, why:"The floor exists so the exception is a decision with a reason attached, not a drift.",
   hint:"The point of the bar is not automation, it is honesty."},
  {lvl:3, q:"Your firm wins a community that nobody from your company ever met with. What did the win most likely come from?",
   opts:["Reputation and referral, built before the call","Your proposal template","Your website","A low number"],
   a:0, why:"Most of the decision happens when you are not in the room. That is why growth is a team sport.",
   hint:"Who was in the room when they decided?"}
];

var ROLEPLAY = [
  {who:"Board president, first meeting", line:"We already have a management company. Why would we switch?",
   rubric:["Named who you are best for","Named the pain in their words","Named an outcome, not a feature","Said what they do NOT lose by switching"]},
  {who:"Treasurer, skeptical", line:"Everyone tells us they are responsive. What makes you different?",
   rubric:["Gave a specific, checkable claim","Offered proof a board could verify","Did not use a table-stakes word","Named who owns it internally"]},
  {who:"Association attorney, over coffee", line:"What kind of communities should I be sending you?",
   rubric:["Named the community type and size","Named the geography or route","Named what you solve better","Named who you are NOT for"]}
];

/* ---------------------------------------------------------------- helpers */
var root = document.getElementById("ge-root");
var app = document.getElementById("ge-app");
var view = {name:"menu", data:null};

function go(name, data){ view = {name:name, data:data||null}; render(); window.scrollTo({top:0,behavior:"instant"}); }
function statusOf(id){ return S.status[id] || ""; }
function doneCount(){ return ["icp","uniques","one","stages","qual","plan"].filter(function(k){return S.status[k]==="done";}).length; }
function suggestNext(){
  var order = ["icp","uniques","one","qual","stages","plan"];
  for(var i=0;i<order.length;i++){ if(statusOf(order[i])!=="done") return order[i]; }
  return "export";
}
function reason(id){
  return {icp:"start here",uniques:"your ICP is set",one:"uniques are fresh",qual:"you have an ICP",
          stages:"bar is written",plan:"turn it into action",export:"everything is built"}[id] || "";
}
function has(id){
  if(id==="icp") return !!(S.icp.solve || S.icp.geo);
  if(id==="uniques") return S.uniques.kept.length>0;
  if(id==="one") return !!S.one.who;
  if(id==="stages") return !!S.stages.list;
  if(id==="qual") return !!S.qual.dq;
  if(id==="plan") return !!S.plan.number;
  return false;
}
function samenessIn(text){
  var low = (text||"").toLowerCase(), hits = [];
  SAMENESS.forEach(function(w){ if(low.indexOf(w)>-1 && hits.indexOf(w)<0) hits.push(w); });
  return hits;
}
/* ---------------------------------------------------------------- menu */
function renderMenu(){
  var next = suggestNext();
  var head = el("div",{class:"ge-stack ge-g12"},[
    el("h1",{text:"Build your growth playbook"}),
    el("p",{class:"ge-muted",html:"You leave with a written playbook for your firm, built from your answers, not from a template. All of it takes about 50 minutes. You can do one piece and come back: your work stays in this browser."})
  ]);
  var list = el("div",{class:"ge-fn-list"});
  FUNCTIONS.forEach(function(f){
    var st = statusOf(f.id);
    var meta;
    if(f.id==="drill"){
      var ready = ["icp","uniques","one","qual","plan"].filter(has).length;
      meta = ready ? "ready: "+ready+" built" : "method deck";
    } else if(f.id==="export"){
      meta = doneCount()+" of 6 done";
    } else {
      meta = f.min+" min";
    }
    var tags = el("div",{class:"ge-row",style:"gap:6px;justify-content:flex-end"});
    if(st==="done") tags.appendChild(el("span",{class:"ge-tag ge-done",text:"done"}));
    if(st==="draft") tags.appendChild(el("span",{class:"ge-tag ge-draft",text:"draft"}));
    if(f.id===next && st!=="done") tags.appendChild(el("span",{class:"ge-tag ge-next",text:"next"}));
    list.appendChild(el("button",{class:"ge-fn","data-state":st,type:"button",onclick:function(){ go(f.id); }},[
      el("span",{class:"ge-num",text:String(f.n)}),
      el("span",{},[
        el("span",{class:"ge-ttl",text:f.title}),
        el("span",{class:"ge-sub",text:f.sub + (f.id===next && st!=="done" ? "  ·  "+reason(f.id) : "")})
      ]),
      el("span",{class:"ge-meta"},[el("span",{text:meta}), tags])
    ]));
  });
  app.replaceChildren(el("div",{class:"ge-stack ge-g24"},[ head, list, closing(false) ]));
}

/* ---------------------------------------------------------------- generic wizard */
function wizard(opts){
  /* opts: {id, title, steps:[{q, help, render(box), valid()}], finish()} */
  var i = (view.data && view.data.step) || 0;
  var step = opts.steps[i];
  var box = el("div",{class:"ge-stack ge-g16"});
  step.render(box);

  var nextBtn = el("button",{class:"ge-btn",type:"button",text: i===opts.steps.length-1 ? "Finish" : "Next",onclick:function(){
    var problem = step.valid ? step.valid() : null;
    if(problem){ warn(problem); return; }
    save();
    if(i===opts.steps.length-1){ opts.finish(); }
    else go(opts.id,{step:i+1});
  }});
  var backBtn = el("button",{class:"ge-btn ge-ghost",type:"button",text:i===0?"Menu":"Back",onclick:function(){
    save(); if(i===0) go("menu"); else go(opts.id,{step:i-1});
  }});
  var warnBox = el("div",{class:"ge-stack ge-g8"});
  function warn(msg){
    warnBox.replaceChildren(el("div",{class:"ge-flag",html:msg}));
  }
  var pct = Math.round(((i)/opts.steps.length)*100);
  app.replaceChildren(el("div",{class:"ge-stack ge-g16"},[
    el("div",{class:"ge-crumb"},[
      el("span",{class:"ge-eyebrow",text:opts.title}),
      el("span",{class:"ge-counter",text:"question "+(i+1)+" of "+opts.steps.length})
    ]),
    el("div",{class:"ge-bar"},[el("i",{style:"width:"+pct+"%"})]),
    el("div",{class:"ge-card ge-stack ge-g16"},[
      el("div",{},[
        el("div",{class:"ge-qtext",text:step.q}),
        step.help ? el("div",{class:"ge-help",html:step.help}) : null
      ]),
      box, warnBox,
      el("div",{class:"ge-row"},[nextBtn, backBtn])
    ])
  ]));
}

function field(label, obj, key, ph, multi){
  var input = el(multi?"textarea":"input",{type:"text",placeholder:ph||"",value:obj[key]||"",
    oninput:function(e){ obj[key]=e.target.value; }});
  if(multi) input.value = obj[key]||"";
  return el("label",{class:"ge-fld"},[el("span",{text:label}), input]);
}

/* ---------------------------------------------------------------- 1. ICP */
function renderICP(){
  var DIMS = ["Community type","Size band","Geography and route","Complexity","Board profile","Condition"];
  wizard({
    id:"icp", title:"Function 1 · My ICP",
    steps:[
      {q:"Name three communities you manage that you would clone.",
       help:"Nicknames are fine. Start from your own book, not from the firm you want to be in three years.",
       render:function(b){ b.appendChild(field("Three communities", S.icp,"clones","Cypress Creek, Stonegate, Valle Alto")); },
       valid:function(){ return S.icp.clones.trim().length<3 ? "Give me at least one. The pattern in your best accounts <em>is</em> your ICP." : null; }},
      {q:"What makes those easy to serve well?",
       help:"Route, board, amenities, financial condition, the manager who covers them. Whatever is actually true.",
       render:function(b){ b.appendChild(field("What they have in common", S.icp,"easy","Tight route, engaged treasurer, amenities we know cold", true)); },
       valid:function(){ return S.icp.easy.trim().length<8 ? "A sentence is enough, but it has to say something specific." : null; }},
      {q:"Now the reverse. The last account you regret taking: what was true about it that you could have known before you signed?",
       help:"Do not name the community. Describe the condition. This becomes your not-for list.",
       render:function(b){ b.appendChild(field("What you could have known", S.icp,"regret","45 minutes off route, board split three ways, AR nobody disclosed", true)); },
       valid:function(){ return S.icp.regret.trim().length<8 ? "Everyone has one. Describing it is how it stops repeating." : null; }},
      {q:"Which two of these define fit in your market?",
       help:"Pick two. An ICP that includes everything is a brochure.",
       render:function(b){
         var row = el("div",{class:"ge-chips"});
         DIMS.forEach(function(d){
           var on = S.icp.dims.indexOf(d)>-1;
           row.appendChild(el("button",{class:"ge-chip",type:"button","aria-pressed":on?"true":"false",text:d,onclick:function(e){
             var idx = S.icp.dims.indexOf(d);
             if(idx>-1) S.icp.dims.splice(idx,1); else S.icp.dims.push(d);
             save(); go("icp",{step:3});
           }}));
         });
         b.appendChild(row);
       },
       valid:function(){ return S.icp.dims.length<1 ? "Pick at least one. Two is better." : (S.icp.dims.length>3 ? "Three is the ceiling. Which one matters least?" : null); }},
      {q:"Where do you draw the geographic line today?",
       help:"Not where you would go for the right deal. Where your routes actually work.",
       render:function(b){ b.appendChild(field("Your real footprint", S.icp,"geo","Inside Loop 1604 north and the 281 corridor")); },
       valid:function(){ return S.icp.geo.trim().length<3 ? "Name it. Route density is margin." : null; }},
      {q:"What community problem do you solve better than the firm across town?",
       help:"Specific enough that it would be embarrassing if it were not true.",
       render:function(b){ b.appendChild(field("What you solve better", S.icp,"solve","Amenity-heavy communities with a dedicated accountant per portfolio", true)); },
       valid:function(){
         if(S.icp.solve.trim().length<8) return "One sentence. The specific version, not the category.";
         var hits = samenessIn(S.icp.solve);
         if(hits.length && !S.icp._warned){ S.icp._warned=true; return "<strong>"+hits.join(", ")+"</strong> is table stakes. Every firm at the retreat said it. What is the checkable version? Tap Next again to keep what you wrote."; }
         return null; }},
      {q:"Name two communities you manage today that prove it.",
       help:"If you cannot name two, that claim is aspiration. We will keep it, labelled honestly.",
       render:function(b){ b.appendChild(field("Two names", S.icp,"evidence","Cypress Creek (420 doors, 6 yrs), Stonegate (310 doors, 4 yrs)")); },
       valid:function(){ return null; }}
    ],
    finish:function(){
      S.status.icp = (S.icp.evidence.trim() ? "done" : "draft");
      save(); go("artifact",{id:"icp"});
    }
  });
}

/* ---------------------------------------------------------------- 2. uniques */
function renderUniques(){
  var cands = (S.uniques.candidates||"").split("\n").map(function(s){return s.trim();}).filter(Boolean);
  var step = (view.data && view.data.step) || 0;

  if(step===0){
    var ta = el("textarea",{placeholder:"One per line. Five is plenty.",oninput:function(e){ S.uniques.candidates=e.target.value; }});
    ta.value = S.uniques.candidates||"";
    var live = el("div",{class:"ge-stack ge-g8"});
    ta.addEventListener("input",function(){
      var hits = samenessIn(ta.value);
      live.replaceChildren(hits.length
        ? el("div",{class:"ge-flag",html:"Flagged: <strong>"+hits.join(", ")+"</strong>. Those are table stakes. Keep writing, we will test each line next."})
        : el("div",{class:"ge-flag ge-ok",text:"No table-stakes words so far."}));
    });
    app.replaceChildren(el("div",{class:"ge-stack ge-g16"},[
      el("div",{class:"ge-crumb"},[el("span",{class:"ge-eyebrow",text:"Function 2 · My three uniques"}),el("span",{class:"ge-counter",text:"step 1 of 2"})]),
      el("div",{class:"ge-card ge-stack ge-g16"},[
        el("div",{},[el("div",{class:"ge-qtext",text:"Five things that are true about how your firm operates."}),
          el("div",{class:"ge-help",text:"Do not filter yet. Quantity first, we test them on the next screen."})]),
        ta, live,
        el("div",{class:"ge-row"},[
          el("button",{class:"ge-btn",type:"button",text:"Test these",onclick:function(){
            if((S.uniques.candidates||"").trim().length<4) return;
            save(); go("uniques",{step:1});
          }}),
          el("button",{class:"ge-btn ge-ghost",type:"button",text:"Menu",onclick:function(){ save(); go("menu"); }})
        ])
      ])
    ]));
    return;
  }

  /* step 1: three tests per candidate */
  var rows = el("div",{class:"ge-stack ge-g12"});
  cands.forEach(function(c, idx){
    var rec = S.uniques.kept.filter(function(k){return k.claim===c;})[0];
    if(!rec){ rec = {claim:c, t1:false, t2:false, t3:false, proof:"", owner:"", breaks:""}; S.uniques.kept.push(rec); }
    var tests = el("div",{class:"ge-chips"});
    [["t1","A competitor could NOT say this"],["t2","Ops delivers it every time"],["t3","A board would repeat it"]].forEach(function(t){
      tests.appendChild(el("button",{class:"ge-chip",type:"button","aria-pressed":rec[t[0]]?"true":"false",text:t[1],onclick:function(){
        rec[t[0]] = !rec[t[0]]; save(); go("uniques",{step:1});
      }}));
    });
    var passes = rec.t1 && rec.t2 && rec.t3;
    var detail = el("div",{class:"ge-stack ge-g8"});
    if(passes){
      detail.appendChild(field("Proof a board could check", rec,"proof","Named accountant on the portal and in the welcome packet"));
      detail.appendChild(el("div",{class:"ge-grid2"},[
        field("Who owns keeping it true", rec,"owner","Controller"),
        field("At what size does it break", rec,"breaks","About 60 communities per accountant")
      ]));
    }
    rows.appendChild(el("div",{class:"ge-card ge-stack ge-g12"},[
      el("div",{},[el("h3",{text:c}),
        samenessIn(c).length ? el("div",{class:"ge-small",style:"color:var(--accent)",text:"Table-stakes language. Sharpen it or drop it."}) : null]),
      tests,
      passes ? el("div",{class:"ge-flag ge-ok ge-small",text:"Passes all three. This one is real."}) :
        el("div",{class:"ge-flag ge-warn ge-small",text:"Two of three is a goal, not a unique. Keep it in the aspiration list."}),
      detail
    ]));
  });
  var keptCount = S.uniques.kept.filter(function(k){return k.t1&&k.t2&&k.t3;}).length;
  app.replaceChildren(el("div",{class:"ge-stack ge-g16"},[
    el("div",{class:"ge-crumb"},[el("span",{class:"ge-eyebrow",text:"Function 2 · My three uniques"}),el("span",{class:"ge-counter",text:"step 2 of 2 · "+keptCount+" passing"})]),
    el("div",{class:"ge-help",html:"Three tests, all three have to pass. <strong>Would a competitor's brochure say it? Can ops deliver it every time? Would a board member repeat it?</strong>"}),
    rows,
    el("div",{class:"ge-row"},[
      el("button",{class:"ge-btn",type:"button",text:"Save uniques",onclick:function(){
        S.status.uniques = keptCount>=2 ? "done" : "draft"; save(); go("artifact",{id:"uniques"});
      }}),
      el("button",{class:"ge-btn ge-ghost",type:"button",text:"Back",onclick:function(){ save(); go("uniques",{step:0}); }})
    ])
  ]));
}

/* ---------------------------------------------------------------- 3. one-liner */
function renderOne(){
  function sentence(){
    return "We help "+(S.one.who||"[ who you are best for ]")+
      " who are frustrated by "+(S.one.pain||"[ the pain ]")+
      " get "+(S.one.outcome||"[ the outcome ]")+
      " without "+(S.one.without||"[ the tradeoff they fear ]")+".";
  }
  var live = el("div",{class:"ge-artifact",text:sentence()});
  var count = el("div",{class:"ge-counter"});
  function tick(){
    var words = sentence().split(/\s+/).filter(Boolean).length;
    live.textContent = sentence();
    count.textContent = words+" words"+(words>35?"  ·  too long to repeat, cut it":"");
    count.style.color = words>35 ? "var(--accent)" : "var(--ink-soft)";
  }
  var fields = el("div",{class:"ge-stack ge-g12"},[
    field("Who you are best for", S.one,"who", S.icp.geo ? "suburban HOAs in "+S.icp.geo : "amenity-heavy suburban HOAs"),
    field("The pain, in the board's words", S.one,"pain","chasing their manager for answers"),
    field("The outcome they get", S.one,"outcome","financials they can read and same-day answers"),
    field("The tradeoff they fear", S.one,"without","moving to a call-center model"),
  ]);
  fields.addEventListener("input", tick);
  var extra = el("div",{class:"ge-stack ge-g12"},[
    field("The follow-up question this earns", S.one,"followup","How do you hold same-day response as you grow?"),
    field("Website version, five to nine words", S.one,"hero","Financials you can read. Answers the same day.")
  ]);
  app.replaceChildren(el("div",{class:"ge-stack ge-g16"},[
    el("div",{class:"ge-crumb"},[el("span",{class:"ge-eyebrow",text:"Function 3 · My one-liner"})]),
    el("div",{class:"ge-card ge-stack ge-g16"},[
      el("div",{},[el("div",{class:"ge-qtext",text:"One sentence a board member would repeat."}),
        el("div",{class:"ge-help",text:"Fill the four slots. The sentence builds as you type. Say it out loud before you save it: anything you stumble on gets cut."})]),
      fields, live, count,
      el("div",{class:"ge-flag ge-small",html:"The <strong>without</strong> clause does the work. A board's real question is not whether you are good, it is what they lose by switching."}),
      extra,
      el("div",{class:"ge-row"},[
        el("button",{class:"ge-btn",type:"button",text:"Save one-liner",onclick:function(){
          var words = sentence().split(/\s+/).filter(Boolean).length;
          S.status.one = (S.one.who && S.one.pain && S.one.outcome && S.one.without && words<=35) ? "done" : "draft";
          save(); go("artifact",{id:"one"});
        }}),
        el("button",{class:"ge-btn ge-ghost",type:"button",text:"Menu",onclick:function(){ save(); go("menu"); }})
      ])
    ])
  ]));
  tick();
}

/* ---------------------------------------------------------------- 4. stages */
function renderStages(){
  if(!S.stages.list) S.stages.list = JSON.parse(JSON.stringify(DEFAULT_STAGES));
  var rows = el("div",{class:"ge-stack ge-g12"});
  S.stages.list.forEach(function(st, i){
    rows.appendChild(el("div",{class:"ge-card ge-stack ge-g8"},[
      el("div",{class:"ge-row",style:"align-items:center;gap:10px"},[
        el("span",{class:"ge-counter",text:"Stage "+(i+1)}),
        el("input",{type:"text",value:st.name,style:"flex:1",oninput:function(e){ st.name=e.target.value; }})
      ]),
      el("label",{class:"ge-fld"},[el("span",{text:"One fact that must be true to advance"}),
        el("input",{type:"text",value:st.fact,oninput:function(e){ st.fact=e.target.value; }})])
    ]));
  });
  app.replaceChildren(el("div",{class:"ge-stack ge-g16"},[
    el("div",{class:"ge-crumb"},[el("span",{class:"ge-eyebrow",text:"Function 4 · My stages"})]),
    el("div",{class:"ge-card ge-stack ge-g12"},[
      el("div",{class:"ge-qtext",text:"Six stages, each with one fact you could verify by phone."}),
      el("div",{class:"ge-help",html:"These are the defaults. Rename them to match how you already talk. If an exit fact contains <em>feels</em>, <em>seems</em>, or <em>interested</em>, it is not a fact."})
    ]),
    rows,
    el("div",{class:"ge-card ge-stack ge-g8"},[
      field("Where the seven fields live", S.stages,"home","A tab in the shared spreadsheet called Pipeline"),
      el("div",{class:"ge-small ge-muted",text:"Seven fields: community name, stage, doors, lead source, board decision date, next step, owner."})
    ]),
    el("div",{class:"ge-row"},[
      el("button",{class:"ge-btn",type:"button",text:"Save stages",onclick:function(){
        S.status.stages = S.stages.home ? "done" : "draft"; save(); go("artifact",{id:"stages"});
      }}),
      el("button",{class:"ge-btn ge-ghost",type:"button",text:"Menu",onclick:function(){ save(); go("menu"); }})
    ])
  ]));
}

/* ---------------------------------------------------------------- 5. qualification */
function renderQual(){
  if(!S.qual.anchors) S.qual.anchors = CRITERIA.map(function(c){ return {k:c.k, q:c.q}; });
  var floorOut = el("span",{class:"ge-counter",text:S.qual.floor+" of 18"});
  var slider = el("input",{type:"range",min:"6",max:"18",value:String(S.qual.floor),style:"width:100%",
    oninput:function(e){ S.qual.floor = +e.target.value; floorOut.textContent = S.qual.floor+" of 18"; }});
  var dqWrap = el("div",{class:"ge-stack ge-g8"});
  DQ_OPTIONS.concat(["Something else"]).forEach(function(o){
    dqWrap.appendChild(el("button",{class:"ge-opt",type:"button",text:o,onclick:function(){
      S.qual.dq = (o==="Something else") ? (S.qual.dq && DQ_OPTIONS.indexOf(S.qual.dq)<0 ? S.qual.dq : "") : o;
      S.qual.decline = S.qual.decline || declineDraft();
      save(); go("qual");
    }, style: S.qual.dq===o ? "border-color:var(--accent)" : ""}));
  });
  function declineDraft(){
    return "Based on what you have described, we are not the right fit. I would rather tell you now than in month four. Here is who I would talk to instead.";
  }
  var custom = (S.qual.dq && DQ_OPTIONS.indexOf(S.qual.dq)<0) || S.qual.dq==="";
  app.replaceChildren(el("div",{class:"ge-stack ge-g16"},[
    el("div",{class:"ge-crumb"},[el("span",{class:"ge-eyebrow",text:"Function 5 · My qualification bar"})]),
    el("div",{class:"ge-card ge-stack ge-g12"},[
      el("div",{class:"ge-qtext",text:"Six criteria, scored 1 to 3."}),
      el("div",{class:"ge-help",text:"Written down before you need it, because in the moment, with a manager seat open and a board on the phone, nobody scores honestly."}),
      el("div",{class:"ge-stack"}, CRITERIA.map(function(c){
        return el("div",{class:"ge-scorerow"},[
          el("div",{},[el("strong",{text:c.k}), el("div",{class:"ge-small ge-muted",text:c.q})]),
          el("span",{class:"ge-counter",text:"1 to 3"})
        ]);
      }))
    ]),
    el("div",{class:"ge-card ge-stack ge-g12"},[
      el("h3",{text:"Your floor"}),
      el("div",{class:"ge-help",text:"Many firms land near 12. Pick yours: a floor you did not choose is a floor you will not hold."}),
      slider, floorOut
    ]),
    el("div",{class:"ge-card ge-stack ge-g12"},[
      el("h3",{text:"One automatic disqualifier"}),
      el("div",{class:"ge-help",text:"One, not five. A list of five is a list nobody applies."}),
      dqWrap,
      custom ? field("Write your own", S.qual,"dq","No notice window we can still hit this contract year") : null
    ]),
    el("div",{class:"ge-card ge-stack ge-g12"},[
      el("h3",{text:"The decline, out loud"}),
      el("div",{class:"ge-help",text:"Edit this into your own words. Referring a bad fit to a competitor who is right for it is the cheapest reputation you will ever buy."}),
      (function(){ var t = el("textarea",{oninput:function(e){ S.qual.decline=e.target.value; }}); t.value = S.qual.decline || declineDraft(); S.qual.decline = t.value; return t; })()
    ]),
    el("div",{class:"ge-row"},[
      el("button",{class:"ge-btn",type:"button",text:"Save the bar",onclick:function(){
        S.status.qual = S.qual.dq ? "done" : "draft"; save(); go("artifact",{id:"qual"});
      }}),
      el("button",{class:"ge-btn ge-ghost",type:"button",text:"Menu",onclick:function(){ save(); go("menu"); }})
    ])
  ]));
}

/* ---------------------------------------------------------------- 6. plan */
function renderPlan(){
  if(!S.plan.weeks) S.plan.weeks = WEEK_ITEMS.map(function(w){ return {t:w.t, d:w.d, owner:""}; });
  var weeks = el("div",{class:"ge-stack ge-g8"});
  S.plan.weeks.forEach(function(w,i){
    weeks.appendChild(el("div",{class:"ge-scorerow"},[
      el("div",{},[el("strong",{text:"Week "+(i+1)+": "+w.t}), el("div",{class:"ge-small ge-muted",text:w.d})]),
      el("input",{type:"text",placeholder:"owner",value:w.owner,style:"width:110px",oninput:function(e){ w.owner=e.target.value; }})
    ]));
  });
  app.replaceChildren(el("div",{class:"ge-stack ge-g16"},[
    el("div",{class:"ge-crumb"},[el("span",{class:"ge-eyebrow",text:"Function 6 · My 30-day plan"})]),
    el("div",{class:"ge-card ge-stack ge-g12"},[
      el("div",{class:"ge-qtext",text:"Monday, 20 minutes: put a stake in the ground on response time."}),
      el("div",{class:"ge-help",text:"The cheapest differentiator in this industry. It costs nothing and it is measurable."}),
      el("div",{class:"ge-grid2"},[
        field("The number", S.plan,"number","4 business hours"),
        field("Who owns first touch", S.plan,"owner","Cam"),
        field("How you will know", S.plan,"proof","Logged in the shared inbox")
      ])
    ]),
    el("div",{class:"ge-card ge-stack ge-g12"},[
      el("h3",{text:"This week, three things"}),
      el("div",{class:"ge-stack ge-g8"},[
        field("1", S.plan.week,"0","Every contract end date in one calendar"),
        field("2", S.plan.week,"1","Log win and loss reasons, in their words"),
        field("3", S.plan.week,"2","Finish the one-liner and send it to the team")
      ])
    ]),
    el("div",{class:"ge-card ge-stack ge-g12"},[ el("h3",{text:"Then one per week, all of it optional"}), weeks ]),
    el("div",{class:"ge-card ge-stack ge-g12"},[
      el("h3",{text:"The one thing"}),
      el("div",{class:"ge-help",text:"One commitment. A company that does one of these completely beats a company that starts eight."}),
      el("div",{class:"ge-grid2"},[
        field("By when", S.plan,"date","Friday the 24th"),
        field("I will", S.plan,"one","Publish the four-hour response standard")
      ]),
      field("What is going to stop you", S.plan,"blocker","Thursday board meetings eat my afternoons")
    ]),
    el("div",{class:"ge-row"},[
      el("button",{class:"ge-btn",type:"button",text:"Save the plan",onclick:function(){
        S.status.plan = (S.plan.number && S.plan.one) ? "done" : "draft"; save(); go("artifact",{id:"plan"});
      }}),
      el("button",{class:"ge-btn ge-ghost",type:"button",text:"Menu",onclick:function(){ save(); go("menu"); }})
    ])
  ]));
}

/* ---------------------------------------------------------------- artifacts */
function artifactText(id){
  var L = [];
  if(id==="icp"){
    L.push("YOUR ICP");
    L.push("");
    L.push("Best for: "+(S.icp.dims.join(", ")||"(not set)"));
    L.push("Footprint: "+(S.icp.geo||"(not set)"));
    L.push("What we solve better: "+(S.icp.solve||"(not set)"));
    L.push("Proof: "+(S.icp.evidence||"ASPIRATION, not yet proven"));
    L.push("");
    L.push("Not for: "+(S.icp.regret||"(not set)"));
    L.push("");
    L.push("Pattern in our best accounts: "+(S.icp.easy||""));
  }
  if(id==="uniques"){
    L.push("YOUR UNIQUES"); L.push("");
    var pass = S.uniques.kept.filter(function(k){return k.t1&&k.t2&&k.t3;});
    pass.forEach(function(k,i){
      L.push((i+1)+". "+k.claim);
      L.push("   Proof: "+(k.proof||"(not set)"));
      L.push("   Owner: "+(k.owner||"(not set)")+"   Breaks at: "+(k.breaks||"(not set)"));
      L.push("");
    });
    var fail = S.uniques.kept.filter(function(k){return !(k.t1&&k.t2&&k.t3);});
    if(fail.length){
      L.push("Table stakes we will stop leading with:");
      fail.forEach(function(k){ L.push("   - "+k.claim); });
    }
  }
  if(id==="one"){
    L.push("YOUR ONE-LINER"); L.push("");
    L.push("We help "+(S.one.who||"[ who ]")+" who are frustrated by "+(S.one.pain||"[ pain ]")+
           " get "+(S.one.outcome||"[ outcome ]")+" without "+(S.one.without||"[ tradeoff ]")+".");
    L.push("");
    L.push("Website version: "+(S.one.hero||"(not set)"));
    L.push("Follow-up question it earns: "+(S.one.followup||"(not set)"));
  }
  if(id==="stages"){
    L.push("YOUR STAGES"); L.push("");
    (S.stages.list||DEFAULT_STAGES).forEach(function(st,i){
      L.push((i+1)+". "+st.name);
      L.push("   Advances when: "+st.fact);
    });
    L.push("");
    L.push("Seven fields live in: "+(S.stages.home||"(not set)"));
    L.push("Fields: community, stage, doors, lead source, board decision date, next step, owner");
  }
  if(id==="qual"){
    L.push("YOUR QUALIFICATION BAR"); L.push("");
    CRITERIA.forEach(function(c,i){ L.push((i+1)+". "+c.k+" · "+c.q); });
    L.push("");
    L.push("Floor: "+S.qual.floor+" of 18");
    L.push("Automatic disqualifier: "+(S.qual.dq||"(not set)"));
    L.push("");
    L.push("The decline, out loud:");
    L.push("\""+(S.qual.decline||"")+"\"");
  }
  if(id==="plan"){
    L.push("YOUR 30-DAY PLAN"); L.push("");
    L.push("MONDAY, 20 MINUTES");
    L.push("Response standard: "+(S.plan.number||"(not set)")+"   Owner: "+(S.plan.owner||"(not set)"));
    L.push("How we will know: "+(S.plan.proof||"(not set)"));
    L.push("");
    L.push("THIS WEEK");
    S.plan.week.forEach(function(w,i){ if(w) L.push("  "+(i+1)+". "+w); });
    L.push("");
    L.push("THEN, ONE PER WEEK");
    (S.plan.weeks||[]).forEach(function(w,i){ L.push("  Week "+(i+1)+": "+w.t+(w.owner?"  ("+w.owner+")":"")); });
    L.push("");
    L.push("THE ONE THING");
    L.push("By "+(S.plan.date||"[ date ]")+", I will "+(S.plan.one||"[ one thing ]")+", and "+(S.plan.owner||"[ name ]")+" will own it.");
    if(S.plan.blocker) L.push("What will stop me: "+S.plan.blocker);
  }
  return L.join("\n");
}

function renderArtifact(){
  var id = view.data.id;
  var f = FUNCTIONS.filter(function(x){return x.id===id;})[0];
  var txt = artifactText(id);
  var pre = el("pre",{class:"ge-artifact",text:txt});
  var copyBtn = el("button",{class:"ge-btn ge-ghost",type:"button",text:"Copy",onclick:function(){ copyText(txt, copyBtn); }});
  var nxt = suggestNext();
  var nf = FUNCTIONS.filter(function(x){return x.id===nxt;})[0];
  app.replaceChildren(el("div",{class:"ge-stack ge-g16"},[
    el("div",{class:"ge-crumb"},[el("span",{class:"ge-eyebrow",text:"Saved · "+f.title})]),
    el("div",{class:"ge-stack ge-g12"},[ pre, el("div",{class:"ge-row"},[copyBtn,
      el("button",{class:"ge-btn ge-ghost",type:"button",text:"Edit this",onclick:function(){ go(id); }}),
      el("button",{class:"ge-btn ge-ghost",type:"button",text:"Clear this section",onclick:function(){
        clearSection(id); go("menu");
      }})]) ]),
    el("div",{class:"ge-row"},[
      nf ? el("button",{class:"ge-btn",type:"button",text:"Next: "+nf.title+" ("+nf.min+" min)",onclick:function(){ go(nf.id); }}) : null,
      el("button",{class:"ge-btn ge-ghost",type:"button",text:"Back to the menu",onclick:function(){ go("menu"); }})
    ])
  ]));
}

/* ---------------------------------------------------------------- 7. drill */
function deckA(){
  var qs = [];
  if(S.qual.dq){
    var distract = DQ_OPTIONS.filter(function(o){return o!==S.qual.dq;}).slice(0,3);
    qs.push({lvl:1, q:"What is your automatic disqualifier?", opts:[S.qual.dq].concat(distract), a:0,
      why:"That is the one that overrides the score, whatever the total.", hint:"Only one of these is yours.",
      shuffle:true});
    qs.push({lvl:2, q:"A 320-door community inside your route scores "+(S.qual.floor-1)+" against your floor of "+S.qual.floor+", and your disqualifier is not present. What is the honest move?",
      opts:["Name what is missing and decide deliberately, in writing","Take it, you have the capacity question covered","Decline without discussion","Lower the floor to "+(S.qual.floor-1)],
      a:0, why:"The floor makes the exception a decision with a reason attached instead of a drift.",
      hint:"The bar is for honesty, not automation."});
  }
  if(S.one.who){
    qs.push({lvl:1, q:"Who does your one-liner say you are best for?", opts:[S.one.who,"Any community that values service","Boards that want the lowest price","Communities in growth markets"], a:0,
      why:"Specific beats broad. That is the whole reason the sentence works.", hint:"It is the one you wrote.", shuffle:true});
  }
  if(S.one.without){
    qs.push({lvl:2, q:"What tradeoff does your one-liner promise they will NOT have to make?", opts:[S.one.without,"Paying more for service","Changing their governing documents","Replacing their board"], a:0,
      why:"The without clause answers the real question: what do we lose if we switch.", hint:"It is the fear, not the feature.", shuffle:true});
  }
  var pass = S.uniques.kept.filter(function(k){return k.t1&&k.t2&&k.t3;});
  if(pass.length){
    qs.push({lvl:1, q:"Which of these is one of your uniques?", opts:[pass[0].claim,"We are responsive and local","We have experienced managers","We care about our communities"], a:0,
      why:"The other three are table stakes. Every firm says them.", hint:"Three of these could be any firm."});
    if(pass[0].breaks){
      qs.push({lvl:3, q:"At what point does \""+pass[0].claim.slice(0,48)+(pass[0].claim.length>48?"…":"")+"\" break?",
        opts:[pass[0].breaks,"It does not break","When a competitor copies it","When the board changes"], a:0,
        why:"Knowing the breaking point is your early warning for growth that breaks the promise.", hint:"You wrote this one down.", shuffle:true});
    }
  }
  if(S.plan.number){
    qs.push({lvl:1, q:"What is your first-touch response standard?", opts:[S.plan.number,"Within 24 hours","Same week","As fast as we can"], a:0,
      why:"A number someone owns is the difference between a standard and a slogan.", hint:"You picked a number.", shuffle:true});
  }
  if(S.stages.list){
    qs.push({lvl:2, q:"Stage 1 is \""+S.stages.list[0].name+"\". What has to be true to leave it?",
      opts:[S.stages.list[0].fact,"The board seems interested","We had a good call","The community is a fit"], a:0,
      why:"An exit fact is verifiable by someone who was not in the meeting.", hint:"Three of these are feelings."});
  }
  return qs;
}

function renderDrill(){
  var d = view.data || {};
  if(!d.deck){
    var ready = ["icp","uniques","one","qual","plan","stages"].filter(has).length;
    app.replaceChildren(el("div",{class:"ge-stack ge-g16"},[
      el("div",{class:"ge-crumb"},[el("span",{class:"ge-eyebrow",text:"Function 7 · Drill"})]),
      el("div",{class:"ge-card ge-stack ge-g12"},[
        el("div",{class:"ge-qtext",text:"Which deck?"}),
        el("div",{class:"ge-help",text:"One question at a time. Miss one and you get a hint, not the answer. After five correct you get a read on where you are strong and where you are not."}),
        el("div",{class:"ge-stack ge-g8"},[
          el("button",{class:"ge-opt",type:"button",onclick:function(){ go("drill",{deck:"A",i:0,lvl:1,correct:0,asked:0,miss:0,weak:[]}); },
            html:"<strong>Your playbook</strong><br><span class='ge-small ge-muted'>"+(ready? "Built from what you wrote. "+ready+" sections ready." : "Nothing built yet, this one is empty")+"</span>"}),
          el("button",{class:"ge-opt",type:"button",onclick:function(){ go("drill",{deck:"B",i:0,lvl:1,correct:0,asked:0,miss:0,weak:[]}); },
            html:"<strong>The method</strong><br><span class='ge-small ge-muted'>The thinking behind it. Hand this to a manager or a new BD hire.</span>"}),
          el("button",{class:"ge-opt",type:"button",onclick:function(){ go("drill",{deck:"C",i:0}); },
            html:"<strong>Role-play</strong><br><span class='ge-small ge-muted'>I play the board. You answer out loud, then score yourself.</span>"})
        ]),
        el("div",{class:"ge-row"},[el("button",{class:"ge-btn ge-ghost",type:"button",text:"Menu",onclick:function(){ go("menu"); }})])
      ])
    ]));
    return;
  }
  if(d.deck==="C") return renderRoleplay(d);

  var bank = d.deck==="A" ? deckA() : DECK_B;
  if(!bank.length){
    app.replaceChildren(el("div",{class:"ge-stack ge-g16"},[
      el("div",{class:"ge-card ge-stack ge-g12"},[
        el("div",{class:"ge-qtext",text:"Nothing to drill yet."}),
        el("div",{class:"ge-help",text:"This deck is built from your own answers. Build one section first, or take the method deck instead."}),
        el("div",{class:"ge-row"},[
          el("button",{class:"ge-btn",type:"button",text:"Start with my ICP",onclick:function(){ go("icp"); }}),
          el("button",{class:"ge-btn ge-ghost",type:"button",text:"The method deck",onclick:function(){ go("drill",{deck:"B",i:0,lvl:1,correct:0,asked:0,miss:0,weak:[]}); }})
        ])
      ])
    ]));
    return;
  }

  /* pick a question at or near the current level that has not been asked */
  var pool = bank.filter(function(q,i){ return (d.seen||[]).indexOf(i)<0; });
  if(!pool.length || d.correct>=5 || d.asked>=10) return drillSummary(d, bank);
  var atLevel = pool.filter(function(q){ return q.lvl===d.lvl; });
  var q = (atLevel[0] || pool[0]);
  var qi = bank.indexOf(q);

  var opts = q.opts.map(function(t,i){ return {t:t, right:i===q.a}; });
  if(q.shuffle && !d.shuffled){ opts.sort(function(){ return Math.random()-0.5; }); }
  var feedback = el("div",{class:"ge-stack ge-g8"});
  var optWrap = el("div",{class:"ge-stack ge-g8"});
  opts.forEach(function(o){
    var b = el("button",{class:"ge-opt",type:"button",text:o.t,onclick:function(){
      if(o.right){
        b.setAttribute("data-pick","right");
        feedback.replaceChildren(el("div",{class:"ge-flag ge-ok",html:"<strong>Right.</strong> "+q.why}));
        optWrap.querySelectorAll("button").forEach(function(x){ x.disabled = true; });
        feedback.appendChild(el("button",{class:"ge-btn",type:"button",text:"Next question",onclick:function(){
          var seen = (d.seen||[]).concat([qi]);
          go("drill",{deck:d.deck,i:d.i+1,lvl:Math.min(3,d.lvl + (d.miss?0:1)),correct:d.correct+1,asked:d.asked+1,miss:0,seen:seen,weak:d.weak});
        }}));
      } else {
        b.setAttribute("data-pick","wrong");
        if(d.miss===0){
          d.miss = 1;
          feedback.replaceChildren(el("div",{class:"ge-flag ge-warn",html:"<strong>Not that one.</strong> "+(q.hint||"Look at it again.")+" Try again."}));
        } else {
          var right = opts.filter(function(x){return x.right;})[0].t;
          feedback.replaceChildren(el("div",{class:"ge-flag",html:"<strong>The answer is:</strong> "+right+"<br>"+q.why}));
          optWrap.querySelectorAll("button").forEach(function(x){ x.disabled = true; });
          feedback.appendChild(el("button",{class:"ge-btn",type:"button",text:"Next question",onclick:function(){
            var seen = (d.seen||[]).concat([qi]);
            go("drill",{deck:d.deck,i:d.i+1,lvl:Math.max(1,d.lvl-1),correct:d.correct,asked:d.asked+1,miss:0,seen:seen,
              weak:(d.weak||[]).concat([q.q])});
          }}));
        }
      }
    }});
    optWrap.appendChild(b);
  });

  app.replaceChildren(el("div",{class:"ge-stack ge-g16"},[
    el("div",{class:"ge-crumb"},[
      el("span",{class:"ge-eyebrow",text:"Drill · "+(d.deck==="A"?"your playbook":"the method")}),
      el("span",{class:"ge-counter",text:["recall","application","judgment"][d.lvl-1]})
    ]),
    el("div",{class:"ge-card ge-stack ge-g16"},[
      el("div",{class:"ge-qtext",text:q.q}),
      optWrap, feedback,
      el("div",{class:"ge-row"},[el("button",{class:"ge-btn ge-ghost ge-small",type:"button",text:"Stop and see how I did",onclick:function(){ drillSummary(d, bank); }})])
    ])
  ]));
}

function drillSummary(d, bank){
  S.drill.sessions++; S.drill.asked += d.asked||0; S.drill.correct += d.correct||0;
  (d.weak||[]).forEach(function(w){ if(S.drill.weak.indexOf(w)<0) S.drill.weak.push(w); });
  save();
  var strong = (d.correct||0);
  var flags = [];
  if(S.one.who){
    var words = ("We help "+S.one.who+" who are frustrated by "+S.one.pain+" get "+S.one.outcome+" without "+S.one.without+".").split(/\s+/).length;
    if(words>35) flags.push("Your one-liner is "+words+" words. That is usually why it is hard to recall. Function 3, aim for under 30.");
  }
  if(S.uniques.kept.filter(function(k){return k.t1&&k.t2&&k.t3 && !k.breaks;}).length)
    flags.push("One of your uniques has no breaking point written down. That is the early warning you will want at 60 communities.");
  app.replaceChildren(el("div",{class:"ge-stack ge-g16"},[
    el("div",{class:"ge-crumb"},[el("span",{class:"ge-eyebrow",text:"Drill · where you landed"})]),
    el("div",{class:"ge-card ge-stack ge-g12"},[
      el("h2",{text:strong>=5 ? "Five correct. That is the round." : strong+" correct out of "+(d.asked||0)}),
      (d.weak && d.weak.length) ? el("div",{class:"ge-stack ge-g8"},[
        el("h3",{text:"Shaky"}),
        el("ul",{class:"ge-small",html:d.weak.map(function(w){return "<li>"+w+"</li>";}).join("")})
      ]) : el("div",{class:"ge-flag ge-ok",text:"Nothing missed twice. Run the next level, or hand this deck to a manager."}),
      flags.length ? el("div",{class:"ge-stack ge-g8"},[
        el("h3",{text:"Worth fixing in the playbook, not in your memory"}),
        el("ul",{class:"ge-small",html:flags.map(function(w){return "<li>"+w+"</li>";}).join("")})
      ]) : null
    ]),
    el("div",{class:"ge-row"},[
      el("button",{class:"ge-btn",type:"button",text:"Another round",onclick:function(){ go("drill",{}); }}),
      el("button",{class:"ge-btn ge-ghost",type:"button",text:"Back to the menu",onclick:function(){ go("menu"); }})
    ]),
    el("div",{class:"ge-small ge-muted",html:'Want someone to push back on the answers? <a href="' + CALENDAR_URL + '" target="_blank" rel="noopener">Book 20 minutes with Cameron</a>.'})
  ]));
}

function renderRoleplay(d){
  var r = ROLEPLAY[d.i % ROLEPLAY.length];
  var checks = el("div",{class:"ge-stack ge-g8"});
  var state = {};
  r.rubric.forEach(function(item,i){
    checks.appendChild(el("button",{class:"ge-chip",type:"button","aria-pressed":"false",text:item,onclick:function(e){
      state[i] = !state[i];
      e.currentTarget.setAttribute("aria-pressed", state[i] ? "true":"false");
    }}));
  });
  app.replaceChildren(el("div",{class:"ge-stack ge-g16"},[
    el("div",{class:"ge-crumb"},[el("span",{class:"ge-eyebrow",text:"Drill · role-play"}),el("span",{class:"ge-counter",text:r.who})]),
    el("div",{class:"ge-card ge-stack ge-g16"},[
      el("div",{class:"ge-qtext",text:"“"+r.line+"”"}),
      el("div",{class:"ge-help",text:"Answer out loud, in your own words, before you read anything else. Then check what you actually said."}),
      el("div",{class:"ge-chips"},[]),
      checks,
      el("div",{class:"ge-flag ge-small",html:S.one.who
        ? "Your sentence, for comparison: <em>We help "+S.one.who+" who are frustrated by "+S.one.pain+" get "+S.one.outcome+" without "+S.one.without+".</em>"
        : "You have not written a one-liner yet. Function 3 gives you something to say here."}),
      el("div",{class:"ge-row"},[
        el("button",{class:"ge-btn",type:"button",text:"Next scenario",onclick:function(){ go("drill",{deck:"C",i:d.i+1}); }}),
        el("button",{class:"ge-btn ge-ghost",type:"button",text:"Back to the menu",onclick:function(){ go("menu"); }})
      ])
    ])
  ]));
}

/* ---------------------------------------------------------------- 8. export */
function checks(){
  var out = [];
  if(has("icp") && has("one")){
    var who = (S.one.who||"").toLowerCase();
    var geo = (S.icp.geo||"").toLowerCase().split(/[ ,]+/).filter(function(w){return w.length>4;});
    var overlap = geo.some(function(w){ return who.indexOf(w)>-1; });
    if(!overlap) out.push("Your one-liner's “who” does not mention the footprint you named in your ICP. Not fatal, but worth a look.");
  }
  if(has("uniques")){
    var noOwner = S.uniques.kept.filter(function(k){ return k.t1&&k.t2&&k.t3 && !k.owner; });
    if(noOwner.length) out.push(noOwner.length+" unique(s) have no internal owner. A unique without an owner decays within a year.");
  }
  if(has("qual") && has("icp") && S.icp.regret && S.qual.dq){
    out.push("Check that your disqualifier reflects the account you regret taking. Right now they are written separately.");
  }
  if(has("plan") && !S.plan.blocker) out.push("You did not name what will stop you. That is usually the thing that stops you.");
  return out;
}
function fullPlaybook(){
  var L = ["GROWTH PLAYBOOK","Built with the Supercharge Your Sales Process framework","",""];
  ["icp","uniques","one","stages","qual","plan"].forEach(function(id){
    if(has(id)){ L.push(artifactText(id)); L.push(""); L.push("----------------------------------------"); L.push(""); }
    else { L.push("("+FUNCTIONS.filter(function(f){return f.id===id;})[0].title+": not built yet)"); L.push(""); }
  });
  return L.join("\n");
}
function renderExport(){
  var txt = fullPlaybook();
  var pre = el("pre",{class:"ge-artifact",text:txt});
  var copyBtn = el("button",{class:"ge-btn",type:"button",text:"Copy the whole playbook",onclick:function(){ copyText(txt, copyBtn); }});
  var ch = checks();
  app.replaceChildren(el("div",{class:"ge-stack ge-g16"},[
    el("div",{class:"ge-crumb"},[el("span",{class:"ge-eyebrow",text:"Function 8 · Review and export"}),
      el("span",{class:"ge-counter",text:doneCount()+" of 6 built"})]),
    ch.length ? el("div",{class:"ge-stack ge-g8"},[
      el("h3",{text:"Worth fixing first"}),
      el("div",{class:"ge-stack ge-g8"}, ch.map(function(c){ return el("div",{class:"ge-flag ge-warn ge-small",text:c}); }))
    ]) : el("div",{class:"ge-flag ge-ok",text:"Consistency checks passed on what you have built."}),
    S.plan.one ? el("div",{class:"ge-card ge-stack ge-g8"},[
      el("h3",{text:"Your commitment"}),
      el("p",{html:"By <strong>"+(S.plan.date||"[date]")+"</strong>, I will <strong>"+S.plan.one+"</strong>, and <strong>"+(S.plan.owner||"[name]")+"</strong> will own it."}),
      S.plan.blocker ? el("p",{class:"ge-small ge-muted",text:"What will stop me: "+S.plan.blocker}) : null
    ]) : null,
    el("div",{class:"ge-row",style:"align-items:flex-start"},[ pdfButton("Download PDF"), copyBtn,
      el("button",{class:"ge-btn ge-ghost",type:"button",text:"Print",onclick:function(){ window.print(); }}),
      el("button",{class:"ge-btn ge-ghost",type:"button",text:"Back to the menu",onclick:function(){ go("menu"); }})]),
    pre,
    el("div",{class:"ge-small ge-muted",html:"Unfinished sections are listed at the end of the PDF."}),
    closing(true)
  ]));
}

/* ---------------------------------------------------------------- pdf */
function buildPDF(J){
  var doc = new J({unit:"pt", format:"letter"});
  var M = 56, W = 612, right = W - M, y = 0, page = 1;
  function footer(){
    doc.setFont("helvetica","normal"); doc.setFontSize(8); doc.setTextColor(140,128,150);
    doc.text("Growth playbook  ·  built with the Supercharge Your Sales Process framework", M, 762);
    doc.text(String(page), right, 762, {align:"right"});
    doc.setTextColor(61,26,82);
  }
  function newPage(){ footer(); doc.addPage(); page++; y = M; }
  function space(n){ if(y + n > 730) newPage(); }
  function h1(t){ space(40); doc.setFont("helvetica","bold"); doc.setFontSize(21);
    doc.setTextColor(61,26,82); doc.text(t, M, y); y += 26; }
  function h2(t){ space(44); y += 10; doc.setFont("helvetica","bold"); doc.setFontSize(12.5);
    doc.text(t.toUpperCase(), M, y); y += 7; doc.setDrawColor(255,0,108); doc.setLineWidth(1.4);
    doc.line(M, y, M + 46, y); doc.setDrawColor(200); y += 16; }
  function body(t, opts){
    opts = opts || {};
    doc.setFont("helvetica", opts.bold ? "bold" : "normal");
    doc.setFontSize(opts.size || 10.5);
    doc.setTextColor(opts.grey ? 118 : 61, opts.grey ? 108 : 26, opts.grey ? 125 : 82);
    var lines = doc.splitTextToSize(t, right - M - (opts.indent||0));
    for(var i=0;i<lines.length;i++){
      space(16);
      doc.text(lines[i], M + (opts.indent||0), y);
      y += (opts.lead || 14);
    }
    doc.setTextColor(61,26,82);
  }
  function gap(n){ y += (n||8); }

  y = M;
  h1("Growth playbook");
  body(new Date().toLocaleDateString(undefined,{year:"numeric",month:"long",day:"numeric"}) +
       "   ·   " + doneCount() + " of 6 sections built", {grey:true, size:9.5});
  gap(6);

  var built = 0;
  var SECTIONS = [
    {id:"icp",     t:"Who we are best for"},
    {id:"uniques", t:"What makes us different"},
    {id:"one",     t:"How we say it"},
    {id:"stages",  t:"How we run a deal"},
    {id:"qual",    t:"What we say yes and no to"},
    {id:"plan",    t:"What happens next"}
  ];
  SECTIONS.forEach(function(sec){
    if(!has(sec.id)) return;
    built++;
    h2(sec.t);
    artifactText(sec.id).split("\n").slice(2).forEach(function(line){
      if(!line.trim()){ gap(5); return; }
      var isHead = /^[A-Z0-9 ,\/&-]{4,}$/.test(line.trim()) && line.trim().length < 46;
      var indented = /^\s{2,}/.test(line);
      body(line.trim(), {bold:isHead, indent: indented ? 16 : 0});
    });
    gap(6);
  });

  if(S.plan.one){
    space(70); gap(10);
    doc.setFillColor(244,240,247); doc.rect(M, y - 4, right - M, 54, "F");
    doc.setFont("helvetica","bold"); doc.setFontSize(11);
    doc.text("The one thing", M + 12, y + 14);
    doc.setFont("helvetica","normal"); doc.setFontSize(10.5);
    var c = "By " + (S.plan.date || "[date]") + ", I will " + S.plan.one + ", and " +
            (S.plan.owner || "[name]") + " will own it.";
    doc.text(doc.splitTextToSize(c, right - M - 24), M + 12, y + 32);
    y += 66;
  }

  var missing = SECTIONS.filter(function(sec){ return !has(sec.id); });
  if(missing.length){
    h2("Not built yet");
    body(missing.map(function(m){ return m.t; }).join("  ·  "), {grey:true});
    gap(4);
    body("Pick these up where you left off. Your answers are saved in the browser you used.", {grey:true, size:9.5});
  }
  if(!built){
    body("Nothing is filled in yet. Start with function 1, who you are best for.", {grey:true});
  }
  footer();
  return doc;
}

function pdfButton(label){
  var btn = el("button",{class:"ge-btn",type:"button",text:label || "Download PDF"});
  var note = el("div",{class:"ge-small ge-muted",style:"margin-top:6px"});
  btn.addEventListener("click", function(){
    btn.disabled = true; btn.textContent = "Preparing...";
    import("jspdf").then(function(mod){
      var doc = buildPDF(mod.jsPDF);
      doc.save("growth-playbook.pdf");
      btn.disabled = false; btn.textContent = "Saved";
      setTimeout(function(){ btn.textContent = label || "Download PDF"; }, 1800);
    }).catch(function(){
      btn.disabled = false; btn.textContent = label || "Download PDF";
      note.textContent = "That save did not go through. Copy the text instead.";
    });
  });
  return el("div",{},[btn, note]);
}

/* ---------------------------------------------------------------- start over */
function clearSection(id){
  if(id==="icp") S.icp = JSON.parse(JSON.stringify(BLANK.icp));
  if(id==="uniques") S.uniques = {candidates:"", kept:[]};
  if(id==="one") S.one = JSON.parse(JSON.stringify(BLANK.one));
  if(id==="stages") S.stages = {list:null, home:""};
  if(id==="qual") S.qual = JSON.parse(JSON.stringify(BLANK.qual));
  if(id==="plan") S.plan = JSON.parse(JSON.stringify(BLANK.plan));
  delete S.status[id];
  save();
}

function renderReset(){
  var builtIds = ["icp","uniques","one","stages","qual","plan"].filter(has);
  var rows = el("div",{class:"ge-stack ge-g8"});
  builtIds.forEach(function(id){
    var f = FUNCTIONS.filter(function(x){return x.id===id;})[0];
    rows.appendChild(el("div",{class:"ge-scorerow"},[
      el("div",{},[el("strong",{text:f.title}), el("div",{class:"ge-small ge-muted",text:f.sub})]),
      el("button",{class:"ge-btn ge-ghost ge-small",type:"button",text:"Clear",onclick:function(){
        clearSection(id); go("reset");
      }})
    ]));
  });
  var confirmWrap = el("div",{class:"ge-stack ge-g8"});
  var wipeBtn = el("button",{class:"ge-btn ge-ghost",style:"color:var(--accent);border-color:var(--accent)",type:"button",text:"Erase everything",onclick:function(){
    confirmWrap.replaceChildren(
      el("div",{class:"ge-flag",text:"This clears every answer stored in this browser. It cannot be undone."}),
      el("div",{class:"ge-row"},[
        el("button",{class:"ge-btn",type:"button",text:"Yes, erase it all",onclick:function(){
          S = JSON.parse(JSON.stringify(BLANK));
          try{ localStorage.removeItem("ge_state_v1"); }catch(e){}
          save(); go("menu");
        }}),
        el("button",{class:"ge-btn ge-ghost",type:"button",text:"Keep my work",onclick:function(){ go("reset"); }})
      ])
    );
  }});

  app.replaceChildren(el("div",{class:"ge-stack ge-g16"},[
    el("div",{class:"ge-crumb"},[el("span",{class:"ge-eyebrow",text:"Start over"})]),
    el("div",{class:"ge-card ge-stack ge-g12"},[
      el("div",{class:"ge-qtext",text:"Take a copy before you clear anything."}),
      el("div",{class:"ge-help",text:"The PDF works even if you have only done one section. Whatever is finished goes in, the rest is listed as not built yet."}),
      pdfButton("Download what I have")
    ]),
    builtIds.length ? el("div",{class:"ge-card ge-stack ge-g12"},[
      el("h3",{text:"Clear one section"}),
      el("div",{class:"ge-help",text:"Start that piece fresh and leave everything else alone."}),
      rows
    ]) : null,
    el("div",{class:"ge-card ge-stack ge-g12"},[
      el("h3",{text:"Clear everything"}),
      el("div",{class:"ge-help",text:"Use this between sessions, or when you want to run it again from a blank page."}),
      el("div",{class:"ge-row"},[wipeBtn]), confirmWrap
    ]),
    el("div",{class:"ge-row"},[
      el("button",{class:"ge-btn ge-ghost",type:"button",text:"Back to the menu",onclick:function(){ go("menu"); }})
    ])
  ]));
}


/* ---------------------------------------------------------------- calls to action */
/* The Cameron card + the book club form live in lib/book-club-form.js (shared with /book-club). */
function closing(compact){
  return el("div",{class:"ge-stack ge-g12"},[
    el("div",{class:"ge-privacy",text:"Your answers stay in this browser. Nothing is sent anywhere unless you ask for it."}),
    el("div",{class:"ge-cta-zone"},[ ctaCall(compact), ctaBookClub({source:"Growth Engine walk-through"}) ])
  ]);
}

/* ---------------------------------------------------------------- router */
function render(){
  switch(view.name){
    case "icp": renderICP(); break;
    case "uniques": renderUniques(); break;
    case "one": renderOne(); break;
    case "stages": renderStages(); break;
    case "qual": renderQual(); break;
    case "plan": renderPlan(); break;
    case "drill": renderDrill(); break;
    case "export": renderExport(); break;
    case "artifact": renderArtifact(); break;
    case "reset": renderReset(); break;
    default: renderMenu();
  }
}
document.getElementById("ge-export").addEventListener("click", function(){ save(); go("export"); });
document.getElementById("ge-reset").addEventListener("click", function(){ save(); go("reset"); });
document.getElementById("ge-theme").addEventListener("click", function(){
  var cur = root.getAttribute("data-theme");
  var isDark = cur ? cur==="dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.setAttribute("data-theme", isDark ? "light" : "dark");
});
render();
})();
