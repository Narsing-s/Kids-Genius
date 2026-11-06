"use client";

import { useEffect, useMemo, useState } from "react";
import type { Language } from "@kids-genius/learning";

type Chapter = { title: { en: string; te: string }; icon: string; topics: { en: string; te: string }[] };
const paths: Record<string, Chapter[]> = {
  math: [
    { title:{en:"Number playground",te:"సంఖ్యల ఆటస్థలం"},icon:"🔢",topics:[{en:"Count and compare",te:"లెక్కించడం మరియు పోల్చడం"},{en:"Addition adventures",te:"కూడిక సాహసాలు"},{en:"Patterns all around",te:"చుట్టూ ఉన్న క్రమాలు"}] },
    { title:{en:"Shape explorers",te:"ఆకారాల అన్వేషకులు"},icon:"🔺",topics:[{en:"Meet 2D shapes",te:"2D ఆకారాలను తెలుసుకోండి"},{en:"Build with shapes",te:"ఆకారాలతో నిర్మించండి"},{en:"Find shapes at home",te:"ఇంట్లో ఆకారాలను కనుగొనండి"}] },
    { title:{en:"Math in real life",te:"నిజ జీవితంలో గణితం"},icon:"🛍️",topics:[{en:"Coins and money",te:"నాణేలు మరియు డబ్బు"},{en:"Measure the world",te:"ప్రపంచాన్ని కొలవండి"},{en:"Time detectives",te:"సమయాన్ని తెలుసుకోండి"}] }
  ],
  science: [
    {title:{en:"Our living world",te:"మన జీవ ప్రపంచం"},icon:"🌱",topics:[{en:"Plants around us",te:"మన చుట్టూ మొక్కలు"},{en:"Animal homes",te:"జంతువుల నివాసాలు"},{en:"Life cycles",te:"జీవిత చక్రాలు"}]},
    {title:{en:"Amazing materials",te:"ఆశ్చర్యకర పదార్థాలు"},icon:"🧪",topics:[{en:"Solids, liquids and gases",te:"ఘన, ద్రవ, వాయు పదార్థాలు"},{en:"Mix and observe",te:"కలిపి పరిశీలించండి"},{en:"Everyday changes",te:"రోజువారీ మార్పులు"}]},
    {title:{en:"Earth and space",te:"భూమి మరియు అంతరిక్షం"},icon:"🪐",topics:[{en:"Day and night",te:"పగలు మరియు రాత్రి"},{en:"Weather watchers",te:"వాతావరణ పరిశీలకులు"},{en:"Our solar system",te:"మన సౌర కుటుంబం"}]}
  ],
  language: [
    {title:{en:"Word explorers",te:"పదాల అన్వేషకులు"},icon:"🔤",topics:[{en:"Sounds and letters",te:"ధ్వనులు మరియు అక్షరాలు"},{en:"Build new words",te:"కొత్త పదాలు నిర్మించండి"},{en:"Everyday vocabulary",te:"రోజువారీ పదజాలం"}]},
    {title:{en:"Reading adventures",te:"పఠన సాహసాలు"},icon:"📚",topics:[{en:"Read a short story",te:"చిన్న కథ చదవండి"},{en:"Find the main idea",te:"ముఖ్య భావాన్ని గుర్తించండి"},{en:"Tell it in your words",te:"మీ మాటల్లో చెప్పండి"}]},
    {title:{en:"Sentence studio",te:"వాక్య నిర్మాణ శాల"},icon:"✍️",topics:[{en:"Make a sentence",te:"ఒక వాక్యం నిర్మించండి"},{en:"Nouns and verbs",te:"నామవాచకాలు మరియు క్రియలు"},{en:"Punctuation power",te:"విరామ చిహ్నాల శక్తి"}]}
  ],
  computer: [
    {title:{en:"Digital discovery",te:"డిజిటల్ అన్వేషణ"},icon:"💻",topics:[{en:"Parts of a computer",te:"కంప్యూటర్ భాగాలు"},{en:"Input and output",te:"ఇన్‌పుట్ మరియు అవుట్‌పుట్"},{en:"Stay safe online",te:"ఆన్‌లైన్‌లో సురక్షితంగా ఉండండి"}]},
    {title:{en:"Think like a coder",te:"కోడర్‌లా ఆలోచించండి"},icon:"🧩",topics:[{en:"Give clear instructions",te:"స్పష్టమైన సూచనలు ఇవ్వండి"},{en:"Spot patterns",te:"క్రమాలను గుర్తించండి"},{en:"Put steps in order",te:"దశలను క్రమంలో పెట్టండి"}]},
    {title:{en:"Create and share",te:"సృష్టించండి మరియు పంచుకోండి"},icon:"🚀",topics:[{en:"Plan a tiny project",te:"చిన్న ప్రాజెక్ట్ రూపొందించండి"},{en:"Test your idea",te:"మీ ఆలోచనను పరీక్షించండి"},{en:"Improve your design",te:"మీ రూపకల్పనను మెరుగుపరచండి"}]}
  ]
};
const fallback: Chapter[] = [
  {title:{en:"Discover the basics",te:"మౌలిక అంశాలను తెలుసుకోండి"},icon:"🔎",topics:[{en:"What do I already know?",te:"నాకు ఇప్పటికే ఏమి తెలుసు?"},{en:"Learn key words",te:"ముఖ్య పదాలను నేర్చుకోండి"},{en:"Connect it to life",te:"దీనిని జీవితంతో అనుసంధానించండి"}]},
  {title:{en:"Explore and understand",te:"అన్వేషించి అర్థం చేసుకోండి"},icon:"🌍",topics:[{en:"Explore an example",te:"ఒక ఉదాహరణను పరిశీలించండి"},{en:"Compare and classify",te:"పోల్చి వర్గీకరించండి"},{en:"Explain your thinking",te:"మీ ఆలోచనను వివరించండి"}]},
  {title:{en:"Show what you know",te:"మీకు తెలిసినదాన్ని చూపండి"},icon:"🏆",topics:[{en:"Try a mini challenge",te:"చిన్న సవాలును ప్రయత్నించండి"},{en:"Make a connection",te:"సంబంధాన్ని గుర్తించండి"},{en:"Reflect and celebrate",te:"ఆలోచించి ఆనందించండి"}]}
];

