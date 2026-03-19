import { useState, useRef, useEffect } from "react";

const LOGO = "data:image/jpeg;base64,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";

// ─── storage helpers ───────────────────────────────────
const K = { docs: "eg_docs_v5", emps: "eg_emps_v5", adm: "eg_adm_v5" };
const DEF_ADMIN = { user: "egytrans_admin", pass: "EgyHR@2025" };
async function sGet(k) { try { const r = await localStorage.getItem(k); return r ? JSON.parse(r) : null; } catch { return null; } }
async function sSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }

// ─── RAG helpers ───────────────────────────────────────
function chunk(text, max = 500) {
  const lines = text.split(/\n+/).map(l => l.trim()).filter(l => l.length > 15);
  const out = []; let cur = "";
  for (const l of lines) {
    if ((cur + "\n" + l).length > max && cur) { out.push(cur.trim()); cur = l; }
    else cur += (cur ? "\n" : "") + l;
  }
  if (cur.trim().length > 15) out.push(cur.trim());
  return out;
}
function search(q, pool, k = 5) {
  const ws = q.toLowerCase().replace(/[^\w\s\u0600-\u06FF]/g, "").split(/\s+/).filter(w => w.length > 2);
  if (!ws.length || !pool.length) return [];
  return pool
    .map(x => ({ ...x, s: ws.reduce((n, w) => n + (x.t.toLowerCase().split(w).length - 1), 0) }))
    .filter(x => x.s > 0).sort((a, b) => b.s - a.s).slice(0, k);
}
function buildSys(emp, ctx) {
  const who = emp ? `\nالموظف: ${emp.name} | ${emp.job || ""} | ${emp.company} | رقم: ${emp.empId}\n` : "";
  const base = `أنت "نور" مساعد HR لمجموعة Egytrans NOSCO.${who}رد بلغة الموظف (عربي أو إنجليزي). كن دقيقاً ومختصراً. لا تشارك بيانات موظفين آخرين.`;
  if (!ctx.length) return base;
  return base + "\n\n══ قاعدة المعرفة ══\n" + ctx.map((x, i) => `[${i + 1}. ${x.src}]\n${x.t}`).join("\n---\n") + "\n══════════\nأجب فقط من المعلومات أعلاه.";
}
async function ask(msgs, sys) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_KEY;
  if (!apiKey) {
    return "⚠️ API key غير مضبوط. اطلب من الأدمن الإعدادات.";
  }
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST", headers: { "Content-Type": "application/json", "x-api-key": apiKey },
    body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 900, system: sys, messages: msgs })
  });
  return (await r.json()).content?.[0]?.text || "عذراً، حدث خطأ.";
}
const ts = () => new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" });

