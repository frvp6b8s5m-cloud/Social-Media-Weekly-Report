"use client";

import { useMemo, useState } from "react";
import { buildEmailHtml, parseCsv, summarize, type Platform, type Row } from "./report-engine";

const demo: Row[] = [
  {platform:"YouTube",channel:"ReelShort",title:"My X Ray Vision Sees Right Through You",views:118034,likes:8200,comments:420,shares:610,followers:1200000,revenue:294.75},
  {platform:"YouTube",channel:"ReelShort Latinoamérica",title:"Un secreto que él nunca debió descubrir…",views:92164,likes:7200,comments:380,shares:510,followers:580000,revenue:180.76},
  {platform:"TikTok",channel:"ReelShort",title:"He married the wrong sister…",views:284300,likes:31200,comments:920,shares:4400,followers:420000,revenue:0},
  {platform:"Instagram",channel:"ReelShort",title:"One summer night with her best friend's brother",views:143800,likes:18400,comments:620,shares:1800,followers:310000,revenue:0},
  {platform:"Facebook",channel:"ReelShort TV",title:"The Baby He Never Knew",views:820400,likes:52000,comments:4100,shares:9300,followers:690000,revenue:915.60},
];

const platformHints: {name:Platform; icon:string}[] = [
  {name:"YouTube",icon:"▶"},{name:"TikTok",icon:"♪"},{name:"Instagram",icon:"◎"},{name:"Facebook",icon:"f"},
];

function fmt(n:number){return n.toLocaleString("en-US")}
function money(n:number){return "$"+n.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}

export default function Home(){
  const [rows,setRows]=useState<Row[]>(demo);
  const [files,setFiles]=useState<string[]>([]);
  const [platform,setPlatform]=useState<Platform>("YouTube");
  const [reportTitle,setReportTitle]=useState("Weekly Social Media Intelligence Report");
  const [emailHtml,setEmailHtml]=useState("");
  const [copied,setCopied]=useState(false);
  const summary=useMemo(()=>summarize(rows),[rows]);

  async function importFile(file:File){
    const text=await file.text();
    const imported=parseCsv(text,platform);
    if(imported.length){setRows(current=>[...current,...imported]);setFiles(current=>[...current,file.name]);}
  }
  function clear(){setRows([]);setFiles([]);setEmailHtml("");}
  async function copyEmail(){
    const html=buildEmailHtml(reportTitle,summary);
    setEmailHtml(html);
    try{await navigator.clipboard.writeText(html);setCopied(true);setTimeout(()=>setCopied(false),1800);}catch{}
  }
  function downloadEmail(){
    const html=buildEmailHtml(reportTitle,summary);
    const blob=new Blob([html],{type:"text/html"});
    const url=URL.createObjectURL(blob); const a=document.createElement("a");
    a.href=url;a.download="weekly-social-report-email.html";a.click();URL.revokeObjectURL(url);
    setEmailHtml(html);
  }

  return <main>
    <header className="report-header">
      <div><div className="logo">SI</div><div><b>Social Intelligence</b><small>Weekly Report Generator</small></div></div>
      <span className="status">REPORT MODE</span>
    </header>

    <section className="hero">
      <div>
        <span className="eyebrow">UPLOAD → ANALYZE → SEND</span>
        <h1>Turn weekly exports<br/>into a finished report.</h1>
        <p>Upload CSV exports from your social platforms. The generator calculates weekly totals, highlights top content, breaks performance down by platform, and produces an email-ready HTML report.</p>
      </div>
      <div className="hero-stat"><small>REPORT DATA</small><strong>{rows.length}</strong><span>content rows loaded</span></div>
    </section>

    <section className="workspace">
      <div className="upload-panel">
        <div className="panel-title"><span>01 / DATA INPUT</span><h2>Upload weekly data</h2><p>CSV files are supported. Columns can include platform, channel, title, views, likes, comments, shares, followers and revenue.</p></div>
        <div className="platform-picker">{platformHints.map(p=><button key={p.name} className={platform===p.name?"selected":""} onClick={()=>setPlatform(p.name)}><i>{p.icon}</i>{p.name}</button>)}</div>
        <label className="dropzone">
          <input type="file" accept=".csv,.txt" multiple onChange={e=>Array.from(e.target.files||[]).forEach(importFile)}/>
          <strong>Drop weekly CSV exports here</strong><span>or click to browse files</span><small>Current import mode: {platform}</small>
        </label>
        {files.length>0&&<div className="file-list">{files.map(f=><span key={f}>✓ {f}</span>)}</div>}
        <div className="actions"><button className="secondary" onClick={()=>setRows(demo)}>Load demo data</button><button className="secondary" onClick={clear}>Clear</button></div>
      </div>

      <div className="report-panel">
        <div className="panel-title"><span>02 / REPORT PREVIEW</span><h2>Weekly intelligence</h2><input className="title-input" value={reportTitle} onChange={e=>setReportTitle(e.target.value)}/></div>
        <div className="kpis">
          <div><small>VIEWS</small><strong>{fmt(summary.views)}</strong><span>all imported platforms</span></div>
          <div><small>ENGAGEMENT</small><strong>{fmt(summary.likes+summary.comments+summary.shares)}</strong><span>likes + comments + shares</span></div>
          <div><small>CONTENT</small><strong>{fmt(summary.posts)}</strong><span>rows imported</span></div>
          <div><small>REVENUE</small><strong>{money(summary.revenue)}</strong><span>where supplied</span></div>
        </div>
        <div className="insight"><span>TOP TRACTION</span><b>{summary.topContent[0]?.title||"Upload data to generate insights"}</b><p>{summary.topContent[0]?\`\${fmt(summary.topContent[0].views)} views on \${summary.topContent[0].channel}.\`:"The report engine will automatically sort imported content by views."}</p></div>
        <div className="platform-table"><div className="table-head"><b>Platform</b><b>Posts</b><b>Views</b><b>Revenue</b></div>{summary.platforms.map(p=><div className="table-row" key={p.platform}><span>{p.platform}</span><span>{fmt(p.posts)}</span><span>{fmt(p.views)}</span><span>{money(p.revenue)}</span></div>)}</div>
      </div>
    </section>

    <section className="email-section">
      <div className="email-head"><div><span>03 / EMAIL OUTPUT</span><h2>Ready to send</h2><p>Generate a self-contained HTML email. Download it or copy the HTML into your email workflow.</p></div><div className="email-actions"><button onClick={copyEmail}>{copied?"Copied!":"Generate & Copy HTML"}</button><button onClick={downloadEmail}>Download HTML</button></div></div>
      {emailHtml?<div className="email-preview"><iframe title="Email preview" srcDoc={emailHtml}/></div>:<div className="email-empty">Generate the email after importing the week's data.</div>}
    </section>

    <footer>Social Intelligence · Weekly report generator · Data stays in your browser in this report preview.</footer>
  </main>
}
