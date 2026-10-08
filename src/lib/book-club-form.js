// Shared pieces of the Growth Engine handoff that more than one page needs:
// the tiny DOM helper (`el`), copy-to-clipboard, the "Where is this going next?"
// Cameron card and the HOA Leader Book Club form. Used by src/lib/growth-engine.js
// (/cai-growth, inside the worksheet) and src/pages/book-club.astro (/book-club,
// the standalone signup landing page). Styles: src/styles/growth-engine.css.
// The form posts to /api/book-club (email Cameron + admin, Slack, Mailchimp tag);
// if that request fails the viewer gets a prefilled email instead.
// Plain ES5-style JS from the handoff on purpose; @ts-nocheck keeps `astro check` out.
// @ts-nocheck

/* DOM helper: el(tag, {class, text, html, on<event>, ...attrs}, [children]) */
export function el(tag, attrs, kids){
  var e = document.createElement(tag);
  attrs = attrs || {};
  Object.keys(attrs).forEach(function(k){
    if(k === "class") e.className = attrs[k];
    else if(k === "html") e.innerHTML = attrs[k];
    else if(k === "text") e.textContent = attrs[k];
    else if(k.slice(0,2) === "on") e.addEventListener(k.slice(2), attrs[k]);
    else e.setAttribute(k, attrs[k]);
  });
  (kids || []).forEach(function(k){ if(k) e.appendChild(k); });
  return e;
}

export function copyText(str, btn){
  var done = function(){ var t=btn.textContent; btn.textContent="Copied"; setTimeout(function(){btn.textContent=t;},1400); };
  try{
    navigator.clipboard.writeText(str).then(done, function(){ selectFallback(str, btn); });
  }catch(e){ selectFallback(str, btn); }
}
function selectFallback(str, btn){
  var pre = btn.closest(".ge-stack") && btn.closest(".ge-stack").querySelector(".ge-artifact");
  if(pre){ var r=document.createRange(); r.selectNodeContents(pre); var s=window.getSelection(); s.removeAllRanges(); s.addRange(r); btn.textContent="Selected, press copy"; }
}

