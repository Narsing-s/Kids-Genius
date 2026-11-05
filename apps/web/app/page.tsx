import {ageBands,subjects,sampleQuestions} from "@kids-genius/learning";
export default function Home(){return <main className="shell">
<header className="top"><div className="brand">🌈 Kids Genius</div><span className="pill">English · తెలుగు</span></header>
<section className="hero"><span className="pill">Learn · Play · Grow</span><h1>Big discoveries start with little questions!</h1><p className="muted">A joyful learning world for curious minds aged 1–10.</p><button className="cta">Explore learning</button></section>
<h2>Choose your learning level</h2><section className="grid">{ageBands.map(a=><article className="card" key={a.id}><div className="emoji">{a.emoji}</div><h3>{a.name}</h3><p className="muted">Ages {a.minAge}–{a.maxAge} · {a.description}</p></article>)}</section>
<h2>Explore subjects</h2><section className="grid">{subjects.map(s=><article className="card" key={s.id}><div className="emoji">{s.emoji}</div><h3>{s.name.en} / {s.name.te}</h3><p className="muted">{s.description}</p></article>)}</section>
<section className="card" style={{marginTop:24}}><h2>Sample question</h2><p>{sampleQuestions[0].prompt.en}</p><p className="muted">{sampleQuestions[0].prompt.te}</p><p>Answer: {sampleQuestions[0].choices[0].en} / {sampleQuestions[0].choices[0].te}</p></section>
<footer>Parent-managed learning · No public chat · No behavioural ads</footer></main>}