export default function LearningPath({ language, grade, subject }: { language: Language; grade: string; subject: string }) {
  const [chapterIndex, setChapterIndex] = useState(0);
  const [activeTopic, setActiveTopic] = useState(0);
  const [done, setDone] = useState<string[]>([]);
  const [loadedFor, setLoadedFor] = useState<string | null>(null);
  const storageKey = `kids-genius-path-v1:${subject}:${grade}`;
  useEffect(() => {
    setLoadedFor(null);
    setChapterIndex(0);
    setActiveTopic(0);
    try {
      const saved = window.localStorage.getItem(storageKey);
      const parsed: unknown = saved ? JSON.parse(saved) : [];
      setDone(Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : []);
    } catch {
      setDone([]);
    }
    setLoadedFor(storageKey);
  }, [storageKey]);
  useEffect(() => {
    if (loadedFor !== storageKey) return;
    try { window.localStorage.setItem(storageKey, JSON.stringify(done)); } catch { /* Progress remains available for this session. */ }
  }, [done, loadedFor, storageKey]);
  const chapters = useMemo(() => paths[subject] ?? fallback, [subject]);
  const chapter = chapters[chapterIndex] ?? chapters[0];
  const total = chapters.reduce((sum, item) => sum + item.topics.length, 0);
  const progress = done.filter(item => item.startsWith(`${subject}-${grade}-`)).length;
  const isTe = language === "te";
  const key = (c: number, t: number) => `${subject}-${grade}-${c}-${t}`;
  const completed = (c: number, t: number) => done.includes(key(c,t));
  return (
    <section className="path-section" id="learning-path">
      <div className="path-heading"><div><span className="section-kicker">{isTe ? "మీ అభ్యాస మ్యాప్" : "YOUR LEARNING MAP"}</span><h2>{isTe ? "ఒక్కో అడుగుతో ముందుకు!" : "A new adventure in every chapter"}</h2><p>{isTe ? `${grade} కోసం రూపొందించిన ప్రారంభ అభ్యాస మార్గం` : `A starter pathway for ${grade} · ${total} bite-sized topics to explore`}</p></div><div className="path-progress"><b>{progress}/{total}</b><small>{isTe ? "విషయాలు చూశారు" : "topics explored"}</small></div></div>
      <div className="path-progress-track"><span style={{width:`${progress/total*100}%`}} /></div>
      <div className="path-layout">
        <div className="chapter-list">{chapters.map((item,index)=><button key={item.title.en} className={chapterIndex===index?"chapter-button chapter-active":"chapter-button"} onClick={()=>{setChapterIndex(index);setActiveTopic(0);document.getElementById("opened-lesson")?.scrollIntoView({behavior:"smooth",block:"nearest"});}}><span>{item.icon}</span><span><small>{isTe?`అధ్యాయం 0${index+1}`:`CHAPTER 0${index+1}`}</small><b>{isTe?item.title.te:item.title.en}</b></span><i>{index===chapterIndex?"●":"○"}</i></button>)}</div>
        <div className="topic-panel"><div className="topic-panel-heading"><span className="topic-icon">{chapter.icon}</span><div><small>{isTe?`అధ్యాయం 0${chapterIndex+1}`:`CHAPTER 0${chapterIndex+1}`}</small><h3>{isTe?chapter.title.te:chapter.title.en}</h3></div></div><div className="topic-list">{chapter.topics.map((topic,index)=><button key={topic.en} className={completed(chapterIndex,index)?"topic-row topic-done":"topic-row"} onClick={()=>{setActiveTopic(index);document.getElementById("opened-lesson")?.scrollIntoView({behavior:"smooth",block:"nearest"});}} aria-current={activeTopic===index?"step":undefined} aria-expanded={activeTopic===index}><span className="topic-number">{completed(chapterIndex,index)?"✓":String(index+1).padStart(2,"0")}</span><span>{isTe?topic.te:topic.en}</span><b>{completed(chapterIndex,index)?(isTe?"మళ్లీ తెరవండి":"Reopen lesson"):(isTe?"పాఠం తెరవండి →":"Open lesson →")}</b></button>)}</div><div className="opened-lesson" id="opened-lesson" aria-live="polite">
          <div className="opened-lesson-top"><span>📖</span><div><small>{isTe?"ఇప్పుడు నేర్చుకుంటున్నారు":"NOW LEARNING"}</small><h4>{isTe?chapter.topics[activeTopic]?.te:chapter.topics[activeTopic]?.en}</h4></div><span className="lesson-step">{activeTopic+1}/{chapter.topics.length}</span></div>
          <p>{isTe?"ఈ అంశాన్ని మీ చుట్టూ ఉన్న ఉదాహరణలతో తెలుసుకుందాం. ముందుగా గమనించండి, తర్వాత ప్రయత్నించండి, చివరగా మీ మాటల్లో వివరించండి.":"Connect this topic to the world around you. First notice an example, then try it yourself, and finally explain what you discovered."}</p>
          <div className="lesson-steps"><div><b>1 · {isTe?"గమనించండి":"NOTICE"}</b><span>{isTe?"ఇంట్లో లేదా పాఠశాలలో దీనికి ఒక ఉదాహరణ కనుగొనండి.":"Find one real-life example at home or school."}</span></div><div><b>2 · {isTe?"ప్రయత్నించండి":"TRY"}</b><span>{isTe?"మీరు చూసిన ఉదాహరణను చిత్రంగా గీయండి లేదా ఒక వాక్యంలో రాయండి.":"Draw what you noticed or write one sentence about it."}</span></div><div><b>3 · {isTe?"వివరించండి":"EXPLAIN"}</b><span>{isTe?"ఇది ఎలా పనిచేస్తుందో కుటుంబ సభ్యునికి చెప్పండి.":"Tell a family member what you discovered and why it matters."}</span></div></div>
          <button className={completed(chapterIndex,activeTopic)?"lesson-complete-button is-complete":"lesson-complete-button"} onClick={()=>setDone(old=>completed(chapterIndex,activeTopic)?old.filter(item=>item!==key(chapterIndex,activeTopic)):[...old,key(chapterIndex,activeTopic)])}>{completed(chapterIndex,activeTopic)?(isTe?"✓ పాఠం పూర్తయింది":"✓ Lesson completed"):(isTe?"ఈ పాఠాన్ని పూర్తి చేయండి":"Complete this lesson")}</button>
        </div>
        <p className="path-note">✨ {isTe?"ఇవి ప్రారంభ అభ్యాస సూచనలు మాత్రమే. పాఠ్యపుస్తకంతో కలిపి ఉపయోగించండి.":"Starter activities · Use alongside your school's textbook."}</p></div>
      </div>
    </section>
  );
}
