"use client";

import { useState } from "react";
import { gradeLevels, subjects, getQuestions } from "@kids-genius/learning";

type Lang = "en" | "te";

const lessonIdeas: Record<string, {en:string;te:string;detailEn:string;detailTe:string}[]> = {
 math:[{en:"Number patterns",te:"సంఖ్యల క్రమాలు",detailEn:"Spot patterns and build number sense.",detailTe:"క్రమాలను గుర్తించి సంఖ్యలపై అవగాహన పెంచుకోండి."},{en:"Everyday maths",te:"రోజువారీ గణితం",detailEn:"Use maths to solve real-life puzzles.",detailTe:"నిజ జీవిత సమస్యలను గణితంతో పరిష్కరించండి."},{en:"Think like a mathematician",te:"గణితవేత్తలా ఆలోచించండి",detailEn:"Try a challenge and explain your thinking.",detailTe:"సవాలును ప్రయత్నించి మీ ఆలోచనను వివరించండి."}],
 science:[{en:"Curious discoveries",te:"ఆసక్తికర ఆవిష్కరణలు",detailEn:"Ask questions about the world around you.",detailTe:"మీ చుట్టూ ఉన్న ప్రపంచం గురించి ప్రశ్నలు అడగండి."},{en:"Living world",te:"జీవ ప్రపంచం",detailEn:"Explore plants, animals and habitats.",detailTe:"మొక్కలు, జంతువులు, ఆవాసాలను తెలుసుకోండి."},{en:"Science in action",te:"ఆచరణలో విజ్ఞానం",detailEn:"Connect scientific ideas to daily life.",detailTe:"విజ్ఞాన భావనలను రోజువారీ జీవితంతో అనుసంధానించండి."}],
 language:[{en:"Words and meanings",te:"పదాలు మరియు అర్థాలు",detailEn:"Grow your vocabulary in both languages.",detailTe:"రెండు భాషల్లో పదజాలాన్ని పెంచుకోండి."},{en:"Read with confidence",te:"ఆత్మవిశ్వాసంతో చదవండి",detailEn:"Practice reading and understanding.",detailTe:"చదవడం, అర్థం చేసుకోవడం సాధన చేయండి."},{en:"Grammar studio",te:"వ్యాకరణ శాల",detailEn:"Build clear sentences step by step.",detailTe:"దశలవారీగా సరైన వాక్యాలు నిర్మించండి."}],
 computer:[{en:"Digital explorers",te:"డిజిటల్ అన్వేషకులు",detailEn:"Understand devices and digital safety.",detailTe:"పరికరాలు, డిజిటల్ భద్రత తెలుసుకోండి."},{en:"Coding logic",te:"కోడింగ్ తర్కం",detailEn:"Solve problems with step-by-step thinking.",detailTe:"దశలవారీ ఆలోచనతో సమస్యలు పరిష్కరించండి."},{en:"Create with technology",te:"సాంకేతికతతో సృష్టించండి",detailEn:"Plan a small creative project.",detailTe:"చిన్న సృజనాత్మక ప్రాజెక్ట్ రూపొందించండి."}]
};
const defaultLessons = [{en:"Discover the basics",te:"మౌలిక అంశాలను తెలుసుకోండి",detailEn:"Build understanding one idea at a time.",detailTe:"ఒక్కో భావనను అర్థం చేసుకుంటూ ముందుకు సాగండి."},{en:"Practice and apply",te:"సాధన చేసి అన్వయించండి",detailEn:"Use what you learn in a new situation.",detailTe:"నేర్చుకున్నదాన్ని కొత్త సందర్భంలో ఉపయోగించండి."},{en:"Challenge yourself",te:"మీకు మీరే సవాలు",detailEn:"Try a deeper question and explain why.",detailTe:"లోతైన ప్రశ్నను ప్రయత్నించి కారణం వివరించండి."}];


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
  const [ageId, setAgeId] = useState<string>("class-1");
  const [subjectId, setSubjectId] = useState<string>("math");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [stars, setStars] = useState(0);\n  const [completedLessons, setCompletedLessons] = useState<string[]>([]);\n  const [activeLesson, setActiveLesson] = useState(0);
  const t = copy[lang];
  const activeAge = gradeLevels.find((a) => a.id === ageId) ?? gradeLevels[3];
  const activeSubject = subjects.find((s) => s.id === subjectId) ?? subjects[1];
  const questions = getQuestions(activeAge.ageBandId, subjectId);
  const questionText = questions[questionIndex % questions.length];
  const isRight = answer === questionText.correctChoiceIndex;\n  const lessonSet = lessonIdeas[subjectId] ?? defaultLessons;\n  const lessons = lessonSet.map((lesson, index) => ({...lesson, id: `${activeAge.id}-${subjectId}-${index}`}));

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
          <div className="hero-proof"><div className="avatar-stack"><span>🦊</span><span>🐼</span><span>🐸</span></div><span>Made for learners <b>Nursery–Class 10</b></span></div>
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
        <div className="section-heading"><div><span className="section-kicker">FROM NURSERY TO CLASS 10</span><h2>{t.levels}</h2><p>A learning path for every school year, from first steps to board-exam foundations.</p></div><span className="heading-doodle">✳</span></div>
        <div className="age-grid">{gradeLevels.map((age, index) => <button key={age.id} className={`age-card age-${index} ${ageId === age.id ? "selected" : ""}`} onClick={() => { setAgeId(age.id); setQuestionIndex(0); setAnswer(null); }}><span className="age-emoji">{age.emoji}</span><span className="age-range">{age.label} · AGES {age.minAge}–{age.maxAge}</span><b>{age.name}</b><small>{age.description}</small><span className="age-arrow">↗</span></button>)}</div>
        <div className="selected-note"><span>✨</span> Your path: <b>{activeAge.name}</b> <span>·</span> {activeAge.description}</div>
      </section>

      <section className="section-block subjects-section" id="subjects">
        <div className="section-heading"><div><span className="section-kicker">A UNIVERSE OF IDEAS</span><h2>{t.subjects}</h2><p>Explore school subjects, skills and creative worlds.</p></div><a className="view-all" href="#quick-quiz">Jump into a quiz ↗</a></div>
        <div className="subject-grid">{subjects.map((subject, index) => <button key={subject.id} onClick={() => { setSubjectId(subject.id); setQuestionIndex(0); setAnswer(null); }} className={`subject-card subject-${index} ${subjectId === subject.id ? "subject-active" : ""}`}><span className="subject-emoji">{subject.emoji}</span><span><b>{subject.name[lang]}</b><small>{subject.description}</small></span><span className="subject-arrow">↗</span></button>)}</div>
      </section>


      <section className="lesson-studio" id="lessons">
        <div className="lesson-heading"><div><span className="section-kicker">YOUR NEXT DISCOVERY</span><h2>{lang === "en" ? "Learning missions" : "అభ్యాస లక్ష్యాలు"}</h2><p>{lang === "en" ? `A gentle learning path for ${activeAge.label} · ${activeSubject.name.en}` : `${activeAge.label} · ${activeSubject.name.te} కోసం అభ్యాస మార్గం`}</p></div><div className="lesson-count">✨ {completedLessons.length} {lang === "en" ? "missions explored" : "లక్ష్యాలు పూర్తి"}</div></div>
        <div className="lesson-grid">{lessons.map((lesson,index)=><button key={lesson.id} className={`lesson-card ${activeLesson===index?"lesson-active":""}`} onClick={()=>setActiveLesson(index)}><span className="lesson-number">MISSION 0{index+1}</span><span className="lesson-icon">{["🧩","🔎","🚀"][index]}</span><b>{lang==="en"?lesson.en:lesson.te}</b><small>{lang==="en"?lesson.detailEn:lesson.detailTe}</small><span className="lesson-open">{completedLessons.includes(lesson.id)?"✓ Explored":"Explore mission →"}</span></button>)}</div>
        <div className="lesson-detail"><div><span className="section-kicker">MISSION PREVIEW</span><h3>{lang==="en"?lessons[activeLesson].en:lessons[activeLesson].te}</h3><p>{lang==="en"?lessons[activeLesson].detailEn:lessons[activeLesson].detailTe}</p></div><button onClick={()=>setCompletedLessons(old=>old.includes(lessons[activeLesson].id)?old:[...old,lessons[activeLesson].id])}>{completedLessons.includes(lessons[activeLesson].id)?"Mission explored ✓":"Mark as explored ✨"}</button></div>
      </section>