// ─── tiny styled atoms ──────────────────────────────────
const s = {
  gold: "#C8A96E", navy: "#07111f", teal: "#27916a", red: "#e05c5c", purple: "#7c3aed",
  page: { minHeight: "100vh", fontFamily: "'Segoe UI','Cairo',sans-serif", background: "linear-gradient(160deg,#060e1a,#0b1a2e 55%,#06100e)" },
  card: { background: "rgba(10,22,38,.95)", border: "1px solid rgba(200,169,110,.18)", borderRadius: 18, padding: "30px 26px", backdropFilter: "blur(16px)", boxShadow: "0 18px 55px rgba(0,0,0,.6)" },
  inp: { width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(200,169,110,.22)", borderRadius: 10, padding: "11px 14px", color: "#e8eef4", fontSize: 14, fontFamily: "inherit", outline: "none" },
};

function Spin({ size = 20, color = "#C8A96E" }) {
  return <div style={{ width: size, height: size, borderRadius: "50%", border: `2px solid rgba(200,169,110,.15)`, borderTopColor: color, animation: "eg-spin .8s linear infinite", flexShrink: 0 }} />;
}

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');
  @keyframes eg-spin { to { transform: rotate(360deg) } }
  @keyframes eg-up   { from { opacity:0;transform:translateY(10px) } to { opacity:1;transform:translateY(0) } }
  @keyframes eg-sh   { 0%,100%{transform:translateX(0)} 25%,75%{transform:translateX(-7px)} 50%{transform:translateX(7px)} }
  @keyframes eg-glow { 0%,100%{box-shadow:0 0 0 0 rgba(200,169,110,.4)} 50%{box-shadow:0 0 0 12px rgba(200,169,110,0)} }
  @keyframes eg-shim { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes eg-dot  { 0%,80%,100%{transform:translateY(0);opacity:.35} 40%{transform:translateY(-6px);opacity:1} }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  ::-webkit-scrollbar { width: 3px } ::-webkit-scrollbar-thumb { background: rgba(200,169,110,.2); border-radius:2px }
  select option { background: #0d1e35 }
  textarea:focus, input:focus { outline: none; border-color: rgba(200,169,110,.6) !important }
`;

// ════════════════════════════════════════════════════════
// ROOT
// ════════════════════════════════════════════════════════
export default function App() {
  const [screen, setScreen] = useState("boot");
  const [emp, setEmp] = useState(null);
  const [docs, setDocs] = useState([]);
  const [emps, setEmps] = useState([]);
  const [admin, setAdmin] = useState(DEF_ADMIN);

  useEffect(() => {
    Promise.all([sGet(K.docs), sGet(K.emps), sGet(K.adm)]).then(([d, e, a]) => {
      setDocs(d || []); setEmps(e || []); setAdmin(a || DEF_ADMIN);
      setScreen("login");
    });
  }, []);

  const saveDocs = async v => { setDocs(v); await sSet(K.docs, v); };
  const saveEmps = async v => { setEmps(v); await sSet(K.emps, v); };
  const saveAdmin = async v => { setAdmin(v); await sSet(K.adm, v); };

  const pool = docs.flatMap(d => d.chunks.map(t => ({ t, src: d.name })));

  if (screen === "boot") return (
    <><style>{globalCSS}</style>
      <div style={{ ...s.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Spin size={36} />
      </div>
    </>
  );

  return (
    <><style>{globalCSS}</style>
      {screen === "login" && <Login emps={emps} admin={admin} onEmp={e => { setEmp(e); setScreen("emp"); }} onAdmin={() => setScreen("adm")} />}
      {screen === "emp" && <EmpApp emp={emp} pool={pool} onLogout={() => setScreen("login")} />}
      {screen === "adm" && <AdminApp docs={docs} emps={emps} admin={admin} saveDocs={saveDocs} saveEmps={saveEmps} saveAdmin={saveAdmin} onLogout={() => setScreen("login")} />}
    </>
  );
}

// ════════════════════════════════════════════════════════
// LOGIN
// ════════════════════════════════════════════════════════
function Login({ emps, admin, onEmp, onAdmin }) {
  const [mode, setMode] = useState("emp");
  const [id, setId] = useState(""); const [pin, setPin] = useState("");
  const [au, setAu] = useState(""); const [ap, setAp] = useState("");
  const [err, setErr] = useState(""); const [shake, setShake] = useState(false); const [busy, setBusy] = useState(false);
  const r2 = useRef(); const r3 = useRef();

  const bump = () => { setShake(true); setTimeout(() => setShake(false), 500); };

  const goEmp = async () => {
    if (!id || !pin) { setErr("أدخل رقم الموظف والرقم السري"); bump(); return; }
    setBusy(true); await new Promise(r => setTimeout(r, 500));
    const e = emps.find(e => e.empId === id.trim() && e.pin === pin.trim());
    if (e) onEmp(e); else { setErr("رقم الموظف أو الرقم السري غير صحيح ❌"); setPin(""); bump(); }
    setBusy(false);
  };

  const goAdmin = async () => {
    if (!au || !ap) { setErr("أدخل بيانات الأدمن"); bump(); return; }
    setBusy(true); await new Promise(r => setTimeout(r, 500));
    if (au.trim() === admin.user && ap === admin.pass) onAdmin();
    else { setErr("بيانات الأدمن غير صحيحة ❌"); setAp(""); bump(); }
    setBusy(false);
  };

  return (
    <div style={{ ...s.page, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "'Cairo',sans-serif" }}>
      <div style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse at 50% 35%,rgba(200,169,110,.06) 0%,transparent 60%)", pointerEvents: "none" }} />

      {/* Logo */}
      <div style={{ textAlign: "center", marginBottom: 24, position: "relative", zIndex: 1 }}>
        <img src={LOGO} alt="logo" style={{ width: 74, height: 74, background: "#fff", borderRadius: 16, padding: 8, objectFit: "contain", animation: "eg-glow 3s infinite", boxShadow: "0 4px 22px rgba(200,169,110,.3)", display: "block", margin: "0 auto 12px" }} />
        <div style={{ fontSize: 21, fontWeight: 900, background: `linear-gradient(90deg,${s.gold},#f0d898,${s.gold})`, backgroundSize: "200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "eg-shim 4s linear infinite" }}>Egytrans NOSCO</div>
        <div style={{ fontSize: 12, color: "rgba(200,169,110,.5)", marginTop: 3 }}>خدمة الموارد البشرية</div>
      </div>

      {/* Toggle */}
      <div style={{ display: "flex", gap: 4, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 12, padding: 4, marginBottom: 18, position: "relative", zIndex: 1 }}>
        {[["emp", "👤 موظف"], ["adm", "⚙️ أدمن"]].map(([m, l]) => (
          <button key={m} onClick={() => { setMode(m); setErr(""); }} style={{ padding: "8px 22px", borderRadius: 9, border: "none", cursor: "pointer", fontFamily: "'Cairo',sans-serif", fontWeight: 700, fontSize: 13, transition: "all .2s", background: mode === m ? (m === "emp" ? `linear-gradient(135deg,${s.gold},#a07840)` : `linear-gradient(135deg,${s.purple},#5b21b6)`) : "transparent", color: mode === m ? (m === "emp" ? "#0a1628" : "#fff") : "rgba(255,255,255,.35)", boxShadow: mode === m ? "0 2px 10px rgba(0,0,0,.3)" : "none" }}>{l}</button>
        ))}
      </div>

      {/* Card */}
      <div className={shake ? "" : ""} style={{ ...s.card, width: "100%", maxWidth: 390, animation: shake ? "eg-sh .4s ease-out" : "none", position: "relative", zIndex: 1, border: `1px solid ${mode === "emp" ? "rgba(200,169,110,.2)" : "rgba(124,58,237,.25)"}` }}>
        {mode === "emp" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Label t="رقم الموظف" />
            <input style={{ ...s.inp }} value={id} onChange={e => { setId(e.target.value); setErr(""); }} onKeyDown={e => e.key === "Enter" && r2.current?.focus()} placeholder="EGY-001" />
            <Label t="الرقم السري" />
            <input ref={r2} type="password" style={{ ...s.inp }} value={pin} onChange={e => { setPin(e.target.value); setErr(""); }} onKeyDown={e => e.key === "Enter" && goEmp()} placeholder="••••••" />
            {err && <ErrBox t={err} />}
            <GoldBtn onClick={goEmp} busy={busy} label="دخول للمحادثة →" />
            <div style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,.18)" }}>مشكلة؟ تواصل مع قسم HR</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Label t="اسم المستخدم" />
            <input style={{ ...s.inp }} value={au} onChange={e => { setAu(e.target.value); setErr(""); }} onKeyDown={e => e.key === "Enter" && r3.current?.focus()} placeholder="egytrans_admin" />
            <Label t="كلمة المرور" />
            <input ref={r3} type="password" style={{ ...s.inp }} value={ap} onChange={e => { setAp(e.target.value); setErr(""); }} onKeyDown={e => e.key === "Enter" && goAdmin()} placeholder="••••••••" />
            {err && <ErrBox t={err} />}
            <PurpleBtn onClick={goAdmin} busy={busy} label="دخول لوحة الأدمن →" />
          </div>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════
// EMPLOYEE APP — Chat only
// ════════════════════════════════════════════════════════
function EmpApp({ emp, pool, onLogout }) {
  const [msgs, setMsgs] = useState([{ role: "assistant", time: ts(), text: `أهلاً ${emp.name}! 👋\nأنا نور، مساعدة HR لمجموعة Egytrans NOSCO.\nاسألني عن الإجازات، الرواتب، البدلات، التأمين، أو أي إجراء HR 😊` }]);
  const [inp, setInp] = useState(""); const [busy, setBusy] = useState(false); const [hist, setHist] = useState([]);
  const btm = useRef();
  useEffect(() => { btm.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, busy]);

  const send = async (t) => {
    const q = t || inp.trim(); if (!q || busy) return; setInp("");
    const tm = ts();
    setMsgs(p => [...p, { role: "user", time: tm, text: q }]); setBusy(true);
    const ctx = search(q, pool);
    const nh = [...hist, { role: "user", content: q }];
    try {
      const reply = await ask(nh, buildSys(emp, ctx));
      setMsgs(p => [...p, { role: "assistant", time: ts(), text: reply, refs: ctx.map(c => c.src) }]);
      setHist([...nh, { role: "assistant", content: reply }]);
    } catch { setMsgs(p => [...p, { role: "assistant", time: ts(), text: "⚠️ خطأ في الاتصال. تواصل مع HR: hr.manager@egytrans.com" }]); }
    setBusy(false);
  };

  const quickQs = ["كم يوم إجازة سنوية لي؟", "سياسة الإجازة المرضية", "امتى موعد الراتب؟", "ما البدلات المتاحة؟", "ازاي أطلب شهادة راتب؟"];

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "linear-gradient(160deg,#060e1a,#0b1a2e 60%,#06100e)", fontFamily: "'Cairo',sans-serif" }}>
      {/* Header */}
      <div style={{ background: "rgba(10,22,38,.97)", borderBottom: "1px solid rgba(200,169,110,.18)", padding: "10px 16px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <img src={LOGO} alt="" style={{ width: 40, height: 40, background: "#fff", borderRadius: 10, padding: 4, objectFit: "contain", flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 900, background: `linear-gradient(90deg,${s.gold},#f0d898,${s.gold})`, backgroundSize: "200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "eg-shim 4s linear infinite" }}>Egytrans NOSCO — نور HR</div>
          <div style={{ fontSize: 11, color: s.teal, display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.teal, display: "inline-block" }} />
            {emp.name} · {emp.company}
          </div>
        </div>
        <button onClick={onLogout} style={{ background: "rgba(200,169,110,.08)", border: "1px solid rgba(200,169,110,.2)", borderRadius: 9, color: s.gold, padding: "5px 12px", cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>خروج</button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px 4px" }}>
        {msgs.map((m, i) => {
          const isBot = m.role === "assistant";
          const rtl = /[\u0600-\u06FF]/.test(m.text);
          return (
            <div key={i} style={{ display: "flex", gap: 8, flexDirection: isBot ? "row" : "row-reverse", marginBottom: 12, animation: "eg-up .3s ease-out" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", flexShrink: 0, overflow: "hidden", background: "#fff" }}>
                {isBot ? <img src={LOGO} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 3 }} /> : <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#0d5c3a,#2a9d6f)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 700 }}>{emp.name[0]}</div>}
              </div>
              <div style={{ maxWidth: "78%" }}>
                <div style={{ fontSize: 10, color: "#4a6080", textAlign: isBot ? "left" : "right", marginBottom: 3 }}>{isBot ? "نور HR" : "أنت"} · {m.time}</div>
                <div style={{ padding: "10px 14px", borderRadius: isBot ? "4px 16px 16px 16px" : "16px 4px 16px 16px", background: isBot ? "linear-gradient(135deg,#192d48,#122035)" : "linear-gradient(135deg,#0d3c2b,#0a2f20)", color: "#dde8f4", border: isBot ? "1px solid rgba(200,169,110,.12)" : "1px solid rgba(42,157,111,.17)", fontSize: 13.5, lineHeight: 1.75, direction: rtl ? "rtl" : "ltr", textAlign: rtl ? "right" : "left", whiteSpace: "pre-wrap", fontFamily: "'Cairo',inherit" }}>{m.text}</div>
                {m.refs?.length > 0 && <div style={{ fontSize: 10, color: "rgba(42,157,111,.5)", marginTop: 3 }}>📎 {[...new Set(m.refs)].join(" · ")}</div>}
              </div>
            </div>
          );
        })}
        {busy && (
          <div style={{ display: "flex", gap: 8, marginBottom: 12, animation: "eg-up .3s ease-out" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#fff", overflow: "hidden", flexShrink: 0 }}><img src={LOGO} style={{ width: "100%", objectFit: "contain", padding: 3 }} /></div>
            <div style={{ padding: "12px 16px", borderRadius: "4px 16px 16px 16px", background: "linear-gradient(135deg,#192d48,#122035)", border: "1px solid rgba(200,169,110,.12)", display: "flex", gap: 5, alignItems: "center" }}>
              {[0, 1, 2].map(i => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: s.gold, animation: "eg-dot 1.2s infinite", animationDelay: `${i * .2}s` }} />)}
            </div>
          </div>
        )}
        <div ref={btm} />
      </div>

      {/* Quick questions */}
      <div style={{ display: "flex", gap: 6, padding: "6px 12px", overflowX: "auto", scrollbarWidth: "none", flexShrink: 0 }}>
        {quickQs.map((q, i) => (
          <button key={i} onClick={() => send(q)} style={{ flexShrink: 0, padding: "5px 12px", borderRadius: 20, border: "1px solid rgba(200,169,110,.22)", background: "rgba(200,169,110,.07)", color: s.gold, fontSize: 11, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit" }}>{q}</button>
        ))}
      </div>

      {/* Input */}
      <div style={{ padding: "8px 12px 18px", flexShrink: 0 }}>
        {!pool.length && <div style={{ background: "rgba(200,169,110,.06)", border: "1px solid rgba(200,169,110,.15)", borderRadius: 8, padding: "6px 12px", fontSize: 11, color: s.gold, marginBottom: 7, textAlign: "center" }}>⚠️ لا توجد مستندات — يرجى من الأدمن رفع سياسات HR</div>}
        <div style={{ display: "flex", gap: 8, background: "rgba(255,255,255,.04)", border: "1px solid rgba(200,169,110,.2)", borderRadius: 13, padding: "7px 7px 7px 14px", alignItems: "flex-end" }}>
          <textarea value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} disabled={busy} rows={1}
            placeholder="اكتب سؤالك... | Type your question..."
            style={{ flex: 1, background: "transparent", border: "none", color: "#e8eef4", fontSize: 14, fontFamily: "inherit", resize: "none", maxHeight: 88, lineHeight: 1.6, direction: "auto", outline: "none" }} />
          <button onClick={() => send()} disabled={busy || !inp.trim()} style={{ width: 36, height: 36, borderRadius: 10, border: "none", background: busy || !inp.trim() ? "rgba(200,169,110,.15)" : `linear-gradient(135deg,${s.gold},#a07840)`, color: "#0a1628", cursor: busy || !inp.trim() ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>
            {busy ? <Spin size={14} /> : "↑"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════
// ADMIN APP
// ════════════════════════════════════════════════════════
function AdminApp({ docs, emps, admin, saveDocs, saveEmps, saveAdmin, onLogout }) {
  const [tab, setTab] = useState("files");
  const TABS = [{ id: "files", ic: "📂", l: "رفع الملفات" }, { id: "emps", ic: "👥", l: "الموظفون" }, { id: "settings", ic: "⚙️", l: "الإعدادات" }];

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "linear-gradient(160deg,#07081a,#0e1330 55%,#07100e)", fontFamily: "'Cairo',sans-serif" }}>
      {/* Admin Header */}
      <div style={{ background: "rgba(14,19,50,.97)", borderBottom: "1px solid rgba(124,58,237,.22)", padding: "10px 16px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <img src={LOGO} alt="" style={{ width: 40, height: 40, background: "#fff", borderRadius: 10, padding: 4, objectFit: "contain", flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 900, background: `linear-gradient(90deg,${s.purple},#c4b5fd,${s.purple})`, backgroundSize: "200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "eg-shim 4s linear infinite" }}>لوحة تحكم الأدمن — Egytrans NOSCO HR</div>
          <div style={{ fontSize: 11, color: "rgba(139,92,246,.7)" }}>
            📄 {docs.length} مستند · 👥 {emps.length} موظف · 🧩 {docs.reduce((n, d) => n + d.chunks.length, 0)} قطعة RAG
          </div>
        </div>
        <div style={{ background: "rgba(124,58,237,.14)", border: "1px solid rgba(124,58,237,.28)", borderRadius: 8, padding: "3px 10px", fontSize: 11, color: s.purple, fontWeight: 700 }}>ADMIN</div>
        <button onClick={onLogout} style={{ background: "rgba(200,169,110,.08)", border: "1px solid rgba(200,169,110,.2)", borderRadius: 9, color: s.gold, padding: "5px 12px", cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>خروج</button>
      </div>

      {/* Tabs */}
      <div style={{ background: "rgba(14,19,50,.6)", borderBottom: "1px solid rgba(124,58,237,.1)", display: "flex", padding: "0 12px", flexShrink: 0, overflowX: "auto" }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "11px 15px", border: "none", background: "transparent", fontFamily: "inherit", fontWeight: tab === t.id ? 700 : 400, fontSize: 13, cursor: "pointer", color: tab === t.id ? s.purple : "rgba(255,255,255,.35)", borderBottom: `2px solid ${tab === t.id ? s.purple : "transparent"}`, display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap", transition: "all .2s" }}>
            <span>{t.ic}</span>{t.l}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {tab === "files" && <FilesTab docs={docs} save={saveDocs} />}
        {tab === "emps" && <EmpsTab emps={emps} save={saveEmps} />}
        {tab === "settings" && <SettingsTab admin={admin} save={saveAdmin} />}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════
// FILES TAB (simplified for brevity)
// ════════════════════════════════════════════════════════
function FilesTab({ docs, save }) {
  const [view, setView] = useState("list");
  const [nm, setNm] = useState(""); const [tx, setTx] = useState("");

  const addDoc = async () => {
    if (!nm.trim() || !tx.trim()) return;
    await save([...docs, { id: Date.now().toString(), name: nm.trim(), chunks: chunk(tx), size: tx.length, date: new Date().toLocaleDateString("ar-EG") }]);
    setNm(""); setTx(""); setView("list");
  };

  const totChunks = docs.reduce((n, d) => n + d.chunks.length, 0);

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
      {view === "list" ? (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
            {[["📄", docs.length, "المستندات", s.gold], ["🧩", totChunks, "قطع RAG", "#7eb8f7"], ["💾", (docs.reduce((n, d) => n + d.size, 0) / 1000).toFixed(1) + "K", "الحجم", s.teal]].map(([ic, v, l, c], i) => (
              <div key={i} style={{ background: "rgba(255,255,255,.03)", border: `1px solid ${c}22`, borderRadius: 12, padding: "12px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 20 }}>{ic}</div>
                <div style={{ fontSize: 21, fontWeight: 900, color: c }}>{v}</div>
                <div style={{ fontSize: 9, color: `${c}88`, marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
          <PurpleBtn onClick={() => setView("add")} label="＋ رفع مستند جديد" full />
          <div style={{ marginTop: 14 }}>
            {docs.map(d => (
              <div key={d.id} style={{ background: "rgba(124,58,237,.04)", border: "1px solid rgba(124,58,237,.14)", borderRadius: 12, padding: "11px 13px", display: "flex", alignItems: "center", gap: 11, marginBottom: 8 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg,#1a1040,#2d1870)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>📄</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#dde8f4", fontWeight: 700, fontSize: 13 }}>{d.name}</div>
                  <div style={{ fontSize: 11, color: "rgba(139,92,246,.5)", marginTop: 2 }}>{d.chunks.length} قطعة · {(d.size / 1000).toFixed(1)}K</div>
                </div>
                <button onClick={() => save(docs.filter(x => x.id !== d.id))} style={{ background: "rgba(224,92,92,.1)", border: "1px solid rgba(224,92,92,.2)", borderRadius: 7, color: s.red, padding: "5px 10px", cursor: "pointer", fontSize: 12 }}>🗑️</button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
          <button onClick={() => setView("list")} style={{ background: "rgba(200,169,110,.08)", border: "1px solid rgba(200,169,110,.2)", borderRadius: 9, color: s.gold, padding: "6px 13px", cursor: "pointer", fontSize: 13, marginBottom: 16 }}>← رجوع</button>
          <Label t="اسم المستند *" />
          <input style={{ ...s.inp, marginTop: 4, marginBottom: 12 }} value={nm} onChange={e => setNm(e.target.value)} placeholder="مثال: لائحة الإجازات 2025" />
          <Label t="محتوى المستند *" />
          <textarea value={tx} onChange={e => setTx(e.target.value)} rows={9} style={{ ...s.inp, resize: "vertical", marginTop: 5, marginBottom: 6 }} />
          <PurpleBtn onClick={addDoc} label="💾 حفظ المستند" full />
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════
// EMPLOYEES TAB (simplified for brevity)
// ════════════════════════════════════════════════════════
function EmpsTab({ emps, save }) {
  const [view, setView] = useState("list");
  const [f, setF] = useState({ empId: "", name: "", job: "", company: "Egytrans", pin: "" });

  const add = async () => {
    if (!f.empId.trim() || !f.name.trim() || !f.pin.trim()) return;
    if (emps.find(e => e.empId === f.empId.trim())) return;
    await save([...emps, { ...f, id: Date.now().toString() }]);
    setF({ empId: "", name: "", job: "", company: "Egytrans", pin: "" }); 
    setView("list");
  };

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
      {view === "list" ? (
        <>
          <PurpleBtn onClick={() => setView("add")} label="＋ إضافة موظف" full />
          <div style={{ marginTop: 14 }}>
            {emps.map(e => (
              <div key={e.id} style={{ background: "rgba(200,169,110,.04)", border: "1px solid rgba(200,169,110,.1)", borderRadius: 12, padding: "11px 13px", display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#1a3a5c,#2a9d6f)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 900, color: "#fff" }}>{e.name[0]}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#dde8f4", fontWeight: 700, fontSize: 13 }}>{e.name}</div>
                  <div style={{ fontSize: 11, color: "rgba(200,169,110,.5)", marginTop: 1 }}>{e.empId} · {e.company}</div>
                </div>
                <button onClick={() => save(emps.filter(x => x.id !== e.id))} style={{ background: "rgba(224,92,92,.1)", border: "1px solid rgba(224,92,92,.2)", borderRadius: 7, color: s.red, padding: "5px 10px", cursor: "pointer", fontSize: 12 }}>🗑️</button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
          <button onClick={() => setView("list")} style={{ background: "rgba(200,169,110,.08)", border: "1px solid rgba(200,169,110,.2)", borderRadius: 9, color: s.gold, padding: "6px 13px", cursor: "pointer", fontSize: 13, marginBottom: 16 }}>← رجوع</button>
          {[["empId", "رقم الموظف *", "EGY-001"], ["name", "الاسم *", "محمد أحمد"]].map(([k, l, p]) => (
            <div key={k} style={{ marginBottom: 12 }}><Label t={l} /><input style={{ ...s.inp, marginTop: 4 }} value={f[k]} onChange={e => setF(p => ({ ...p, [k]: e.target.value }))} placeholder={p} /></div>
          ))}
          <Label t="الرقم السري *" />
          <input type="password" style={{ ...s.inp, marginTop: 4, marginBottom: 12 }} value={f.pin} onChange={e => setF(p => ({ ...p, pin: e.target.value }))} placeholder="••••••" />
          <PurpleBtn onClick={add} label="💾 حفظ الموظف" full />
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════
// DEPLOY TAB & SETTINGS TAB (Simplified Stubs)
// ════════════════════════════════════════════════════════
function DeployTab() {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 16, fontFamily: "'Cairo',sans-serif" }}>
      <div style={{ background: "rgba(124,58,237,.1)", border: "1px solid rgba(124,58,237,.3)", borderRadius: 12, padding: "16px", color: "rgba(139,92,246,.9)", lineHeight: 1.8 }}>
        <div style={{ fontSize: 14, fontWeight: 900, marginBottom: 12 }}>🚀 دليل النشر</div>
        <div style={{ fontSize: 13 }}>
          1. اضغط على <b>Code</b> في GitHub Repository<br/>
          2. انسخ رابط HTTPS<br/>
          3. اذهب إلى <b>vercel.com</b> وابدأ مشروع جديد<br/>
          4. صقّ رابط Repository<br/>
          5. أضفف متغير البيئة: VITE_ANTHROPIC_KEY<br/>
          6. اضغط Deploy<br/>
          <br/>
          <b>✅ انتهيت! الموقع سيكون متاح على: your-vercel-url.vercel.app</b>
        </div>
      </div>
    </div>
  );
}

function SettingsTab({ admin, save }) {
  const [u, setU] = useState(admin.user);
  const [p, setP] = useState("");

  const update = async () => {
    if (!u.trim()) return;
    await save({ user: u.trim(), pass: p || admin.pass });
    setP("");
  };

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
      <div style={{ maxWidth: 420 }}>
        <Label t="اسم المستخدم" />
        <input style={{ ...s.inp, marginTop: 4, marginBottom: 12 }} value={u} onChange={e => setU(e.target.value)} />
        <Label t="كلمة المرور الجديدة" />
        <input type="password" style={{ ...s.inp, marginTop: 4, marginBottom: 12 }} value={p} onChange={e => setP(e.target.value)} placeholder="اتركها فارغة إذا لا تريد التغيير" />
        <PurpleBtn onClick={update} label="💾 حفظ" full />
      </div>
    </div>
  );
}

// ── shared atoms ────────────────────────────────────────
function Label({ t }) { return <label style={{ fontSize: 12, color: "rgba(200,169,110,.72)", fontWeight: 700, display: "block" }}>{t}</label>; }
function ErrBox({ t }) { return <div style={{ background: "rgba(224,92,92,.1)", border: "1px solid rgba(224,92,92,.25)", borderRadius: 8, padding: "8px 12px", fontSize: 13, color: s.red, textAlign: "center" }}>{t}</div>; }
function GoldBtn({ onClick, busy, label }) { return <button onClick={onClick} disabled={busy} style={{ width: "100%", padding: "13px", fontSize: 15, borderRadius: 12, background: `linear-gradient(135deg,${s.gold},#a07840)`, border: "none", color: "#0a1628", fontFamily: "inherit", fontWeight: 700, cursor: "pointer", opacity: busy ? .6 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>{busy ? <>جاري...</> : label}</button>; }
function PurpleBtn({ onClick, busy, label, full }) { return <button onClick={onClick} disabled={busy} style={{ width: full ? "100%" : "auto", padding: "11px 18px", fontSize: 14, borderRadius: 11, background: `linear-gradient(135deg,${s.purple},#5b21b6)`, border: "none", color: "#fff", fontFamily: "inherit", fontWeight: 700, cursor: "pointer", opacity: busy ? .6 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 2px 12px rgba(124,58,237,.3)" }}>{busy ? <>جاري...</> : label}</button>; }
