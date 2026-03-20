import { useState } from "react";
import { DORMS } from "./Dorms.Js";
import "./QuizPage.css";

const QUESTIONS = [
  {
    id: "vibe", step: "Question 1 of 5",
    text: "What kind of social scene do you want?",
    opts: [
      { icon: "🎉", name: "Super lively",    sub: "Always something happening, tons of people", val: "lively"   },
      { icon: "⚖️", name: "Balanced",         sub: "Social but not overwhelming",                val: "balanced" },
      { icon: "📚", name: "Chill & focused",  sub: "Quiet floors, study-friendly vibes",         val: "quiet"    },
      { icon: "🔒", name: "Keep to myself",   sub: "Privacy matters, small community",            val: "private"  },
    ],
  },
  {
    id: "distance", step: "Question 2 of 5",
    text: "How far are you willing to walk to class?",
    opts: [
      { icon: "🏃", name: "Super close",       sub: "I want to roll out of bed and be there",  val: "veryclose" },
      { icon: "🚶", name: "5–10 min",           sub: "A short walk is totally fine",            val: "close"     },
      { icon: "🛴", name: "10–15 min",          sub: "I don't mind a bit of a trek",            val: "medium"    },
      { icon: "🎧", name: "Distance? Whatever", sub: "Location isn't really my priority",       val: "any"       },
    ],
  },
  {
    id: "roomtype", step: "Question 3 of 5",
    text: "What room style do you prefer?",
    opts: [
      { icon: "🚿", name: "Suite-style",     sub: "Private or semi-private bathroom in room", val: "suite"     },
      { icon: "🚻", name: "Community bath",  sub: "Shared hall bathrooms, cleaned daily",     val: "community" },
      { icon: "🏠", name: "Apartment-style", sub: "Full kitchen, more independence",           val: "apartment" },
      { icon: "🤷", name: "No preference",   sub: "Whatever gets me the best match",           val: "any"       },
    ],
  },
  {
    id: "budget", step: "Question 4 of 5",
    text: "What's your budget priority?",
    opts: [
      { icon: "💵", name: "Keep it cheap",   sub: "Most affordable option possible",        val: "low"  },
      { icon: "💳", name: "Mid-range",        sub: "Good value, not the absolute cheapest",  val: "mid"  },
      { icon: "✨", name: "Premium is fine",  sub: "Best amenities, I'll pay for it",        val: "high" },
      { icon: "🤷", name: "Not a factor",     sub: "Budget isn't deciding my choice",        val: "any"  },
    ],
  },
  {
    id: "amenity", step: "Question 5 of 5",
    text: "What amenity matters most to you?",
    opts: [
      { icon: "🍽️", name: "Dining nearby",  sub: "On-site or steps from a dining hall",   val: "dining"  },
      { icon: "❄️",  name: "Central AC",     sub: "Climate control is non-negotiable",      val: "ac"      },
      { icon: "💪",  name: "Fitness & rec",  sub: "Easy access to workout facilities",      val: "fitness" },
      { icon: "🌳",  name: "Outdoor space",  sub: "Courtyards, greenery, campus feel",      val: "outdoor" },
    ],
  },
];

function calcScores(answers) {
  return DORMS.map((d) => {
    let total = 0;
    for (const [qid, val] of Object.entries(answers)) {
      total += d.scores[qid]?.[val] ?? 1;
    }
    const max = Object.keys(answers).length * 3;
    return { ...d, pct: Math.round((total / max) * 100) };
  }).sort((a, b) => b.pct - a.pct);
}

