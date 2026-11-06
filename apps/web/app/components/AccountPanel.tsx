"use client";

import { useEffect, useState } from "react";
import type { Language } from "@kids-genius/learning";

type Child = { id: string; nickname: string };
type Snapshot = { child_id: string; subject_id: string; grade_id: string; stars_earned: number; lessons_completed: number; study_days: string[]; updated_at: string };
type Parent = { id: string; email: string; salt: string; hash: string };
const PARENT = "kids-genius-local-parent-v1";
const SESSION = "kids-genius-local-session-v1";
const CHILDREN = "kids-genius-local-children-v1";
const PROGRESS = "kids-genius-local-progress-v1";

async function digest(password: string, salt: string) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt: new TextEncoder().encode(salt), iterations: 150000, hash: "SHA-256" }, key, 256);
  return Array.from(new Uint8Array(bits), value => value.toString(16).padStart(2, "0")).join("");
}

type Props = { language: Language; grade: string; subject: string; stars: number; completedLessons: number; studyDays: string[] };

export default function AccountPanel({ language, grade, subject, stars, completedLessons, studyDays }: Props) {
  const te = language === "te";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [consent, setConsent] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [children, setChildren] = useState<Child[]>([]);
  const [childId, setChildId] = useState("");
  const [history, setHistory] = useState<Snapshot[]>([]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    try {
      const session = localStorage.getItem(SESSION);
      if (session) setUser(JSON.parse(session));
    } catch { setMessage("Could not read this device's account."); }
  }, []);

  useEffect(() => {
    if (!user) { setChildren([]); setChildId(""); setHistory([]); return; }
    try {
      const profiles = JSON.parse(localStorage.getItem(CHILDREN) || "[]") as Child[];
      setChildren(profiles);
      setChildId(current => profiles.some(item => item.id === current) ? current : (profiles[0]?.id || ""));
      const saved = JSON.parse(localStorage.getItem(PROGRESS) || "[]") as Snapshot[];
      setHistory(saved.filter(item => profiles.some(child => child.id === item.child_id)));
    } catch { setMessage("Could not read saved learner data."); }
  }, [user]);

  async function authenticate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (mode === "signup" && !consent) { setMessage(te ? "తల్లిదండ్రుల సమ్మతి అవసరం." : "Please confirm that you are the parent or guardian."); return; }
    setBusy(true); setMessage("");
    try {
      const raw = localStorage.getItem(PARENT);
      const saved = raw ? JSON.parse(raw) as Parent : null;
      const normalized = email.trim().toLowerCase();
      if (mode === "signup") {
        if (saved) { setMessage(te ? "ఈ పరికరంలో ఇప్పటికే ఖాతా ఉంది. లాగిన్ అవ్వండి." : "An account already exists on this device. Please sign in."); setBusy(false); return; }
        const salt = crypto.randomUUID();
        const account = { id: crypto.randomUUID(), email: normalized, salt, hash: await digest(password, salt) };
        localStorage.setItem(PARENT, JSON.stringify(account));
        const session = { id: account.id, email: account.email };
        localStorage.setItem(SESSION, JSON.stringify(session)); setUser(session);
        setMessage(te ? "తల్లిదండ్రుల ఖాతా సృష్టించబడింది." : "Parent account created on this device.");
      } else {
        if (!saved || saved.email !== normalized || saved.hash !== await digest(password, saved.salt)) {
          setMessage(te ? "ఇమెయిల్ లేదా పాస్‌వర్డ్ సరిపోలలేదు." : "Email or password is incorrect."); setBusy(false); return;
        }
        const session = { id: saved.id, email: saved.email };
        localStorage.setItem(SESSION, JSON.stringify(session)); setUser(session);
        setMessage(te ? "లాగిన్ విజయవంతం." : "Signed in successfully.");
      }
    } catch { setMessage(te ? "ఈ బ్రౌజర్‌లో స్థానిక ఖాతా అందుబాటులో లేదు." : "Local account storage is unavailable in this browser."); }
    setBusy(false);
  }

  function signOut() { localStorage.removeItem(SESSION); setUser(null); setMessage(te ? "లాగ్ అవుట్ అయ్యారు." : "Signed out."); }

  function addChild(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!nickname.trim()) return;
    const child = { id: crypto.randomUUID(), nickname: nickname.trim() };
    const updated = [...children, child];
    localStorage.setItem(CHILDREN, JSON.stringify(updated));
    setChildren(updated); setChildId(child.id); setNickname("");
    setMessage(te ? "విద్యార్థి ప్రొఫైల్ సృష్టించబడింది." : "Learner profile created on this device.");
  }

  function saveProgress() {
    if (!childId) { setMessage(te ? "ముందుగా విద్యార్థి ప్రొఫైల్ సృష్టించండి." : "Create or select a learner profile first."); return; }
    const snapshot: Snapshot = { child_id: childId, subject_id: subject, grade_id: grade, stars_earned: stars, lessons_completed: completedLessons, study_days: studyDays, updated_at: new Date().toISOString() };
    const all = JSON.parse(localStorage.getItem(PROGRESS) || "[]") as Snapshot[];
    const updated = [snapshot, ...all.filter(item => !(item.child_id === childId && item.subject_id === subject && item.grade_id === grade))];
    localStorage.setItem(PROGRESS, JSON.stringify(updated)); setHistory(updated.filter(item => item.child_id === childId));
    setMessage(te ? "పురోగతి ఈ పరికరంలో సేవ్ అయింది." : "Progress saved on this device.");
  }

  const current = history.find(item => item.subject_id === subject && item.grade_id === grade);
  return (
    <section className="account-section" id="account">
      <div className="account-intro">
        <span className="section-kicker">{te ? "తల్లిదండ్రుల ఖాతా" : "PARENT & LEARNER ACCOUNT"}</span>
        <h2>{te ? "మీ అభ్యాస ప్రయాణాన్ని సేవ్ చేసుకోండి" : "Save every learning milestone"}</h2>
        <p>{te ? "తల్లిదండ్రులు ఖాతాను నిర్వహిస్తారు. ప్రతి పిల్లవాడికి ప్రత్యేక అభ్యాస ప్రొఫైల్ ఉంటుంది." : "Create a parent account and keep learner profiles on this device."}</p>
      </div>
      {!user ? <div className="account-card">
        <div className="account-tabs">
          <button className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>{te ? "లాగిన్" : "Parent login"}</button>
          <button className={mode === "signup" ? "active" : ""} onClick={() => setMode("signup")}>{te ? "ఖాతా సృష్టించండి" : "Create account"}</button>
        </div>
        <form onSubmit={authenticate} className="account-form">
          <label>{te ? "తల్లిదండ్రుల ఇమెయిల్" : "Parent email"}<input type="email" autoComplete="email" required value={email} onChange={event => setEmail(event.target.value)} placeholder="parent@example.com" /></label>
          <label>{te ? "పాస్‌వర్డ్" : "Password"}<input type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} minLength={8} required value={password} onChange={event => setPassword(event.target.value)} placeholder={te ? "కనీసం 8 అక్షరాలు" : "At least 8 characters"} /></label>
          {mode === "signup" && <label className="consent-row"><input type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)} />{te ? "నేను తల్లిదండ్రిని/సంరక్షకుడిని." : "I am the parent or guardian and consent to creating a supervised learner profile."}</label>}
          <button className="account-submit" disabled={busy}>{busy ? (te ? "దయచేసి వేచి ఉండండి…" : "Please wait…") : mode === "login" ? (te ? "లాగిన్" : "Sign in") : (te ? "ఖాతా సృష్టించండి" : "Create parent account")}</button>
        </form>
        <small className="account-footnote">{te ? "పిల్లలకు ప్రత్యేక ఇమెయిల్ అవసరం లేదు." : "Children do not need their own email or password."}</small>
      </div> : <div className="account-card signed-in">
        <div className="signed-in-top"><span className="account-avatar">👨‍👩‍👧</span><div><b>{te ? "తల్లిదండ్రుల ఖాతా" : "Parent account"}</b><small>{user.email}</small></div><button className="signout" onClick={signOut}>{te ? "లాగ్ అవుట్" : "Sign out"}</button></div>
        <div className="learner-picker"><label>{te ? "విద్యార్థి ప్రొఫైల్" : "Learner profile"}<select value={childId} onChange={event => setChildId(event.target.value)}><option value="">{te ? "ప్రొఫైల్ ఎంచుకోండి" : "Choose a learner"}</option>{children.map(child => <option key={child.id} value={child.id}>{child.nickname}</option>)}</select></label></div>
        <form className="add-child-form" onSubmit={addChild}><label>{te ? "పిల్లవాడి పేరు / ముద్దుపేరు" : "Learner nickname"}<input value={nickname} maxLength={24} required onChange={event => setNickname(event.target.value)} placeholder={te ? "ఉదా: చిన్నారి" : "e.g. Little Star"} /></label><button>{te ? "ప్రొఫైల్ సృష్టించండి" : "Create learner profile"}</button></form>
        <div className="account-progress"><span>⭐ <b>{current?.stars_earned ?? stars}</b><small>{te ? "నక్షత్రాలు" : "Stars"}</small></span><span>📚 <b>{current?.lessons_completed ?? completedLessons}</b><small>{te ? "పాఠాలు" : "Lessons"}</small></span><span>🔥 <b>{current?.study_days.length ?? studyDays.length}</b><small>{te ? "అభ్యాస రోజులు" : "Study days"}</small></span></div>
        <button className="account-submit save-progress" onClick={saveProgress}>{te ? "పురోగతిని సేవ్ చేయండి" : "Save progress to learner account"}</button>
        <div className="progress-history"><b>{te ? "అభ్యాస చరిత్ర" : "Learning history by class & subject"}</b>{history.length === 0 ? <small>{te ? "ఇంకా పురోగతి సేవ్ కాలేదు." : "No saved learning history yet."}</small> : history.slice(0, 8).map(item => <div className="progress-history-row" key={item.grade_id + item.subject_id}><span>{item.grade_id} · {item.subject_id.replace(/-/g, " ")}</span><b>⭐ {item.stars_earned} · 📚 {item.lessons_completed}</b><small>{new Date(item.updated_at).toLocaleDateString()}</small></div>)}</div>
        <p className="account-footnote">{te ? "ఇది ఈ పరికరంలో మాత్రమే పనిచేస్తుంది; ఇతర పరికరాలకు సమకాలీకరణ ఉండదు." : "Device-only account: it does not sync to other devices and may be lost if browser data is cleared."}</p>
      </div>}
      {message && <p className="account-status" role="status">{message}</p>}
      <p className="account-privacy">{te ? "పిల్లల వ్యక్తిగత వివరాలు కనిష్ఠంగా సేకరించండి. పబ్లిక్ ప్రొఫైల్‌లు లేదా చాట్ లేదు." : "Privacy-first: collect minimal learner information. No public child profiles or public chat."}</p>
    </section>
  );
}
