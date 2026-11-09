"use client";

import { useEffect, useMemo, useState } from "react";
import type { LearningQuestion, Language } from "@kids-genius/learning";

type Mode = "practice" | "review" | "notes";
type SavedStudy = { savedIds: string[]; missedIds: string[]; notes: string };

export default function StudyStudio({
  language,
  grade,
  subject,
  questions,
}: {
  language: Language;
  grade: string;
  subject: string;
  questions: LearningQuestion[];
}) {
  const te = language === "te";
  const storageKey = `kids-genius-study-studio-v1:${grade}:${subject}`;
  const [mode, setMode] = useState<Mode>("practice");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [missedIds, setMissedIds] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<SavedStudy>;
        setSavedIds(Array.isArray(saved.savedIds) ? saved.savedIds.filter((id): id is string => typeof id === "string") : []);
        setMissedIds(Array.isArray(saved.missedIds) ? saved.missedIds.filter((id): id is string => typeof id === "string") : []);
        setNotes(typeof saved.notes === "string" ? saved.notes : "");
      }
    } catch {
      // Study tools remain usable when local storage is unavailable.
    }
    setLoaded(true);
  }, [storageKey]);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({ savedIds, missedIds, notes } satisfies SavedStudy));
    } catch {
      // Private browsing or storage limits should never block learning.
    }
  }, [loaded, storageKey, savedIds, missedIds, notes]);

  const reviewQuestions = useMemo(
    () => questions.filter((question) => missedIds.includes(question.id) || savedIds.includes(question.id)),
    [questions, missedIds, savedIds],
  );
  const activeQuestions = mode === "review" ? reviewQuestions : questions;
  const current = activeQuestions[index];
  const isCorrect = current !== undefined && selected === current.correctChoiceIndex;
  const accuracy = answered ? Math.round((score / answered) * 100) : 0;

  function changeMode(next: Mode) {
    setMode(next);
    setIndex(0);
    setSelected(null);
  }

  function chooseAnswer(choice: number) {
    if (!current || selected !== null) return;
    setSelected(choice);
    setAnswered((value) => value + 1);
    if (choice === current.correctChoiceIndex) {
      setScore((value) => value + 1);
      setMissedIds((ids) => ids.filter((id) => id !== current.id));
    } else {
      setMissedIds((ids) => ids.includes(current.id) ? ids : [...ids, current.id]);
    }
  }

  function nextQuestion() {
    setSelected(null);
    setIndex((value) => (value + 1) % Math.max(activeQuestions.length, 1));
  }

  function restartSession() {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setAnswered(0);
  }

  function toggleSaved() {
    if (!current) return;
    setSavedIds((ids) => ids.includes(current.id) ? ids.filter((id) => id !== current.id) : [...ids, current.id]);
  }

  return (
    <section className="study-studio" id="smart-study">
      <div className="study-studio-heading">
        <div>
          <span className="hub-kicker">{te ? "వ్యక్తిగత అభ్యాస స్టూడియో" : "YOUR PERSONAL STUDY SPACE"}</span>
          <h2>{te ? "సాధన · పునశ్చరణ · గమనికలు" : "Practice smarter. Remember more."}</h2>
          <p>{te ? `${grade} · ${subject} కోసం పాఠ్యాంశ ప్రశ్నలు, తప్పులు మరియు గమనికలు.` : `A focused workspace using the ${grade} ${subject} question bank.`}</p>
        </div>
        <div className="study-stats" aria-label="Practice session statistics">
          <span><b>{score}</b><small>{te ? "సరైనవి" : "Correct"}</small></span>
          <span><b>{accuracy}%</b><small>{te ? "ఖచ్చితత్వం" : "Accuracy"}</small></span>
          <span><b>{savedIds.length}</b><small>{te ? "సేవ్ చేసినవి" : "Saved"}</small></span>
        </div>
      </div>

      <div className="study-tabs" role="tablist" aria-label={te ? "అభ్యాస సాధనాలు" : "Study tools"}>
        <button type="button" role="tab" aria-selected={mode === "practice"} className={mode === "practice" ? "active" : ""} onClick={() => changeMode("practice")}>🎯 {te ? "సాధన" : "Practice"}</button>
        <button type="button" role="tab" aria-selected={mode === "review"} className={mode === "review" ? "active" : ""} onClick={() => changeMode("review")}>🔁 {te ? "పునశ్చరణ" : "Review"} <span>{reviewQuestions.length}</span></button>
        <button type="button" role="tab" aria-selected={mode === "notes"} className={mode === "notes" ? "active" : ""} onClick={() => changeMode("notes")}>📝 {te ? "నా గమనికలు" : "My notes"}</button>
      </div>

      {mode === "notes" ? (
        <div className="study-notes-panel">
          <label htmlFor="study-notes">{te ? "ఈ తరగతి, విషయం కోసం మీ గమనికలు" : "Your notes for this class and subject"}</label>
          <textarea id="study-notes" value={notes} onChange={(event) => setNotes(event.target.value)} placeholder={te ? "ముఖ్యమైన విషయాలు, సూత్రాలు లేదా ప్రశ్నలు ఇక్కడ రాయండి…" : "Write key ideas, formulas, questions or reminders here…"} rows={6} />
          <p>{te ? "ఈ పరికరంలో స్వయంచాలకంగా సేవ్ అవుతాయి." : "Notes save automatically on this device."}</p>
        </div>
      ) : !current ? (
        <div className="study-empty">
          <span>🌱</span>
          <h3>{mode === "review" ? (te ? "పునశ్చరణకు ఏమీ లేదు!" : "You're all caught up!") : (te ? "ఈ విషయానికి ప్రశ్నలు త్వరలో వస్తాయి" : "More questions are coming soon")}</h3>
          <p>{mode === "review" ? (te ? "తప్పుగా సమాధానం ఇచ్చిన లేదా సేవ్ చేసిన ప్రశ్నలు ఇక్కడ కనిపిస్తాయి." : "Questions you miss or bookmark will appear here for another look.") : (te ? "మరొక విషయం ఎంచుకుని సాధన కొనసాగించండి." : "Choose another subject to keep learning with its available question bank.")}</p>
          {mode === "review" && <button type="button" onClick={() => changeMode("practice")}>{te ? "సాధనకు తిరిగి" : "Back to practice"}</button>}
        </div>
      ) : (
        <div className="study-question-panel">
          <div className="study-question-meta">
            <span>{mode === "review" ? (te ? "పునశ్చరణ ప్రశ్న" : "REVIEW QUESTION") : (te ? "సాధన ప్రశ్న" : "PRACTICE QUESTION")} · {index + 1}/{activeQuestions.length}</span>
            <button type="button" className={savedIds.includes(current.id) ? "study-bookmark saved" : "study-bookmark"} onClick={toggleSaved} aria-pressed={savedIds.includes(current.id)}>{savedIds.includes(current.id) ? "★ " + (te ? "సేవ్ అయింది" : "Saved") : "☆ " + (te ? "తర్వాత చదవండి" : "Save for later")}</button>
          </div>
          <div className="study-progress"><span style={{ width: `${((index + 1) / activeQuestions.length) * 100}%` }} /></div>
          <h3>{current.prompt[language].replace(/\s+/g, " ")}</h3>
          <div className="study-options">
            {current.choices.map((choice, choiceIndex) => (
              <button type="button" key={choiceIndex} disabled={selected !== null} className={selected === choiceIndex ? (isCorrect ? "correct" : "incorrect") : selected !== null && choiceIndex === current.correctChoiceIndex ? "correct" : ""} onClick={() => chooseAnswer(choiceIndex)}>
                <span>{String.fromCharCode(65 + choiceIndex)}</span>{choice[language]}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div className={isCorrect ? "study-feedback correct" : "study-feedback"}>
              <b>{isCorrect ? (te ? "చాలా బాగుంది! సరైన సమాధానం." : "Great work! That's correct.") : (te ? "మంచి ప్రయత్నం. సరైన సమాధానం చూడండి." : "Good effort. Let's learn the correct answer.")}</b>
              <p>{current.explanation[language]}</p>
              <button type="button" onClick={nextQuestion}>{te ? "తదుపరి ప్రశ్న →" : "Next question →"}</button>
            </div>
          )}
          <div className="study-question-footer">
            <span>{te ? "ప్రశ్నలను పునశ్చరణ కోసం సేవ్ చేసుకోండి." : "Bookmark questions you want to revisit."}</span>
            <button type="button" onClick={restartSession}>↻ {te ? "సెషన్ రీసెట్" : "Reset session"}</button>
          </div>
        </div>
      )}
    </section>
  );
}