function MatchCard({ dorm, rank }) {
  const [imgError, setImgError] = useState(false);
  const isTop = rank === 0;

  return (
    <div className={`match-card ${isTop ? "gold" : ""}`}>
      {isTop && <div className="match-banner">🏆 Best Match — Go Vols!</div>}
      <div className="match-img">
        {!imgError ? (
          <img src={dorm.layoutImage} alt={dorm.name} onError={() => setImgError(true)} />
        ) : (
          <div className="match-img-fallback">🏠</div>
        )}
        <div className="match-pct">{dorm.pct}% match</div>
      </div>
      <div className="match-body">
        <div className="match-type">{dorm.type}</div>
        <h3 className="match-name">{dorm.name}</h3>
        <div className="match-bar-wrap">
          <div className="match-bar-track">
            <div className="match-bar-fill" style={{ width: `${dorm.pct}%` }} />
          </div>
        </div>
        <p className="match-tagline">{dorm.tagline}</p>
        <div className="match-pills">
          <div className="mpill"><div className="mpill-lbl">Cost</div><div className="mpill-val">{dorm.cost}</div></div>
          <div className="mpill"><div className="mpill-lbl">Noise</div><div className="mpill-val">{dorm.noise}</div></div>
          <div className="mpill"><div className="mpill-lbl">Style</div><div className="mpill-val">{dorm.roomStyle}</div></div>
          <div className="mpill"><div className="mpill-lbl">Location</div><div className="mpill-val small">{dorm.location}</div></div>
        </div>
      </div>
    </div>
  );
}

export default function QuizPage({ onBack }) {
  const [step, setStep]             = useState(0);
  const [answers, setAnswers]       = useState({});
  const [showResults, setShowResults] = useState(false);

  const q        = QUESTIONS[step];
  const selected = answers[q?.id];

  function pick(qid, val) { setAnswers((prev) => ({ ...prev, [qid]: val })); }
  function next() { step < QUESTIONS.length - 1 ? setStep((s) => s + 1) : setShowResults(true); }
  function back() { setStep((s) => s - 1); }
  function retake() { setStep(0); setAnswers({}); setShowResults(false); }

  const top3 = showResults ? calcScores(answers).slice(0, 3) : [];

  return (
    <div className="quiz-page">
      {/* NAV */}
      <nav className="qnav">
        <button className="qnav-back" onClick={onBack}>
          ← Back to all dorms
        </button>
        <div className="qnav-logo">🍊 VolDorms</div>
      </nav>

      <div className="quiz-wrap">
        {!showResults ? (
          <>
            {/* HEADER */}
            <div className="quiz-header">
              <h1>Find Your <em>Vol Home</em></h1>
              <p>Answer 5 questions to get your personalized dorm recommendation.</p>
            </div>

            {/* PROGRESS */}
            <div className="progress">
              {QUESTIONS.map((_, i) => (
                <div key={i} className={`pip ${i < step ? "done" : i === step ? "active" : ""}`} />
              ))}
            </div>

            {/* QUESTION */}
            <div className="qcard">
              <div className="q-step">{q.step}</div>
              <div className="q-text">{q.text}</div>
              <div className="opts">
                {q.opts.map((opt) => (
                  <button
                    key={opt.val}
                    className={`opt ${selected === opt.val ? "sel" : ""}`}
                    onClick={() => pick(q.id, opt.val)}
                  >
                    <span className="opt-icon">{opt.icon}</span>
                    <div className="opt-name">{opt.name}</div>
                    <div className="opt-sub">{opt.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* NAV BUTTONS */}
            <div className="qnav-btns">
              {step > 0 && (
                <button className="btn-back" onClick={back}>← Back</button>
              )}
              <button className="btn-next" disabled={!selected} onClick={next}>
                {step === QUESTIONS.length - 1 ? "See my match 🍊" : "Next →"}
              </button>
            </div>
          </>
        ) : (
          /* RESULTS */
          <div className="results">
            <div className="results-header">
              <h1>Your Top <em>Matches</em></h1>
              <p>Based on your answers, here are the best UTK freshman dorms for you.</p>
            </div>

            {top3.map((dorm, i) => (
              <MatchCard key={dorm.name} dorm={dorm} rank={i} />
            ))}

            <div className="results-actions">
              <button className="btn-retake" onClick={retake}>↺ Retake the quiz</button>
              <button className="btn-browse" onClick={onBack}>Browse all dorms →</button>
            </div>

            <p className="results-note">
              Results based on 2025–26 UTK housing data. Always verify at{" "}
              <a href="https://studentlife.utk.edu/housing" target="_blank" rel="noreferrer">
                studentlife.utk.edu/housing
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}