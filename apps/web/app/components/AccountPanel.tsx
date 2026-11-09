"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Language } from "@kids-genius/learning";
import { createSupabaseBrowserClient } from "../../lib/supabase";

type Child = { id: string; nickname: string };
type Snapshot = { child_id: string; subject_id: string; grade_id: string; stars_earned: number; lessons_completed: number; study_days: string[]; updated_at: string };
type Props = { language: Language; grade: string; subject: string; stars: number; completedLessons: number; studyDays: string[]; onAuthenticated?: () => void; onSignedOut?: () => void };

export default function AccountPanel({ language, grade, subject, stars, completedLessons, studyDays, onAuthenticated, onSignedOut }: Props) {
  const te = language === "te";
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [nickname, setNickname] = useState("");
  const [consent, setConsent] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [children, setChildren] = useState<Child[]>([]);
  const [childId, setChildId] = useState("");
  const [history, setHistory] = useState<Snapshot[]>([]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async (userId: string) => {
    if (!supabase) return;
    const [{ data: profiles, error: profileError }, { data: progress, error: progressError }] = await Promise.all([
      supabase.from("child_profiles").select("id,nickname").eq("parent_id", userId).order("created_at"),
      supabase.from("learning_progress").select("child_id,subject_id,grade_id,stars_earned,lessons_completed,study_days,updated_at"),
    ]);
    if (profileError) throw profileError;
    if (progressError) throw progressError;
    const nextChildren = (profiles ?? []) as Child[];
    setChildren(nextChildren);
    setHistory((progress ?? []) as Snapshot[]);
    setChildId((current) => nextChildren.some((item) => item.id === current) ? current : (nextChildren[0]?.id ?? ""));
  }, [supabase]);

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    let active = true;
    const initialise = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) { if (active) setMessage(error.message); }
      const current = data.session?.user;
      if (current && active) {
        setUser({ id: current.id, email: current.email ?? "" });
        try {
          const { error: parentError } = await supabase.from("parent_accounts").upsert({ id: current.id, display_name: current.user_metadata?.display_name ?? "Parent" });
          if (parentError) throw parentError;
          await loadData(current.id);
          if (active) onAuthenticated?.();
        } catch (loadError) {
          if (active) setMessage(loadError instanceof Error ? loadError.message : "Could not load parent data.");
        }
      }
      if (active) setLoading(false);
    };
    void initialise();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      if (!session?.user) { setUser(null); setChildren([]); setChildId(""); setHistory([]); return; }
      setUser({ id: session.user.id, email: session.user.email ?? "" });
      void loadData(session.user.id).catch((error: unknown) => { if (active) setMessage(error instanceof Error ? error.message : "Could not load parent data."); });
    });
    return () => { active = false; listener.subscription.unsubscribe(); };
  }, [supabase, loadData, onAuthenticated]);

  async function authenticate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) {
      setMessage(te ? "Supabase URL మరియు anon/publishable key ను deployment settings లో జోడించండి." : "Parent accounts are not configured. Add the Supabase URL and anon/publishable key to your deployment environment.");
      return;
    }
    if (mode === "signup" && !consent) { setMessage(te ? "తల్లిదండ్రుల సమ్మతి అవసరం." : "Please confirm that you are the parent or legal guardian."); return; }
    setBusy(true); setMessage("");
    try {
      const normalized = email.trim().toLowerCase();
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: normalized,
          password,
          options: { data: { display_name: displayName.trim() || "Parent", parental_consent: true, consent_version: "2026-11-09" } },
        });
        if (error) throw error;
        setMessage(data.session
          ? (te ? "తల్లిదండ్రుల ఖాతా సృష్టించబడింది." : "Parent account created successfully.")
          : (te ? "ఖాతా సృష్టించబడింది. ఇమెయిల్ ధృవీకరించి లాగిన్ అవ్వండి." : "Account created. Confirm your email, then sign in."));
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: normalized, password });
        if (error) throw error;
        setMessage(te ? "లాగిన్ విజయవంతం." : "Signed in successfully.");
        onAuthenticated?.();
      }
      setPassword("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : (te ? "లాగిన్ విఫలమైంది." : "Could not complete sign in."));
    } finally { setBusy(false); }
  }

  async function signOut() {
    if (!supabase) return;
    setBusy(true);
    const { error } = await supabase.auth.signOut();
    setBusy(false);
    if (error) { setMessage(error.message); return; }
    setUser(null); setChildren([]); setChildId(""); setHistory([]);
    setMessage(te ? "లాగ్ అవుట్ అయ్యారు." : "Signed out.");
    onSignedOut?.();
  }

  async function addChild(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase || !user || !nickname.trim()) return;
    setBusy(true); setMessage("");
    try {
      const { data, error } = await supabase.from("child_profiles").insert({ parent_id: user.id, nickname: nickname.trim() }).select("id,nickname").single();
      if (error) throw error;
      const child = data as Child;
      const { error: settingsError } = await supabase.from("parental_settings").insert({ child_id: child.id });
      if (settingsError) throw settingsError;
      setChildren((items) => [...items, child]); setChildId(child.id); setNickname("");
      setMessage(te ? "విద్యార్థి ప్రొఫైల్ సృష్టించబడింది." : "Learner profile created.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not create learner profile.");
    } finally { setBusy(false); }
  }

  async function saveProgress() {
    if (!supabase || !childId) { setMessage(te ? "ముందుగా విద్యార్థి ప్రొఫైల్ సృష్టించండి." : "Create or select a learner profile first."); return; }
    setBusy(true); setMessage("");
    const snapshot = { child_id: childId, subject_id: subject, grade_id: grade, stars_earned: stars, lessons_completed: completedLessons, study_days: studyDays, updated_at: new Date().toISOString() };
    try {
      const { error } = await supabase.from("learning_progress").upsert(snapshot, { onConflict: "child_id,subject_id,grade_id" });
      if (error) throw error;
      setHistory((items) => [snapshot, ...items.filter((item) => !(item.child_id === childId && item.subject_id === subject && item.grade_id === grade))]);
      setMessage(te ? "పురోగతి ఖాతాలో సేవ్ అయింది." : "Progress synced to the parent account.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save learning progress.");
    } finally { setBusy(false); }
  }

  const childHistory = history.filter((item) => item.child_id === childId);
  const current = childHistory.find((item) => item.subject_id === subject && item.grade_id === grade);

  // Automatically sync this learner's current class/subject progress. Merge counters
  // with saved values so a fresh browser session cannot accidentally lower progress.
  useEffect(() => {
    if (!supabase || !user || !childId) return;
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      const { data: saved, error: readError } = await supabase
        .from("learning_progress")
        .select("stars_earned,lessons_completed,study_days")
        .eq("child_id", childId)
        .eq("subject_id", subject)
        .eq("grade_id", grade)
        .maybeSingle();
      if (cancelled || readError) return;
      const savedDays = Array.isArray(saved?.study_days) ? saved.study_days as string[] : [];
      const merged = {
        child_id: childId,
        subject_id: subject,
        grade_id: grade,
        stars_earned: Math.max(stars, saved?.stars_earned ?? 0),
        lessons_completed: Math.max(completedLessons, saved?.lessons_completed ?? 0),
        study_days: Array.from(new Set([...savedDays, ...studyDays])),
        updated_at: new Date().toISOString(),
      };
      const { error } = await supabase.from("learning_progress").upsert(merged, { onConflict: "child_id,subject_id,grade_id" });
      if (!cancelled && !error) {
        setHistory((items) => [merged, ...items.filter((item) => !(item.child_id === childId && item.subject_id === subject && item.grade_id === grade))]);
      }
    }, 900);
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, [supabase, user, childId, grade, subject, stars, completedLessons, studyDays]);

  return (
    <section className="account-section" id="account">
      <div className="account-intro">
        <span className="section-kicker">{te ? "తల్లిదండ్రుల ఖాతా" : "PARENT & LEARNER ACCOUNT"}</span>
        <h2>{te ? "మీ అభ్యాస ప్రయాణాన్ని సేవ్ చేసుకోండి" : "Save every learning milestone"}</h2>
        <p>{te ? "తల్లిదండ్రులు ఖాతాను నిర్వహిస్తారు. ప్రతి పిల్లవాడికి ప్రత్యేక అభ్యాస ప్రొఫైల్ ఉంటుంది." : "Parent-managed accounts with separate learner profiles and cloud-synced progress."}</p>
      </div>
      {!user ? (
        <div className="account-card">
          <div className="account-tabs">
            <button type="button" className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>{te ? "లాగిన్" : "Parent login"}</button>
            <button type="button" className={mode === "signup" ? "active" : ""} onClick={() => setMode("signup")}>{te ? "ఖాతా సృష్టించండి" : "Create account"}</button>
          </div>
          <form onSubmit={authenticate} className="account-form">
            {mode === "signup" && <label>{te ? "తల్లిదండ్రుల పేరు (ఐచ్ఛికం)" : "Parent name (optional)"}<input value={displayName} maxLength={80} onChange={(event) => setDisplayName(event.target.value)} placeholder={te ? "మీ పేరు" : "Your name"} /></label>}
            <label>{te ? "తల్లిదండ్రుల ఇమెయిల్" : "Parent email"}<input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="parent@example.com" /></label>
            <label>{te ? "పాస్‌వర్డ్" : "Password"}<input type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} minLength={8} required value={password} onChange={(event) => setPassword(event.target.value)} placeholder={te ? "కనీసం 8 అక్షరాలు" : "At least 8 characters"} /></label>
            {mode === "signup" && <label className="consent-row"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />{te ? "నేను తల్లిదండ్రిని లేదా చట్టబద్ధ సంరక్షకుడిని. పిల్లల ప్రొఫైల్ సృష్టించడానికి సమ్మతి ఇస్తున్నాను." : "I am the parent or legal guardian and consent to creating a supervised learner profile."}</label>}
            <button type="submit" className="account-submit" disabled={busy || loading}>{busy ? (te ? "దయచేసి వేచి ఉండండి…" : "Please wait…") : mode === "login" ? (te ? "లాగిన్" : "Sign in") : (te ? "ఖాతా సృష్టించండి" : "Create parent account")}</button>
          </form>
          <small className="account-footnote">{te ? "పిల్లలకు ప్రత్యేక ఇమెయిల్ అవసరం లేదు." : "Children do not need their own email or password."}</small>
          {!supabase && <p className="account-status" role="status">{te ? "ఖాతా సేవ కోసం Supabase సెటప్ అవసరం." : "Account service requires Supabase environment variables before it can be used."}</p>}
        </div>
      ) : (
        <div className="account-card signed-in">
          <div className="signed-in-top"><span className="account-avatar">👨‍👩‍👧</span><div><b>{te ? "తల్లిదండ్రుల ఖాతా" : "Parent account"}</b><small>{user.email}</small></div><button type="button" className="signout" onClick={signOut} disabled={busy}>{te ? "లాగ్ అవుట్" : "Sign out"}</button></div>
          <div className="learner-picker"><label>{te ? "విద్యార్థి ప్రొఫైల్" : "Learner profile"}<select value={childId} onChange={(event) => setChildId(event.target.value)}><option value="">{te ? "ప్రొఫైల్ ఎంచుకోండి" : "Choose a learner"}</option>{children.map((child) => <option key={child.id} value={child.id}>{child.nickname}</option>)}</select></label></div>
          <form className="add-child-form" onSubmit={addChild}><label>{te ? "పిల్లవాడి పేరు / ముద్దుపేరు" : "Learner nickname"}<input value={nickname} maxLength={24} required onChange={(event) => setNickname(event.target.value)} placeholder={te ? "ఉదా: చిన్నారి" : "e.g. Little Star"} /></label><button type="submit" disabled={busy}>{te ? "ప్రొఫైల్ సృష్టించండి" : "Create learner profile"}</button></form>
          <div className="account-progress"><span>⭐ <b>{current?.stars_earned ?? stars}</b><small>{te ? "నక్షత్రాలు" : "Stars"}</small></span><span>📚 <b>{current?.lessons_completed ?? completedLessons}</b><small>{te ? "పాఠాలు" : "Lessons"}</small></span><span>🔥 <b>{current?.study_days.length ?? studyDays.length}</b><small>{te ? "అభ్యాస రోజులు" : "Study days"}</small></span></div>
          <button type="button" className="account-submit save-progress" onClick={saveProgress} disabled={busy || !childId}>{te ? "పురోగతిని సేవ్ చేయండి" : "Save progress to learner account"}</button>
          <div className="progress-history"><b>{te ? "అభ్యాస చరిత్ర" : "Learning history by class & subject"}</b>{childHistory.length === 0 ? <small>{te ? "ఇంకా పురోగతి సేవ్ కాలేదు." : "No saved learning history yet."}</small> : childHistory.slice(0, 12).map((item) => <div className="progress-history-row" key={item.grade_id + item.subject_id}><span>{item.grade_id} · {item.subject_id.replace(/-/g, " ")}</span><b>⭐ {item.stars_earned} · 📚 {item.lessons_completed}</b><small>{new Date(item.updated_at).toLocaleDateString()}</small></div>)}</div>
          <p className="account-footnote">{te ? "పురోగతి మీ తల్లిదండ్రుల ఖాతాలో సమకాలీకరించబడుతుంది." : "Progress is stored in your Supabase account and follows your sign-in across devices."}</p>
        </div>
      )}
      {message && <p className="account-status" role="status">{message}</p>}
      <p className="account-privacy">{te ? "పిల్లల వ్యక్తిగత వివరాలు కనిష్ఠంగా సేకరించండి. పబ్లిక్ ప్రొఫైల్‌లు లేదా చాట్ లేదు." : "Privacy-first: collect minimal learner information. No public child profiles or public chat."}</p>
    </section>
  );
}
