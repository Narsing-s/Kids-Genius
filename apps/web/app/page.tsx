"use client";

import { useEffect, useState } from "react";
import { gradeLevels, subjects, getQuestions } from "@kids-genius/learning";
import LearningPath from "./components/LearningPath";
import NumberQuest from "./components/NumberQuest";
import AccountPanel from "./components/AccountPanel";

type Lang = "en" | "te";

function localDayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

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
  const [classroomOpen, setClassroomOpen] = useState(false);
  const [subjectOpen, setSubjectOpen] = useState(false);
  const [ageId, setAgeId] = useState<string>("class-1");
  const [subjectId, setSubjectId] = useState<string>("math");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [stars, setStars] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [activeLesson, setActiveLesson] = useState(0);
  const [missionAnswer, setMissionAnswer] = useState<number | null>(null);
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [studyDays, setStudyDays] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("kids-genius-progress-v1");
      if (saved) {
        const progress = JSON.parse(saved) as { stars?: number; completedLessons?: string[]; studyDays?: string[] };
        if (typeof progress.stars === "number" && Number.isFinite(progress.stars)) setStars(Math.max(0, progress.stars));
        if (Array.isArray(progress.completedLessons)) setCompletedLessons(progress.completedLessons.filter((item): item is string => typeof item === "string"));
        if (Array.isArray(progress.studyDays)) setStudyDays(progress.studyDays.filter((item): item is string => item.length === 10 && item[4] === "-" && item[7] === "-"));
      }
    } catch {
      // Ignore unavailable or invalid local progress; learning remains usable.
    }
    setProgressLoaded(true);
  }, []);

  useEffect(() => {
    if (!progressLoaded) return;
    try {
      window.localStorage.setItem("kids-genius-progress-v1", JSON.stringify({ stars, completedLessons, studyDays }));
    } catch {
      // Private browsing or storage limits should never block learning.
    }
  }, [stars, completedLessons, studyDays, progressLoaded]);
  const t = copy[lang];
  const activeAge = gradeLevels.find((a) => a.id === ageId) ?? gradeLevels[3];
  const activeSubject = subjects.find((s) => s.id === subjectId) ?? subjects[1];
  const questions = getQuestions(activeAge.ageBandId, subjectId, activeAge.id);
  const questionText = questions[questionIndex % questions.length];
  const isRight = answer === questionText.correctChoiceIndex;
  const lessonSet = lessonIdeas[subjectId] ?? defaultLessons;
  const lessons = lessonSet.map((lesson, index) => ({...lesson, id: `${activeAge.id}-${subjectId}-${index}`}));

  function recordStudyDay() {
    const today = localDayKey();
    setStudyDays((days) => days.includes(today) ? days : [...days, today].sort());
  }

  const studyStreak = (() => {
    const days = new Set(studyDays);
    const cursor = new Date();
    if (!days.has(localDayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
    let count = 0;
    while (days.has(localDayKey(cursor))) {
      count += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    return count;
  })();

  const unlockedBadges = [
    { id: "first-star", icon: "🌟", title: lang === "en" ? "First Spark" : "మొదటి మెరుపు", detail: lang === "en" ? "Earn your first star" : "మొదటి నక్షత్రం పొందండి", unlocked: stars >= 1 },
    { id: "five-stars", icon: "🏅", title: lang === "en" ? "Bright Thinker" : "తెలివైన ఆలోచన", detail: lang === "en" ? "Collect 5 stars" : "5 నక్షత్రాలు సంపాదించండి", unlocked: stars >= 5 },
    { id: "mission-explorer", icon: "🧭", title: lang === "en" ? "Explorer" : "అన్వేషకుడు", detail: lang === "en" ? "Explore 3 missions" : "3 లక్ష్యాలను అన్వేషించండి", unlocked: completedLessons.length >= 3 },
    { id: "three-day-streak", icon: "🔥", title: lang === "en" ? "On a Roll" : "కొనసాగింపు", detail: lang === "en" ? "Learn 3 days in a row" : "వరుసగా 3 రోజులు నేర్చుకోండి", unlocked: studyStreak >= 3 },
  ];

  function chooseAnswer(index: number) {
    if (answer !== null) return;
    recordStudyDay();
    setAnswer(index);
    if (index === questionText.correctChoiceIndex) setStars((value) => value + 1);
  }
  function nextQuestion() {
    setQuestionIndex((value) => value + 1);
    setAnswer(null);
  }

  if (subjectOpen) {
    return (
      <main className="site-shell subject-screen">
        <header className="nav"><button className="brand brand-button" onClick={() => {setSubjectOpen(false);setClassroomOpen(false);}}>✦ kids<span className="brand-accent">genius</span></button><div className="class-breadcrumb"><button onClick={() => setSubjectOpen(false)}>← {activeAge.label}</button> › {activeSubject.name[lang]}</div><button className="language-toggle" onClick={() => setLang(lang === "en" ? "te" : "en")}>{lang === "en" ? "తెలుగు" : "English"}</button></header>
        <section className="subject-dashboard">
          <button className="secondary-button" onClick={() => {setSubjectOpen(false);setClassroomOpen(true);}}>← {lang === "en" ? "All subjects" : "అన్ని విషయాలు"}</button>
          <div className="subject-hero-panel"><span className="subject-hero-icon">{activeSubject.emoji}</span><div><span className="section-kicker">{activeAge.label.toUpperCase()} · LEARNING STUDIO</span><h1>{activeSubject.name[lang]}</h1><p>{lang === "en" ? "Explore your class lessons, open a topic, try the activity and finish with a quiz." : "మీ తరగతి పాఠాలను అన్వేషించండి, అంశాన్ని తెరిచి కార్యకలాపం చేసి క్విజ్ పూర్తి చేయండి."}</p></div><div className="subject-stats"><b>⭐ {stars}</b><small>{lang === "en" ? "Your stars" : "మీ నక్షత్రాలు"}</small></div></div>
          <div className="subject-screen-section"><span className="section-kicker">STEP 1 · LEARN</span><h2>{lang === "en" ? "Your lessons" : "మీ పాఠాలు"}</h2><p>{lang === "en" ? "Choose a chapter and open any topic to see its learning activity." : "అధ్యాయాన్ని ఎంచుకుని పాఠ్య కార్యకలాపాన్ని తెరవండి."}</p><LearningPath language={lang} grade={activeAge.label} subject={subjectId}/></div>
          <div className="subject-screen-section subject-practice"><span className="section-kicker">STEP 2 · PRACTISE</span><h2>{lang === "en" ? "Class quiz" : "తరగతి క్విజ్"}</h2><p>{lang === "en" ? activeAge.label + " · " + activeSubject.name.en + " · " + questions.length + " practice questions in this selected question bank." : activeAge.label + " · " + activeSubject.name.te + " · సాధన ప్రశ్నలు."}</p>
            <div className="class-quiz-card"><div className="quiz-top"><span>{activeAge.label.toUpperCase()} · {activeSubject.name[lang].toUpperCase()} · {(questionIndex % questions.length)+1}/{questions.length}</span><span className="quiz-points">⭐ +1 star</span></div><div className="quiz-question">{questionText.prompt[lang]}</div><div className="quiz-options">{questionText.choices.map((choice,index)=><button key={index} disabled={answer!==null} onClick={chooseAnswer} className={"quiz-option "+(answer===index?(isRight?"answer-correct":"answer-wrong"):"")+(answer!==null&&index===questionText.correctChoiceIndex?" answer-reveal":"")}><span className="option-letter">{String.fromCharCode(65+index)}</span>{choice[lang]}<span className="option-check">{answer!==null&&index===questionText.correctChoiceIndex?"✓":"→"}</span></button>)}</div>{answer!==null&&<div className={"answer-feedback "+(isRight?"feedback-good":"feedback-try")}>{isRight?t.correct:t.wrong}<small className="answer-explanation">{questionText.explanation[lang]}</small></div>}<div className="quiz-bottom"><span>🌱 {lang === "en" ? "Every try helps you grow" : "ప్రతి ప్రయత్నం మీ ఎదుగుదలకు సహాయపడుతుంది"}</span><button disabled={answer===null} onClick={nextQuestion}>{t.next} →</button></div></div>
          </div>
          <div className="subject-screen-section"><span className="section-kicker">STEP 3 · PLAY</span><h2>{lang === "en" ? "Maths and thinking games" : "గణితం మరియు ఆలోచనా ఆటలు"}</h2><NumberQuest language={lang}/></div>
          <button className="secondary-button" onClick={() => {setSubjectOpen(false);setClassroomOpen(true);}}>← {lang === "en" ? "Back to " + activeAge.label : activeAge.label + " తరగతికి తిరిగి"}</button>
        </section>
      </main>
    );
  }

  if (classroomOpen) {
    return (
      <main className="site-shell">
        <header className="nav"><button className="brand brand-button" onClick={() => setClassroomOpen(false)}>✦ kids<span className="brand-accent">genius</span></button><span className="class-breadcrumb">Home › {activeAge.label}</span><button className="language-toggle" onClick={() => setLang(lang === "en" ? "te" : "en")}>{lang === "en" ? "తెలుగు" : "English"}</button></header>
        <section className="class-dashboard">
          <div className="class-welcome"><div><span className="section-kicker">YOUR CLASSROOM · {activeAge.label.toUpperCase()}</span><h1>{lang === "en" ? "Welcome to " + activeAge.label + "!" : activeAge.label + " తరగతికి స్వాగతం!"}</h1><p>{activeAge.description}. {lang === "en" ? "Choose a subject to enter its learning space. Explore chapters, lessons and quizzes for your class." : "మీ తరగతి కోసం విషయాన్ని ఎంచుకుని అధ్యాయాలు, పాఠాలు మరియు క్విజ్‌లను ప్రారంభించండి."}</p><div className="class-welcome-tags"><span>📚 {subjects.length} subjects</span><span>⭐ {stars} stars</span><span>🌐 English + తెలుగు</span></div></div><div className="class-mascot">🦊 🎒 📚</div></div>
          <div className="class-subject-heading"><div><span className="section-kicker">YOUR LEARNING WORLDS</span><h2>{lang === "en" ? "Choose a subject" : "ఒక విషయాన్ని ఎంచుకోండి"}</h2><p>{lang === "en" ? "Open a subject to see its lessons and practice questions." : "పాఠాలు మరియు సాధన ప్రశ్నల కోసం విషయాన్ని తెరవండి."}</p></div></div>
          <div className="class-subject-grid">{subjects.map((subject,index)=><button key={subject.id} className={"class-subject-card subject-"+index} onClick={()=>{setSubjectId(subject.id);setQuestionIndex(0);setAnswer(null);setActiveLesson(0);setSubjectOpen(true);}}><span className="class-subject-icon">{subject.emoji}</span><span><b>{subject.name[lang]}</b><small>{subject.description}</small><em>{lang === "en" ? "Open lessons and quiz →" : "పాఠాలు, క్విజ్ తెరవండి →"}</em></span></button>)}</div>
          <button className="secondary-button" onClick={() => setClassroomOpen(false)}>← {lang === "en" ? "Back to all classes" : "తరగతులకు తిరిగి"}</button>
        </section>
      </main>
    );
  }

  return (
    <main className="site-shell">
      <header className="nav">
        <a className="brand" href="#" aria-label="Kids Genius home"><span className="brand-mark">✦</span><span>kids<span className="brand-accent">genius</span></span></a>
        <nav className="nav-links"><a href="#adventures">Adventures</a><a href="#subjects">Subjects</a><a href="#account">Parents</a></nav>
        <div className="nav-actions">
          <button className="language-toggle" onClick={() => setLang(lang === "en" ? "te" : "en")} aria-label="Switch language">{lang === "en" ? "తెలుగు" : "English"} <span>⌄</span></button>
          <a className="parent-link" href="#account">For parents ↗</a>
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
          <div className="planet">🌎</div><div className="hero-creature creature-fox" aria-hidden="true">🦊</div><div className="hero-creature creature-panda" aria-hidden="true">🐼</div><div className="hero-creature creature-frog" aria-hidden="true">🐸</div><div className="float-card card-star">⭐ <b>Shine bright!</b></div><div className="float-card card-book">📚 <b>Explore</b></div><div className="float-card card-rocket">🚀</div><div className="spark spark-a">✦</div><div className="spark spark-b">✧</div>
        </div>
        <div className="hero-bottom"><span>✳ Learn at your own pace</span><span>✳ English + తెలుగు</span><span>✳ Playful and safe</span></div>
      </section>

      <section className="mission-strip">
        <div className="mission-icon">🎯</div><div className="mission-copy"><span className="section-kicker">{t.daily}</span><b>{t.dailyText}</b></div><div className="mission-reward"><span>⭐</span><b>+1 star</b></div>
      </section>

      <section className="section-block" id="adventures">
        <div className="section-heading"><div><span className="section-kicker">FROM NURSERY TO CLASS 10</span><h2>{t.levels}</h2><p>A learning path for every school year, from first steps to board-exam foundations.</p></div><span className="heading-doodle">✳</span></div>
        <div className="age-grid">{gradeLevels.map((age, index) => <button key={age.id} className={`age-card age-${index} ${ageId === age.id ? "selected" : ""}`} onClick={() => { setAgeId(age.id); setQuestionIndex(0); setAnswer(null); setMissionAnswer(null); setActiveLesson(0); setClassroomOpen(true); }}><span className="age-emoji">{age.emoji}</span><span className="age-range">{age.label} · AGES {age.minAge}–{age.maxAge}</span><b>{age.label}</b><small>{age.description}</small><span className="age-arrow">↗</span></button>)}</div>
        <div className="selected-note"><span>✨</span> Your path: <b>{activeAge.label}</b> <span>·</span> {activeAge.description} <a className="view-all" href="#lessons">Open this class's lessons ↓</a></div>
      </section>

      <section className="section-block subjects-section" id="subjects">
        <div className="section-heading"><div><span className="section-kicker">A UNIVERSE OF IDEAS</span><h2>{t.subjects}</h2><p>Explore school subjects, skills and creative worlds.</p></div><a className="view-all" href="#quick-quiz">Jump into a quiz ↗</a></div>
        <div className="subject-grid">{subjects.map((subject, index) => <button key={subject.id} onClick={() => { setSubjectId(subject.id); setQuestionIndex(0); setAnswer(null); setMissionAnswer(null); setActiveLesson(0); document.getElementById("learning-path")?.scrollIntoView({behavior:"smooth",block:"start"}); }} className={`subject-card subject-${index} ${subjectId === subject.id ? "subject-active" : ""}`} aria-pressed={subjectId === subject.id}><span className="subject-emoji">{subject.emoji}</span><span><b>{subject.name[lang]}</b><small>{subject.description}</small></span><span className="subject-arrow">↗</span></button>)}</div><div className="selected-note"><span>📘</span> Selected subject: <b>{activeSubject.name[lang]}</b> <a className="view-all" href="#lessons">Open lessons ↓</a> <a className="view-all" href="#quick-quiz">Start quiz ↓</a></div>
      </section>


      <LearningPath language={lang} grade={activeAge.label} subject={subjectId} />

      <section className="lesson-studio" id="lessons">
        <div className="lesson-heading"><div><span className="section-kicker">YOUR NEXT DISCOVERY</span><h2>{lang === "en" ? "Learning missions" : "అభ్యాస లక్ష్యాలు"}</h2><p>{lang === "en" ? `A gentle learning path for ${activeAge.label} · ${activeSubject.name.en}` : `${activeAge.label} · ${activeSubject.name.te} కోసం అభ్యాస మార్గం`}</p></div><div className="lesson-count">✨ {completedLessons.length} {lang === "en" ? "missions explored" : "లక్ష్యాలు పూర్తి"}</div></div>
        <div className="lesson-grid">{lessons.map((lesson,index)=><button key={lesson.id} className={`lesson-card ${activeLesson===index?"lesson-active":""}`} onClick={()=>{setActiveLesson(index);setMissionAnswer(null);document.getElementById("mission-player")?.scrollIntoView({behavior:"smooth",block:"nearest"});}} aria-expanded={activeLesson===index}><span className="lesson-number">MISSION 0{index+1}</span><span className="lesson-icon">{["🧩","🔎","🚀"][index]}</span><b>{lang==="en"?lesson.en:lesson.te}</b><small>{lang==="en"?lesson.detailEn:lesson.detailTe}</small><span className="lesson-open">{completedLessons.includes(lesson.id)?"✓ Completed · Reopen":"Open lesson →"}</span></button>)}</div>
        <div className="lesson-detail" id="mission-player" aria-live="polite"><div className="mission-detail-copy"><span className="section-kicker">📖 LESSON OPENED · {activeAge.label}</span><h3>{lang==="en"?lessons[activeLesson].en:lessons[activeLesson].te}</h3><p>{lang==="en"?lessons[activeLesson].detailEn:lessons[activeLesson].detailTe}</p><div className="mission-challenge"><b>{lang==="en"?"⚡ Try a quick challenge":"⚡ చిన్న సవాలును ప్రయత్నించండి"}</b><p>{questionText.prompt[lang]}</p><div className="mission-options">{questionText.choices.map((choice,index)=><button key={index} disabled={missionAnswer!==null} className={missionAnswer===index?(index===questionText.correctChoiceIndex?"mission-right":"mission-wrong"):""} onClick={()=>{setMissionAnswer(index);recordStudyDay();if(index===questionText.correctChoiceIndex){setStars(v=>v+1);}}}>{choice[lang]}</button>)}</div>{missionAnswer!==null&&<div className="mission-feedback"><small className={missionAnswer===questionText.correctChoiceIndex?"mission-success":"mission-retry"}>{missionAnswer===questionText.correctChoiceIndex?(lang==="en"?"Correct! You earned a star. 🌟":"సరైన సమాధానం! ఒక నక్షత్రం పొందారు. 🌟"):(lang==="en"?"Not quite yet. Read the explanation and give it another go.":"ఇంకా సరైన సమాధానం కాదు. వివరణ చదివి మళ్లీ ప్రయత్నించండి.")} {questionText.explanation[lang]}</small>{missionAnswer!==questionText.correctChoiceIndex&&<button className="mission-retry-button" onClick={()=>setMissionAnswer(null)}>{lang==="en"?"Try again ↻":"మళ్లీ ప్రయత్నించండి ↻"}</button>}</div>}</div></div><button className="mission-complete" disabled={missionAnswer!==questionText.correctChoiceIndex||completedLessons.includes(lessons[activeLesson].id)} onClick={()=>{recordStudyDay();setCompletedLessons(old=>old.includes(lessons[activeLesson].id)?old:[...old,lessons[activeLesson].id]);}}>{completedLessons.includes(lessons[activeLesson].id)?(lang==="en"?"Mission completed ✓":"లక్ష్యం పూర్తయింది ✓"):missionAnswer===questionText.correctChoiceIndex?(lang==="en"?"Complete mission ✨":"లక్ష్యాన్ని పూర్తి చేయండి ✨"):(lang==="en"?"Answer correctly to complete":"పూర్తి చేయడానికి సరైన సమాధానం ఇవ్వండి")}</button></div>
      </section>

      <NumberQuest language={lang} />

      <section className="play-section" id="quick-quiz">
        <div className="play-intro"><span className="section-kicker">READY, SET, THINK!</span><h2>{t.quiz}</h2><p>{t.choose}</p><div className="quiz-meta"><span>🧠 {activeSubject.name[lang]}</span><span>📚 {questions.length} practice questions available</span><span>⏱ No rush</span></div><div className="progress-label"><span>Little steps make big progress</span><b>{stars} ⭐</b></div><div className="progress-track"><span style={{width: `${Math.min(100, stars * 12)}%`}} /></div></div>
        <div className="quiz-card"><div className="quiz-top"><span>{activeAge.label.toUpperCase()} · {activeSubject.name[lang].toUpperCase()} · QUESTION {(questionIndex % questions.length) + 1} OF {questions.length}</span><span className="quiz-points">⭐ +1 star</span></div><div className="quiz-step-track" aria-label={`Question ${questionIndex + 1}`}><span style={{width: `${(((questionIndex % questions.length) + 1) / questions.length) * 100}%`}} /></div>{activeAge.ageBandId === "tiny-explorers" && <div className="parent-play-note">🤝 Parent & little explorer: enjoy this together. No timer, no pressure.</div>}<div className="quiz-question">{questionText.prompt[lang]}</div><div className="quiz-options">{questionText.choices.map((choice, index) => <button key={index} disabled={answer !== null} onClick={() => chooseAnswer(index)} className={`quiz-option ${answer === index ? (isRight ? "answer-correct" : "answer-wrong") : ""} ${answer !== null && index === questionText.correctChoiceIndex ? "answer-reveal" : ""}`}><span className="option-letter">{String.fromCharCode(65 + index)}</span>{choice[lang]}<span className="option-check">{answer !== null && index === questionText.correctChoiceIndex ? "✓" : "→"}</span></button>)}</div>{answer !== null && <div className={`answer-feedback ${isRight ? "feedback-good" : "feedback-try"}`}>{isRight ? t.correct : t.wrong}<small className="answer-explanation">{questionText.explanation[lang]}</small></div>}<div className="quiz-bottom"><span>🌱 Learning grows with practice</span><button onClick={nextQuestion} disabled={answer === null}>{t.next} →</button></div></div>
      </section>

      <section className="stats-section"><div><span className="section-kicker">SMALL WINS, BIG SMILES</span><h2>{t.progress}</h2><p>Celebrate every step, at every pace.</p></div><div className="stat-card"><span>🔥</span><b>{studyStreak}</b><small>{t.streak}</small></div><div className="stat-card"><span>⭐</span><b>{stars}</b><small>{t.stars}</small></div><div className="stat-card"><span>🌈</span><b>{subjects.length}</b><small>{t.topics}</small></div></section>

      <section className="achievement-section" aria-labelledby="achievement-title">
        <div className="achievement-heading"><div><span className="section-kicker">{lang === "en" ? "CELEBRATE YOUR PROGRESS" : "మీ విజయాలను జరుపుకోండి"}</span><h2 id="achievement-title">{lang === "en" ? "Your badge collection" : "మీ బ్యాడ్జ్‌ల సేకరణ"}</h2><p>{lang === "en" ? "Every small step deserves a little celebration." : "ప్రతి చిన్న ప్రయత్నం ఒక చిన్న వేడుకకు అర్హమైనది."}</p></div><span className="achievement-total">🏆 {unlockedBadges.filter((badge) => badge.unlocked).length}/4</span></div>
        <div className="achievement-grid">{unlockedBadges.map((badge) => <div key={badge.id} className={`achievement-card ${badge.unlocked ? "badge-unlocked" : "badge-locked"}`}><span>{badge.icon}</span><b>{badge.title}</b><small>{badge.unlocked ? (lang === "en" ? "Unlocked!" : "సాధించారు!") : badge.detail}</small></div>)}</div>
      </section>

      <AccountPanel language={lang} grade={activeAge.label} subject={subjectId} stars={stars} completedLessons={completedLessons.length} studyDays={studyDays} />

      <section className="parent-section" id="parents"><div className="parent-illustration">🧑‍🚀<span>🛡️</span></div><div><span className="section-kicker">A LITTLE PEACE OF MIND</span><h2>{t.parent}</h2><p>{t.parentText}</p><div className="parent-preview"><b>{lang === "en" ? "Parent preview" : "తల్లిదండ్రుల వీక్షణ"}</b><p>{lang === "en" ? `This device currently records ${stars} stars, ${completedLessons.length} completed missions and a ${studyStreak}-day learning streak.` : `ఈ పరికరంలో ${stars} నక్షత్రాలు, ${completedLessons.length} పూర్తయిన లక్ష్యాలు, ${studyStreak} రోజుల అభ్యాస పరంపర నమోదు అయ్యాయి.`}</p><small>{lang === "en" ? "Parents can sign in, manage learner profiles and save progress snapshots by class and subject." : "తల్లిదండ్రులు లాగిన్ అయి విద్యార్థి ప్రొఫైల్‌లను నిర్వహించవచ్చు. తరగతి, విషయం వారీగా పురోగతిని సేవ్ చేయవచ్చు."}</small></div></div><div className="parent-badge">🛡️ <b>Kid-first</b><small>Always</small></div></section>

      <footer className="footer"><a className="brand" href="#"><span className="brand-mark">✦</span><span>kids<span className="brand-accent">genius</span></span></a><p>{t.footer}</p><div className="safety-line">🔒 {t.safe} — {t.safeText}</div><small>© {new Date().getFullYear()} Kids Genius. Made for growing minds.</small></footer>
    </main>
  );
}