export var FORM_ENDPOINT = "/api/book-club";
export var CONTACT_EMAIL = "cameron@alloygp.co";
export var CALENDAR_URL  = "https://calendar.app.google/ssQ22vSCJC38Cy8QA";
export var HEADSHOT = "/assets/team/cameron-lange.jpg";
/* Attribution that travels with every submission (same shape as the Contact form). */
export function sourceInfo(label){
  var params = new URLSearchParams(window.location.search);
  var utms = ["utm_source","utm_medium","utm_campaign","utm_content","utm_term"]
    .filter(function(k){ return params.get(k); })
    .map(function(k){ return k+"="+params.get(k); }).join(" | ");
  return ["Form: HOA Leader Book Club ("+(label || "unknown page")+")",
    "Page: "+window.location.href,
    document.referrer ? "Referrer: "+document.referrer : "Referrer: direct",
    utms ? "UTMs: "+utms : null].filter(Boolean).join("\n");
}
export function esc(s){ return String(s).replace(/[&<>"']/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }

/* The "Where is this going next?" card: Cameron's headshot, copy, Book 20 minutes. */
export function ctaCall(compact){
  var copy = compact
    ? "You have the playbook. The harder question is where the firm goes from here, and what has to be true for it to get there. If that is worth twenty minutes, take twenty minutes."
    : "I keep time open for conversations with owners and executives about where their firm is headed. Growth goals, the number you are chasing, the constraint that keeps showing up, whatever you are weighing. No pitch and no deck, just the conversation.";
  return el("div",{class:"ge-cta"},[
    el("div",{class:"ge-cta-grid"},[
      el("img",{class:"ge-shot",src:HEADSHOT,alt:"Cameron Lange",width:"84",height:"84"}),
      el("div",{class:"ge-stack ge-g8"},[
        el("h3",{text:"Where is this going next?"}),
        el("p",{class:"ge-small ge-muted",text:copy}),
        el("p",{class:"ge-small ge-muted",text:"Cameron Lange, Alloy Growth Partners. We work with community association management companies on the growth side of the business: who you go after, how the pipeline runs, and whether the doors you win stay. The bar we hold ourselves to is doubling your bottom line in three years."}),
        el("div",{class:"ge-row"},[
          el("a",{class:"ge-btn",href:CALENDAR_URL,target:"_blank",rel:"noopener",text:"Book 20 minutes"})
        ])
      ])
    ])
  ]);
}

/* The HOA Leader Book Club block: pitch + the seats form (a real <form id="ge-book-club"> so
   WhatConverts records it once it is registered under Tracking › Web Forms, Attribute Type ID).
   opts.source labels the submission ("Growth Engine walk-through" / "Book club landing page");
   opts.toolNote overrides the "AI tool" bullet (the worksheet says "Like the one you just used"). */
export function ctaBookClub(opts){
  opts = opts || {};
  var source = opts.source || "unknown page";
  var data = {name:"", email:"", company:"", cell:"", team:[]};
  var submit;
  var msg = el("div",{class:"ge-stack ge-g8"});
  var teamwrap = el("div",{class:"ge-teamwrap"});

  function drawTeam(){
    teamwrap.replaceChildren();
    data.team.forEach(function(_, i){
      var input = el("input",{type:"email",name:"team",value:data.team[i],placeholder:"leader@yourcompany.com",
        oninput:function(e){ data.team[i] = e.target.value; refreshLabel(); }});
      var x = el("button",{class:"ge-xbtn",type:"button",title:"Remove this seat",text:"\u00d7",
        onclick:function(){ data.team.splice(i,1); drawTeam(); refreshLabel(); }});
      teamwrap.appendChild(el("div",{class:"ge-teamrow"},[input, x]));
    });
    teamwrap.appendChild(el("button",{class:"ge-addbtn",type:"button",
      text: data.team.length ? "Add another leader" : "Add a senior leader",
      onclick:function(){ data.team.push(""); drawTeam();
        var rows = teamwrap.querySelectorAll("input");
        if(rows.length) rows[rows.length-1].focus();
      }}));
  }
  drawTeam();

  var form = el("div",{class:"ge-formgrid"},[
    el("label",{class:"ge-fld"},[el("span",{},[el("span",{text:"Name"})]),
      el("input",{type:"text",id:"bc_name",name:"name",autocomplete:"name",placeholder:"First and last",oninput:function(e){data.name=e.target.value;}})]),
    el("label",{class:"ge-fld"},[el("span",{},[el("span",{text:"Email"})]),
      el("input",{type:"email",id:"bc_email",name:"email",autocomplete:"email",placeholder:"you@company.com",oninput:function(e){data.email=e.target.value;}})]),
    el("label",{class:"ge-fld"},[el("span",{},[el("span",{text:"Company"})]),
      el("input",{type:"text",id:"bc_company",name:"company",autocomplete:"organization",placeholder:"Management company",oninput:function(e){data.company=e.target.value;}})]),
    el("label",{class:"ge-fld"},[
      el("span",{},[el("span",{text:"Cell"}), el("span",{class:"ge-opt-tag",text:"optional"})]),
      el("input",{type:"tel",id:"bc_cell",name:"cell",autocomplete:"tel",placeholder:"(210) 555-0148",oninput:function(e){data.cell=e.target.value;}})])
  ]);

  /* "Save my seat" until a leader email is added, then "Save our seats" (client, 2026-10-08). */
  function label(){ return seats().length ? "Save our seats" : "Save my seat"; }
  function refreshLabel(){ if(submit && !submit.disabled) submit.textContent = label(); }
  function seats(){
    return data.team.map(function(t){ return t.trim(); }).filter(function(t){ return t; });
  }
  function body(){
    var t = seats();
    return "HOA Leader Book Club request\n\n" +
      "Name: " + data.name + "\nEmail: " + data.email + "\nCompany: " + data.company +
      "\nCell: " + (data.cell || "not given") +
      "\nAlso seat: " + (t.length ? t.join(", ") : "none yet");
  }
  function done(){
    var t = seats();
    msg.replaceChildren(
      el("div",{class:"ge-flag ge-ok",html:"<strong>You are in.</strong> Cameron will email the details to " + esc(data.email) +
        (t.length ? " and to the " + t.length + " leader" + (t.length>1?"s":"") + " you added." : ".")}),
      el("div",{class:"ge-row"},[el("a",{class:"ge-btn ge-gold",href:CALENDAR_URL,target:"_blank",rel:"noopener",text:"Book time while you are here"})])
    );
  }
  function manual(){
    submit.disabled = false; submit.textContent = label();
    var txt = body();
    var copyBtn = el("button",{class:"ge-btn ge-gold",type:"button",text:"Copy my details"});
    copyBtn.addEventListener("click", function(){ copyText(txt, copyBtn); });
    msg.replaceChildren(
      el("div",{class:"ge-flag",html:"Send these lines to <strong>" + CONTACT_EMAIL + "</strong> and everyone on them has a seat."}),
      el("pre",{class:"ge-artifact",text:txt}),
      el("div",{class:"ge-row"},[copyBtn,
        el("a",{class:"ge-btn",href:"mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent("HOA Leader Book Club") +
          "&body=" + encodeURIComponent(txt),text:"Open in email"})])
    );
  }

  submit = el("button",{class:"ge-btn ge-gold",type:"submit",text:"Save my seat"});
  function sendSeats(){
    var ok = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    var problems = [];
    if(!data.name.trim()) problems.push("your name");
    if(!ok.test(data.email.trim())) problems.push("a working email");
    if(!data.company.trim()) problems.push("your company");
    var bad = seats().filter(function(t){ return !ok.test(t); });
    if(bad.length) problems.push("a working email for " + bad.join(", "));
    if(problems.length){
      msg.replaceChildren(el("div",{class:"ge-err",text:"Still need " + problems.join(", ") + "."}));
      return;
    }
    submit.disabled = true; submit.textContent = "Sending...";
    if(FORM_ENDPOINT){
      var fd = new FormData();
      fd.append("name", data.name.trim());
      fd.append("email", data.email.trim());
      fd.append("company", data.company.trim());
      fd.append("cell", data.cell.trim());
      seats().forEach(function(t){ fd.append("team", t); });
      fd.append("source", sourceInfo(source));
      fetch(FORM_ENDPOINT,{method:"POST",body:fd})
        .then(function(r){ if(!r.ok) throw new Error("bad response"); submit.textContent = "Saved"; done(); })
        .catch(function(){ submit.disabled = false; submit.textContent = label(); manual(); });
    } else {
      manual();
    }
  }

  /* A real <form> (id / name / action / method) so the WhatConverts form tracker
     records the lead on submit, the same way the Contact and Growth Portal forms do.
     The submit handler takes over from there (fetch, no navigation). */
  return el("form",{class:"ge-cta ge-dark ge-stack ge-g12",id:"ge-book-club",name:"hoa-leader-book-club",
    action:FORM_ENDPOINT,method:"post",novalidate:"",onsubmit:function(e){ e.preventDefault(); sendSeats(); }},[
    el("div",{class:"ge-row",style:"justify-content:space-between;align-items:center"},[
      el("h3",{text:"The HOA Leader Book Club"}),
      el("span",{class:"ge-value-pill",text:"$199 a month value, included"})
    ]),
    el("p",{class:"ge-small ge-muted",text:"One hour with people who run management companies. Nothing to read, nothing to prep."}),
    el("ul",{class:"ge-bclist"},[
      el("li",{html:"<b>One idea, worked for our industry.</b> Not a summary. What it changes at a management company."}),
      el("li",{html: opts.toolNote || "<b>An AI tool every session.</b> Like the one you just used. Run your firm through it and leave with your version."}),
      el("li",{html:"<b>Your people.</b> Owners and leaders who know the work, so every example lands."})
    ]),
    el("p",{class:"ge-small ge-muted",text:"Your seat is included because you were at the retreat. So are seats for the senior leaders you are developing."}),
    form,
    el("div",{class:"ge-stack ge-g8"},[
      el("div",{class:"ge-seatnote",text:"Included seats for your senior leaders"}),
      teamwrap
    ]),
    el("div",{class:"ge-row"},[submit]), msg
  ]);
}
