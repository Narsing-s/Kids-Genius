"use client";

import { useMemo, useState } from "react";

type Language = "en" | "te";
type Tab = "daily" | "games" | "cards" | "stem";

const dailyQuestions = [
  { q: "Which planet is known as the Red Planet?", a: ["Venus", "Mars", "Jupiter", "Mercury"], correct: 1, why: "Mars looks reddish because iron minerals in its soil have rusted." },
  { q: "What do plants take in from the air to make food?", a: ["Oxygen", "Nitrogen", "Carbon dioxide", "Helium"], correct: 2, why: "Plants use carbon dioxide, water and sunlight during photosynthesis." },
  { q: "How many sides does a hexagon have?", a: ["Five", "Six", "Seven", "Eight"], correct: 1, why: "A hexagon is a polygon with six sides and six angles." },
  { q: "Which is the largest ocean on Earth?", a: ["Atlantic", "Indian", "Arctic", "Pacific"], correct: 3, why: "The Pacific Ocean is the largest and deepest ocean." },
  { q: "Which part of a computer is often called its brain?", a: ["Monitor", "CPU", "Keyboard", "Mouse"], correct: 1, why: "The CPU processes instructions and coordinates computer operations." },
];

const flashcards = [
  { front: "Photosynthesis", back: "The process by which green plants use sunlight to make food from water and carbon dioxide." },
  { front: "Perimeter", back: "The total distance around the outside of a 2D shape." },
  { front: "Evaporation", back: "The change of a liquid into a gas, usually when heat is added." },
  { front: "Algorithm", back: "A clear sequence of steps used to solve a problem or complete a task." },
  { front: "Habitat", back: "The natural home or environment where a plant or animal lives." },
];

const gameSymbols = ["🌟", "🚀", "🦋", "🌈", "🐼", "🍀"];
const stemStories = [
  { tag: "SPACE", title: "How do satellites help us every day?", desc: "Explore how satellites support weather forecasts, maps, communication and disaster response.", url: "https://www.nasa.gov/" },
  { tag: "SCIENCE", title: "Why is the ocean important to our planet?", desc: "Discover ocean science, marine ecosystems and the role oceans play in Earth's climate.", url: "https://oceanservice.noaa.gov/" },
  { tag: "TECHNOLOGY", title: "How can robots help people?", desc: "Meet robots used in space exploration, medicine, farming and dangerous environments.", url: "https://www.isro.gov.in/" },
];

