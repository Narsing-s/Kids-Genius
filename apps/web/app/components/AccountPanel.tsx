"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient, type User } from "@supabase/supabase-js";
import type { Language } from "@kids-genius/learning";

type Child = { id: string; nickname: string };
type Props = { language: Language; grade: string; subject: string; stars: number; completedLessons: number; studyDays: string[] };

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default function AccountPanel({ language, grade, subject, stars, completedLessons, studyDays }: Props) {
  const te = language === "te";
  const client = useMemo(() => supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null, []);
  const [user, setUser] = useState<User | null>(null);
  const [children, setChildren] = useState<Child[]>([]);
  const [childId, setChildId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [consent, setConsent] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!client) return;
    client.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data: listener } = client.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null));
    return () => listener.subscription.unsubscribe();
  }, [client]);

  useEffect(() => {
    if (!client || !user) { setChildren([]); setChildId(""); return; }
    let active = true;
    client.from("parent_accounts").upsert({ id: user.id, display_name: user.email?.split("@")[0] ?? "Parent" }).then(() => {});
    client.from("child_profiles").select("id,nickname").order("created_at", { ascending: true }).then(({ data, error }) => {
      if (!active) return;
      if (error) { setMessage(error.message); return; }
      const profiles = (data ?? []) as Child[];
      setChildren(profiles);
      setChildId(current => profiles.some(child => child.id === current) ? current : profiles[0]?.id ?? "");
    });
    return () => { active = false; };
  }, [client, user]);

  useEffect(() => {
    if (!client || !user || !childId) return;
    const completedDays = studyDays.length;
    client.from("learning_progress").upsert({
      child_id: childId,
      subject_id: subject,
      grade_id: grade,
      stars_earned: stars,
      lessons_completed: completedLessons,
      study_days: studyDays,
      questions_answered: 0,
      correct_answers: 0,
      updated_at: new Date().toISOString()
    }, { onConflict: "child_id,subject_id" }).then(({ error }) => {
      if (error) setMessage(te ? "పురోగతి సమకాలీకరణ కాలేదు. డేటాబేస్ మైగ్రేషన్ అమలు చేయండి." : "Progress could not sync yet. Apply the account migration in Supabase.");
    });
  }, [client, user, childId, subject, grade, stars, completedLessons, studyDays, te]);

  async function submitAuth(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!client) return;
    if (mode === "signup" && !consent) { setMessage(te ? "తల్లిదండ్రుల సమ్మతి అవసరం." : "Please confirm that you are the parent or guardian."); return; }
    setBusy(true); setMessage("");
    const result = mode === "signup"
      ? await client.auth.signUp({ email: email.trim(), password })
      : await client.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (result.error) { setMessage(result.error.message); return; }
    if (mode === "signup" && !result.data.session) setMessage(te ? "మీ ఇమెయిల్‌ను ధృవీకరించి, తర్వాత లాగిన్ అవ్వండి." : "Check your email to confirm the parent account, then sign in.");
    else setMessage(te ? "ఖాతా విజయవంతంగా కనెక్ట్ అయింది." : "Parent account connected.");
  }

  async function addChild(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!client || !nickname.trim()) return;
    setBusy(true); setMessage("");
    const { data, error } = await client.from("child_profiles").insert({ nickname: nickname.trim() }).select("id,nickname").single();
    setBusy(false);
    if (error) { setMessage(error.message); return; }
    const child = data as Child;
    setChildren(old => [...old, child]); setChildId(child.id); setNickname("");
    setMessage(te ? "విద్యార్థి ప్రొఫైల్ సృష్టించబడింది." : "Learner profile created.");
  }

  return (
    <section className="account-section" id="account">
      <div className="account-intro">
        <span className="section-kicker">{te ? "తల్లిదండ్రుల ఖాతా" : "PARENT & LEARNER ACCOUNT"}</span>
        <h2>{te ? "మీ అభ్యాస ప్రయాణాన్ని సేవ్ చేసుకోండి" : "Save every learning milestone"}</h2>
        <p>{te ? "తల్లిదండ్రులు ఖాతాను నిర్వహిస్తారు. ప్రతి పిల్లవాడికి ప్రత్యేక అభ్యాస ప్రొఫైల్ ఉంటుంది." : "A parent-managed account keeps each learner’s progress connected across visits and devices."}</p>
      </div>
      {!client ? <div className="account-message">{te ? "లాగిన్ ప్రారంభించడానికి Supabase URL మరియు anon key ను వెబ్ ఎన్విరాన్‌మెంట్ వేరియబుల్స్‌లో జోడించండి." : "Login is not configured yet. Add the Supabase URL and anon key to your web environment variables."}<code>NEXT_PUBLIC_SUPABASE_URL · NEXT_PUBLIC_SUPABASE_ANON_KEY</code></div> :
      !user ? <div className="account-card">
        <div className="account-tabs"><button className={mode==="login"?"active":""} onClick={()=>setMode("login")}>{te?"లాగిన్":"Parent login"}</button><button className={mode==="signup"?"active":""} onClick={()=>setMode("signup")}>{te?"ఖాతా సృష్టించండి":"Create account"}</button></div>
        <form onSubmit={submitAuth} className="account-form">
          <label>{te?"తల్లిదండ్రుల ఇమెయిల్":"Parent email"}<input type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="parent@example.com" /></label>
          <label>{te?"పాస్‌వర్డ్":"Password"}<input type="password" autoComplete={mode==="login"?"current-password":"new-password"} minLength={8} required value={password} onChange={e=>setPassword(e.target.value)} placeholder={te?"కనీసం 8 అక్షరాలు":"At least 8 characters"} /></label>
          {mode==="signup" && <label className="consent-row"><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} />{te?"నేను తల్లిదండ్రిని/సంరక్షకుడిని, పిల్లల ప్రొఫైల్‌ను నిర్వహించడానికి సమ్మతిస్తున్నాను.":"I am the parent or guardian and consent to creating a supervised learner profile."}</label>}
          <button className="account-submit" disabled={busy}>{busy?(te?"దయచేసి వేచి ఉండండి…":"Please wait…"):mode==="login"?(te?"లాగిన్":"Sign in"):(te?"తల్లిదండ్రుల ఖాతా సృష్టించండి":"Create parent account")}</button>
        </form>
        <small className="account-footnote">{te?"పిల్లల కోసం ప్రత్యేక పాస్‌వర్డ్ అవసరం లేదు. తల్లిదండ్రుల ఖాతా ద్వారా ప్రొఫైల్ నిర్వహించబడుతుంది.":"Children do not need their own email or password. A parent manages learner profiles."}</small>
      </div> : <div className="account-card signed-in">
        <div className="signed-in-top"><span className="account-avatar">👨‍👩‍👧</span><div><b>{te?"తల్లిదండ్రుల ఖాతా కనెక్ట్ అయింది":"Parent account connected"}</b><small>{user.email}</small></div><button className="signout" onClick={()=>client.auth.signOut()}>{te?"లాగ్ అవుట్":"Sign out"}</button></div>
        <div className="learner-picker"><label>{te?"విద్యార్థి ప్రొఫైల్":"Learner profile"}<select value={childId} onChange={e=>setChildId(e.target.value)}><option value="">{te?"ప్రొఫైల్ ఎంచుకోండి":"Choose a learner"}</option>{children.map(child=><option key={child.id} value={child.id}>{child.nickname}</option>)}</select></label></div>
        {children.length===0 && <form className="add-child-form" onSubmit={addChild}><label>{te?"పిల్లవాడి పేరు / ముద్దుపేరు":"Learner nickname"}<input value={nickname} maxLength={24} required onChange={e=>setNickname(e.target.value)} placeholder={te?"ఉదా: చిన్నారి":"e.g. Little Star"} /></label><button disabled={busy}>{te?"ప్రొఫైల్ సృష్టించండి":"Create learner profile"}</button></form>}
        {childId && <div className="account-progress"><span>⭐ <b>{stars}</b><small>{te?"నక్షత్రాలు":"Stars"}</small></span><span>📚 <b>{completedLessons}</b><small>{te?"పూర్తి చేసిన పాఠాలు":"Lessons completed"}</small></span><span>🔥 <b>{studyDays.length}</b><small>{te?"అభ్యాస రోజులు":"Study days"}</small></span></div>}
        <p className="account-footnote">{te?"ప్రస్తుత తరగతి మరియు విషయం ఆధారంగా పురోగతి మీ ఖాతాకు సమకాలీకరించబడుతుంది.":"Progress is synced for the selected learner, grade and subject. Use the same parent login on another device."}</p>
      </div>}
      {message && <p className="account-status" role="status">{message}</p>}
      <p className="account-privacy">{te?"పిల్లల వ్యక్తిగత వివరాలు కనిష్ఠంగా సేకరించండి. పబ్లిక్ ప్రొఫైల్‌లు లేదా చాట్ లేదు.":"Privacy-first: collect minimal learner information. No public child profiles or public chat."}</p>
    </section>
  );
}
