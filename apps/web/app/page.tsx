"use client";

import { useState } from "react";
import { ageBands, subjects, getQuestions } from "@kids-genius/learning";

type Lang = "en" | "te";

const copy = {
  en: {
    tagline: "A little learning. A lot of wonder.",
    hero: "Big dreams begin with curious minds.",
    intro: "A joyful world of stories, games and discoveries made for growing minds.",
    start: "Start learning", daily: "Today's little mission", dailyText: "Solve one fun question and earn your first star.",
    levels: "Find your adventure", subjects: "Explore the world", quiz: "Quick brain boost",
    choose: "Pick the answer you think is right.", correct: "Brilliant! You got it! 🌟",
    wrong: "Nice try! Every attempt helps you grow.", next: "Try another question",
    progress: "Your learning journey", streak: "Day streak", stars: "Stars earned", topics: "Learning worlds",
    parent: "For grown-ups", parentText: "A calm space for parents to follow progress and manage a safe learning experience.",
    parentCta: "Parent zone", safe: "Safe by design", safeText: "Parent-managed profiles · No public chat · No behavioural ads",
    footer: "Curiosity is your superpower. Keep exploring!"
  },
  te: {
    tagline: "చిన్న చిన్న పాఠాలు. ఎన్నో అద్భుతాలు.",
    hero: "ఆసక్తితో నేర్చుకుంటే కలలు నిజమవుతాయి.",
    intro: "పిల్లల కోసం కథలు, ఆటలు మరియు కొత్త విషయాలతో నిండిన ఆనంద ప్రపంచం.",
    start: "నేర్చుకోవడం ప్రారంభించండి", daily: "ఈరోజు చిన్న లక్ష్యం", dailyText: "ఒక సరదా ప్రశ్నకు సమాధానం చెప్పి మీ మొదటి నక్షత్రాన్ని పొందండి.",
    levels: "మీ సాహసాన్ని ఎంచుకోండి", subjects: "ప్రపంచాన్ని తెలుసుకోండి", quiz: "చిన్న మెదడు వ్యాయామం",
    choose: "మీకు సరైనదనిపించిన సమాధానాన్ని ఎంచుకోండి.", correct: "అద్భుతం! సరైన సమాధానం! 🌟",
    wrong: "పర్లేదు! ప్రతి ప్రయత్నం మిమ్మల్ని మెరుగుపరుస్తుంది.", next: "మరో ప్రశ్న ప్రయత్నించండి",
    progress: "మీ అభ్యాస ప్రయాణం", streak: "వరుస రోజులు", stars: "సంపాదించిన నక్షత్రాలు", topics: "అభ్యాస ప్రపంచాలు",
    parent: "పెద్దల కోసం", parentText: "పిల్లల అభ్యాస పురోగతిని చూడటానికి, సురక్షిత అనుభవాన్ని నిర్వహించడానికి తల్లిదండ్రుల విభాగం.",
    parentCta: "తల్లిదండ్రుల విభాగం", safe: "భద్రతే మా ప్రాధాన్యత", safeText: "తల్లిదండ్రుల నిర్వహణలో ప్రొఫైల్స్ · పబ్లిక్ చాట్ లేదు · ప్రవర్తనా ప్రకటనలు లేవు",
    footer: "ఆసక్తే మీ ప్రత్యేక శక్తి. నేర్చుకుంటూ ముందుకు సాగండి!"
  }
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [ageId, setAgeId] = useState<string>("little-learners");
  const [subjectId, setSubjectId] = useState<string>("math");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [stars, setStars] = useState(0);
  const t = copy[lang];
  const activeAge = ageBands.find((a) => a.id === ageId) ?? ageBands[1];
  const activeSubject = subjects.find((s) => s.id === subjectId) ?? subjects[1];
  const questions = getQuestions(ageId, subjectId);
  const questionText = questions[questionIndex % questions.length];
  const isRight = answer === questionText.correctChoiceIndex;

  function chooseAnswer(index: number) {
    if (answer !== null) return;
    setAnswer(index);
    if (index === questionText.correctChoiceIndex) setStars((value) => value + 1);
  }
  function nextQuestion() {
    setQuestionIndex((value) => value + 1);
    setAnswer(null);
  }

  return (
    <main className="site-shell">
      <header className="nav">
        <a className="brand" href="#" aria-label="Kids Genius home"><span className="brand-mark">✦</span><span>kids<span className="brand-accent">genius</span></span></a>
        <nav className="nav-links"><a href="#adventures">Adventures</a><a href="#subjects">Subjects</a><a href="#parents">Parents</a></nav>
        <div className="nav-actions">
          <button className="language-toggle" onClick={() => setLang(lang === "en" ? "te" : "en")} aria-label="Switch language">{lang === "en" ? "తెలుగు" : "English"} <span>⌄</span></button>
          <a className="parent-link" href="#parents">For parents ↗</a>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="live-dot" /> {t.tagline}</div>
          <h1>{t.hero} <span className="headline-spark">✦</span></h1>
          <p>{t.intro}</p>
          <div className="hero-buttons"><a className="primary-button" href="#adventures">{t.start} <span>→</span></a><a className="text-button" href="#quick-quiz">Try a mini quiz <span>↗</span></a></div>
          <div className="hero-proof"><div className="avatar-stack"><span>🦊</span><span>🐼</span><span>🐸</span></div><span>Made for curious kids <b>ages 1–10</b></span></div>
        </div>
        <div className="hero-art" aria-label="Illustration of a happy learning planet">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="planet">🌎</div><div className="float-card card-star">⭐ <b>Shine bright!</b></div><div className="float-card card-book">📚 <b>Explore</b></div><div className="float-card card-rocket">🚀</div><div className="spark spark-a">✦</div><div className="spark spark-b">✧</div>
        </div>
        <div className="hero-bottom"><span>✳ Learn at your own pace</span><span>✳ English + తెలుగు</span><span>✳ Playful and safe</span></div>
      </section>

      <section className="mission-strip">
        <div className="mission-icon">🎯</div><div className="mission-copy"><span className="section-kicker">{t.daily}</span><b>{t.dailyText}</b></div><div className="mission-reward"><span>⭐</span><b>+1 star</b></div>
      </section>

      <section className="section-block" id="adventures">
        <div className="section-heading"><div><span className="section-kicker">MADE FOR EVERY LITTLE LEARNER</span><h2>{t.levels}</h2><p>Every age has a new world to discover.</p></div><span className="heading-doodle">✳</span></div>
        <div className="age-grid">{ageBands.map((age, index) => <button key={age.id} className={`age-card age-${index} ${ageId === age.id ? "selected" : ""}`} onClick={() => { setAgeId(age.id); setQuestionIndex(0); setAnswer(null); }}><span className="age-emoji">{age.emoji}</span><span className="age-range">AGES {age.minAge}–{age.maxAge}</span><b>{age.name}</b><small>{age.description}</small><span className="age-arrow">↗</span></button>)}</div>
        <div className="selected-note"><span>✨</span> Your path: <b>{activeAge.name}</b> <span>·</span> {activeAge.description}</div>
      </section>

      <section className="section-block subjects-section" id="subjects">
        <div className="section-heading"><div><span className="section-kicker">A UNIVERSE OF IDEAS</span><h2>{t.subjects}</h2><p>Choose what makes you curious today.</p></div><a className="view-all" href="#quick-quiz">Jump into a quiz ↗</a></div>
        <div className="subject-grid">{subjects.map((subject, index) => <button key={subject.id} onClick={() => { setSubjectId(subject.id); setQuestionIndex(0); setAnswer(null); }} className={`subject-card subject-${index} ${subjectId === subject.id ? "subject-active" : ""}`}><span className="subject-emoji">{subject.emoji}</span><span><b>{subject.name[lang]}</b><small>{subject.description}</small></span><span className="subject-arrow">↗</span></button>)}</div>
      </section>

      <section className="play-section" id="quick-quiz">
        <div className="play-intro"><span className="section-kicker">READY, SET, THINK!</span><h2>{t.quiz}</h2><p>{t.choose}</p><div className="quiz-meta"><span>🧠 {activeSubject.name[lang]}</span><span>⏱ No rush</span></div><div className="progress-label"><span>Little steps make big progress</span><b>{stars} ⭐</b></div><div className="progress-track"><span style={{width: `${Math.min(100, stars * 12)}%`}} /></div></div>
        <div className="quiz-card"><div className="quiz-top"><span>QUESTION {questionIndex + 1}</span><span className="quiz-points">⭐ +1 star</span></div><div className="quiz-step-track" aria-label={`Question ${questionIndex + 1}`}><span style={{width: `${((questionIndex % 5) + 1) * 20}%`}} /></div>{ageId === "tiny-explorers" && <div className="parent-play-note">🤝 Parent & little explorer: enjoy this together. No timer, no pressure.</div>}<div className="quiz-question">{questionText.prompt[lang]}</div><div className="quiz-options">{questionText.choices.map((choice, index) => <button key={index} disabled={answer !== null} onClick={() => chooseAnswer(index)} className={`quiz-option ${answer === index ? (isRight ? "answer-correct" : "answer-wrong") : ""} ${answer !== null && index === questionText.correctChoiceIndex ? "answer-reveal" : ""}`}><span className="option-letter">{String.fromCharCode(65 + index)}</span>{choice[lang]}<span className="option-check">{answer !== null && index === questionText.correctChoiceIndex ? "✓" : "→"}</span></button>)}</div>{answer !== null && <div className={`answer-feedback ${isRight ? "feedback-good" : "feedback-try"}`}>{isRight ? t.correct : t.wrong}<small className="answer-explanation">{questionText.explanation[lang]}</small></div>}<div className="quiz-bottom"><span>🌱 Learning grows with practice</span><button onClick={nextQuestion} disabled={answer === null}>{t.next} →</button></div></div>
      </section>

      <section className="stats-section"><div><span className="section-kicker">SMALL WINS, BIG SMILES</span><h2>{t.progress}</h2><p>Celebrate every step, at every pace.</p></div><div className="stat-card"><span>🔥</span><b>0</b><small>{t.streak}</small></div><div className="stat-card"><span>⭐</span><b>{stars}</b><small>{t.stars}</small></div><div className="stat-card"><span>🌈</span><b>{subjects.length}</b><small>{t.topics}</small></div></section>

      <section className="parent-section" id="parents"><div className="parent-illustration">🧑‍🚀<span>🛡️</span></div><div><span className="section-kicker">A LITTLE PEACE OF MIND</span><h2>{t.parent}</h2><p>{t.parentText}</p><span className="parent-button">Parent dashboard · coming soon</span></div><div className="parent-badge">🛡️ <b>Kid-first</b><small>Always</small></div></section>

      <footer className="footer"><a className="brand" href="#"><span className="brand-mark">✦</span><span>kids<span className="brand-accent">genius</span></span></a><p>{t.footer}</p><div className="safety-line">🔒 {t.safe} — {t.safeText}</div><small>© {new Date().getFullYear()} Kids Genius. Made for growing minds.</small></footer>
    </main>
  );
}