export default function LearningHub({ language = "en", grade = "Class 1" }: { language?: Language; grade?: string }) {
  const [tab, setTab] = useState<Tab>("daily");
  const [dailyIndex, setDailyIndex] = useState(0);
  const [dailyAnswer, setDailyAnswer] = useState<number | null>(null);
  const [dailyScore, setDailyScore] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [gameOrder, setGameOrder] = useState<number[]>([0, 1, 2, 3, 4, 5]);
  const [revealed, setRevealed] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [gameMoves, setGameMoves] = useState(0);
  const [gameMessage, setGameMessage] = useState("Find the matching pairs.");
  const [search, setSearch] = useState("");

  const isTe = language === "te";
  const current = dailyQuestions[dailyIndex];
  const deck = useMemo(() => [...gameOrder, ...gameOrder].map((v, i) => ({ id: i, symbol: gameSymbols[v] })), [gameOrder]);
  const visibleStories = stemStories.filter((story) => (story.title + story.tag + story.desc).toLowerCase().includes(search.toLowerCase()));

  function chooseDaily(index: number) {
    if (dailyAnswer !== null) return;
    setDailyAnswer(index);
    if (index === current.correct) setDailyScore((v) => v + 1);
  }
  function nextDaily() {
    setDailyIndex((v) => (v + 1) % dailyQuestions.length);
    setDailyAnswer(null);
  }
  function flipTile(id: number) {
    if (revealed.includes(id) || matched.includes(id) || revealed.length === 2) return;
    const next = [...revealed, id];
    setRevealed(next);
    if (next.length === 2) {
      setGameMoves((v) => v + 1);
      if (deck[next[0]].symbol === deck[next[1]].symbol) {
        setMatched((old) => [...old, ...next]);
        setRevealed([]);
        setGameMessage("A match! Great memory.");
      } else {
        setGameMessage("Not a match yet. Try another pair.");
        window.setTimeout(() => setRevealed([]), 650);
      }
    }
  }
  function restartGame() {
    const shuffled = [0, 1, 2, 3, 4, 5].sort(() => Math.random() - 0.5);
    setGameOrder(shuffled);
    setRevealed([]);
    setMatched([]);
    setGameMoves(0);
    setGameMessage("Find the matching pairs.");
  }

  return (
    <section className="learning-hub" id="explore-hub">
      <div className="hub-heading">
        <div><span className="hub-kicker">THE KIDS GENIUS PLAYGROUND</span><h2>{isTe ? "నేర్చుకోండి · ఆడండి · అన్వేషించండి" : "Learn something. Play a little. Explore more."}</h2><p>{isTe ? "క్విజ్‌లు, మెదడు ఆటలు, ఫ్లాష్‌కార్డులు మరియు STEM కథలు ఒకే చోట." : "A lively learning corner with quick quizzes, brain games, flashcards and science stories."}</p></div>
        <span className="hub-grade">{grade} · K–12</span>
      </div>
      <div className="hub-tabs" role="tablist" aria-label="Learning activities">
        {([
          ["daily", "☀️", "Daily challenge"],
          ["games", "🧩", "Brain games"],
          ["cards", "🗂️", "Flashcards"],
          ["stem", "🔭", "STEM explorer"],
        ] as [Tab, string, string][]).map(([id, icon, label]) => <button key={id} role="tab" aria-selected={tab === id} className={tab === id ? "hub-tab active" : "hub-tab"} onClick={() => setTab(id)}><span>{icon}</span>{isTe ? ({daily:"రోజువారీ ఛాలెంజ్",games:"మెదడు ఆటలు",cards:"ఫ్లాష్‌కార్డులు",stem:"STEM అన్వేషణ"} as Record<Tab,string>)[id] : label}</button>)}
      </div>

      {tab === "daily" && <div className="hub-panel daily-panel">
        <div className="hub-panel-top"><div><span className="hub-kicker">QUESTION {dailyIndex + 1} OF {dailyQuestions.length}</span><h3>🌟 Daily discovery challenge</h3><p>A quick mixed-topic challenge. Take your time and learn from every answer.</p></div><div className="hub-score"><b>{dailyScore}</b><small>Correct</small></div></div>
        <div className="hub-progress"><span style={{ width: ((dailyIndex + 1) / dailyQuestions.length * 100) + "%" }} /></div>
        <h4 className="hub-question">{current.q}</h4>
        <div className="hub-answer-grid">{current.a.map((option, i) => <button key={option} disabled={dailyAnswer !== null} className={dailyAnswer === i ? (i === current.correct ? "right" : "wrong") : dailyAnswer !== null && i === current.correct ? "right" : ""} onClick={() => chooseDaily(i)}><span>{String.fromCharCode(65 + i)}</span>{option}</button>)}</div>
        {dailyAnswer !== null && <div className={dailyAnswer === current.correct ? "hub-explanation good" : "hub-explanation"}><b>{dailyAnswer === current.correct ? "Brilliant! 🌟" : "Good try — keep exploring!"}</b><p>{current.why}</p><button onClick={nextDaily}>Next question →</button></div>}
      </div>}

      {tab === "games" && <div className="hub-panel">
        <div className="hub-panel-top"><div><span className="hub-kicker">MEMORY LAB · MATCHING GAME</span><h3>🧠 Flip & Find</h3><p>Turn over two tiles at a time and find all six matching pairs.</p></div><div className="hub-score"><b>{matched.length / 2}/6</b><small>Pairs</small></div></div>
        <div className="memory-grid">{deck.map((tile) => <button key={tile.id} className={matched.includes(tile.id) ? "memory-tile matched" : revealed.includes(tile.id) ? "memory-tile revealed" : "memory-tile"} onClick={() => flipTile(tile.id)} aria-label={revealed.includes(tile.id) || matched.includes(tile.id) ? tile.symbol : "Hidden tile"}>{revealed.includes(tile.id) || matched.includes(tile.id) ? tile.symbol : "?"}</button>)}</div>
        <div className="memory-footer"><span>{matched.length === 12 ? "🏆 You found every pair!" : gameMessage} · Moves: {gameMoves}</span><button onClick={restartGame}>↻ Restart</button></div>
      </div>}

      {tab === "cards" && <div className="hub-panel flash-panel">
        <div className="hub-panel-top"><div><span className="hub-kicker">QUICK REVISION DECK</span><h3>📚 Flip a flashcard</h3><p>Recall the idea first, then flip to check your understanding.</p></div><span className="hub-grade">{cardIndex + 1} / {flashcards.length}</span></div>
        <button className={flipped ? "flashcard flipped" : "flashcard"} onClick={() => setFlipped((v) => !v)}><small>{flipped ? "EXPLANATION" : "TAP TO REVEAL"}</small><strong>{flipped ? flashcards[cardIndex].back : flashcards[cardIndex].front}</strong><span>{flipped ? "↻ Flip back" : "✦ Reveal answer"}</span></button>
        <div className="flash-controls"><button disabled={cardIndex === 0} onClick={() => {setCardIndex((v) => v - 1);setFlipped(false);}}>← Previous</button><button onClick={() => {setCardIndex((v) => (v + 1) % flashcards.length);setFlipped(false);}}>Next card →</button></div>
      </div>}

      {tab === "stem" && <div className="hub-panel">
        <div className="hub-panel-top"><div><span className="hub-kicker">CURIOSITY FEED</span><h3>🔭 STEM explorer</h3><p>Short explainers to spark questions about science, technology, engineering and maths.</p></div><span className="hub-grade">Explore</span></div>
        <input className="hub-search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search science stories..." aria-label="Search STEM stories" />
        <div className="stem-story-grid">{visibleStories.map((story) => <article className="stem-story" key={story.tag}><span>{story.tag}</span><h4>{story.title}</h4><p>{story.desc}</p><a href={story.url} target="_blank" rel="noreferrer">Explore trusted science resources ↗</a></article>)}</div>
        {visibleStories.length === 0 && <p className="hub-empty">No stories match that search. Try space, science or technology.</p>}
        <p className="hub-source-note">Learning links open trusted public science organisations. External pages may be updated independently.</p>
      </div>}
    </section>
  );
}