\n      <section className="play-section" id="quick-quiz">
        <div className="play-intro"><span className="section-kicker">READY, SET, THINK!</span><h2>{t.quiz}</h2><p>{t.choose}</p><div className="quiz-meta"><span>🧠 {activeSubject.name[lang]}</span><span>⏱ No rush</span></div><div className="progress-label"><span>Little steps make big progress</span><b>{stars} ⭐</b></div><div className="progress-track"><span style={{width: `${Math.min(100, stars * 12)}%`}} /></div></div>
        <div className="quiz-card"><div className="quiz-top"><span>QUESTION {questionIndex + 1}</span><span className="quiz-points">⭐ +1 star</span></div><div className="quiz-step-track" aria-label={`Question ${questionIndex + 1}`}><span style={{width: `${((questionIndex % 5) + 1) * 20}%`}} /></div>{activeAge.ageBandId === "tiny-explorers" && <div className="parent-play-note">🤝 Parent & little explorer: enjoy this together. No timer, no pressure.</div>}<div className="quiz-question">{questionText.prompt[lang]}</div><div className="quiz-options">{questionText.choices.map((choice, index) => <button key={index} disabled={answer !== null} onClick={() => chooseAnswer(index)} className={`quiz-option ${answer === index ? (isRight ? "answer-correct" : "answer-wrong") : ""} ${answer !== null && index === questionText.correctChoiceIndex ? "answer-reveal" : ""}`}><span className="option-letter">{String.fromCharCode(65 + index)}</span>{choice[lang]}<span className="option-check">{answer !== null && index === questionText.correctChoiceIndex ? "✓" : "→"}</span></button>)}</div>{answer !== null && <div className={`answer-feedback ${isRight ? "feedback-good" : "feedback-try"}`}>{isRight ? t.correct : t.wrong}<small className="answer-explanation">{questionText.explanation[lang]}</small></div>}<div className="quiz-bottom"><span>🌱 Learning grows with practice</span><button onClick={nextQuestion} disabled={answer === null}>{t.next} →</button></div></div>
      </section>

      <section className="stats-section"><div><span className="section-kicker">SMALL WINS, BIG SMILES</span><h2>{t.progress}</h2><p>Celebrate every step, at every pace.</p></div><div className="stat-card"><span>🔥</span><b>0</b><small>{t.streak}</small></div><div className="stat-card"><span>⭐</span><b>{stars}</b><small>{t.stars}</small></div><div className="stat-card"><span>🌈</span><b>{subjects.length}</b><small>{t.topics}</small></div></section>

      <section className="parent-section" id="parents"><div className="parent-illustration">🧑‍🚀<span>🛡️</span></div><div><span className="section-kicker">A LITTLE PEACE OF MIND</span><h2>{t.parent}</h2><p>{t.parentText}</p><span className="parent-button">Parent dashboard · coming soon</span></div><div className="parent-badge">🛡️ <b>Kid-first</b><small>Always</small></div></section>

      <footer className="footer"><a className="brand" href="#"><span className="brand-mark">✦</span><span>kids<span className="brand-accent">genius</span></span></a><p>{t.footer}</p><div className="safety-line">🔒 {t.safe} — {t.safeText}</div><small>© {new Date().getFullYear()} Kids Genius. Made for growing minds.</small></footer>
    </main>
  );
}
