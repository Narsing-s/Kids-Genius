"use client";

import { useEffect, useState } from "react";
import type { Language } from "@kids-genius/learning";

const rounds = [
  {emoji:"🍎", prompt:{en:"You have 3 apples. A friend gives you 2 more. How many now?",te:"మీ దగ్గర 3 ఆపిల్స్ ఉన్నాయి. స్నేహితుడు మరో 2 ఇచ్చాడు. ఇప్పుడు ఎన్ని?"},choices:[4,5,6],answer:5,why:{en:"3 + 2 = 5. Count on two more: 4, 5!",te:"3 + 2 = 5. మరో రెండింటిని లెక్కించండి: 4, 5!"}},
  {emoji:"⭐",prompt:{en:"Which number comes next: 2, 4, 6, ...?",te:"తర్వాత వచ్చే సంఖ్య ఏది: 2, 4, 6, ...?"},choices:[7,8,9],answer:8,why:{en:"The pattern adds 2 each time. 6 + 2 = 8.",te:"ప్రతి సారి 2 కలుపుతున్నాం. 6 + 2 = 8."}},
  {emoji:"🐠",prompt:{en:"There are 7 fish. 3 swim away. How many remain?",te:"7 చేపలు ఉన్నాయి. 3 ఈదుకుంటూ వెళ్లాయి. ఎన్ని మిగిలాయి?"},choices:[3,4,5],answer:4,why:{en:"7 − 3 = 4 fish remain.",te:"7 − 3 = 4 చేపలు మిగిలాయి."}}
];

export default function NumberQuest({language}:{language:Language}) {
 const [round,setRound]=useState(0);
 const [choice,setChoice]=useState<number|null>(null);
 const [score,setScore]=useState(0);
 const [finished,setFinished]=useState(false);
 const [best,setBest]=useState(0);
 const te=language==="te";
 useEffect(()=>{try{const value=Number(window.localStorage.getItem("kids-genius-number-quest-best")||0);if(Number.isFinite(value))setBest(value);}catch{}},[]);
 const current=rounds[round];
 function answer(value:number){if(choice!==null)return;setChoice(value);if(value===current.answer)setScore(old=>old+1);}
 function next(){if(round===rounds.length-1){const result=score+(choice===current.answer?0:0);setBest(old=>{const nextBest=Math.max(old,result);try{window.localStorage.setItem("kids-genius-number-quest-best",String(nextBest));}catch{}return nextBest;});setFinished(true);}else{setRound(old=>old+1);setChoice(null);}}
 function restart(){setRound(0);setChoice(null);setScore(0);setFinished(false);}
 return <section className="quest-section" id="number-quest"><div className="quest-header"><div><span className="section-kicker">{te?"ఆడుతూ నేర్చుకోండి":"PLAY • THINK • SHINE"}</span><h2>{te?"నంబర్ క్వెస్ట్":"Number Quest"}</h2><p>{te?"చిన్న గణిత సవాళ్లు. పెద్ద విజయాలు!":"Three bite-sized brain quests. No timer, just fun."}</p></div><div className="quest-best"><span>🏆</span><b>{best}/3</b><small>{te?"మీ ఉత్తమ స్కోరు":"Personal best"}</small></div></div>
 <div className="quest-card"><div className="quest-topline"><span>{te?`సవాలు ${round+1} / 3`:`CHALLENGE ${round+1} / 3`}</span><div className="quest-dots">{rounds.map((item,i)=><i key={item.emoji} className={i<=round?"quest-dot quest-dot-active":"quest-dot"}/>)}</div><span>⭐ {score}</span></div>
 {finished?<div className="quest-finish"><div>🎉</div><h3>{te?"అద్భుతమైన ప్రయత్నం!":"Quest complete!"}</h3><p>{te?`మీరు 3లో ${score} సరైన సమాధానాలు ఇచ్చారు.`:`You solved ${score} out of 3 challenges correctly.`}</p><button onClick={restart}>{te?"మళ్లీ ఆడండి ↻":"Play again ↻"}</button></div>:<><div className="quest-puzzle"><span>{current.emoji}</span><h3>{te?current.prompt.te:current.prompt.en}</h3></div><div className="quest-choices">{current.choices.map(value=><button key={value} disabled={choice!==null} className={choice===value?(value===current.answer?"quest-correct":"quest-wrong"):choice!==null&&value===current.answer?"quest-reveal":""} onClick={()=>answer(value)}>{value}</button>)}</div>{choice!==null&&<div className={choice===current.answer?"quest-feedback quest-feedback-good":"quest-feedback"}><b>{choice===current.answer?(te?"సరిగ్గా చెప్పారు! 🌟":"Brilliant thinking! 🌟"):(te?"మంచి ప్రయత్నం!":"Good try!")}</b><span>{te?current.why.te:current.why.en}</span><button onClick={next}>{round===2?(te?"ఫలితాలు చూడండి":"See results"):(te?"తదుపరి సవాలు →":"Next challenge →")}</button></div>}</>}
 <div className="quest-footer">💡 {te?"తప్పులు కూడా నేర్చుకోవడంలో భాగమే.":"Mistakes are part of learning. Keep exploring!"}</div></div></section>;
}
