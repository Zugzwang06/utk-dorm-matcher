import { useState } from "react";
import { DORMS } from "./Dorms.Js";
import "./Homepage.css";

const NOISE_COLOR = {
  "Very lively": "#e8502a",
  "Lively":      "#e8832a",
  "Moderate":    "#2a7de8",
  "Quieter":     "#2ab57d",
};

const COST_LABEL = {
  "$":   "Most affordable",
  "$$":  "Mid-range",
  "$$$": "Premium",
};

function DormCard({ dorm, onClick }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="dorm-card" onClick={() => onClick(dorm)}>
      <div className="dorm-card-img">
        {!imgError ? (
          <img
            src={dorm.layoutImage}
            alt={dorm.name}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="dorm-card-img-fallback">
            <span>🏠</span>
            <p>{dorm.name}</p>
          </div>
        )}
        <div className="dorm-card-type">{dorm.type}</div>
      </div>
      <div className="dorm-card-body">
        <div className="dorm-card-top">
          <h3 className="dorm-card-name">{dorm.name}</h3>
          <span className="dorm-card-cost" title={COST_LABEL[dorm.cost]}>{dorm.cost}</span>
        </div>
        <p className="dorm-card-tagline">{dorm.tagline}</p>
        <div className="dorm-card-pills">
          <span
            className="dorm-pill noise"
            style={{ background: NOISE_COLOR[dorm.noise] + "18", color: NOISE_COLOR[dorm.noise] }}
          >
            {dorm.noise}
          </span>
          <span className="dorm-pill">{dorm.location}</span>
          <span className="dorm-pill">{dorm.roomStyle}</span>
        </div>
      </div>
    </div>
  );
}

function DormModal({ dorm, onClose }) {
  const [imgError, setImgError] = useState(false);
  if (!dorm) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-img">
          {!imgError ? (
            <img src={dorm.layoutImage} alt={dorm.name} onError={() => setImgError(true)} />
          ) : (
            <div className="modal-img-fallback">
              <span>🏠</span>
            </div>
          )}
        </div>

        <div className="modal-body">
          <div className="modal-header">
            <div>
              <div className="modal-type">{dorm.type}</div>
              <h2 className="modal-name">{dorm.name}</h2>
            </div>
            <div className="modal-cost">{dorm.cost}</div>
          </div>

          <p className="modal-desc">{dorm.description}</p>

          <div className="modal-stats">
            <div className="modal-stat">
              <div className="mstat-label">Opened</div>
              <div className="mstat-val">{dorm.opened}</div>
            </div>
            <div className="modal-stat">
              <div className="mstat-label">Capacity</div>
              <div className="mstat-val">{dorm.capacity}</div>
            </div>
            <div className="modal-stat">
              <div className="mstat-label">Room style</div>
              <div className="mstat-val">{dorm.roomStyle}</div>
            </div>
            <div className="modal-stat">
              <div className="mstat-label">AC</div>
              <div className="mstat-val">{dorm.ac}</div>
            </div>
            <div className="modal-stat">
              <div className="mstat-label">Noise level</div>
              <div className="mstat-val">{dorm.noise}</div>
            </div>
            <div className="modal-stat">
              <div className="mstat-label">Location</div>
              <div className="mstat-val">{dorm.location}</div>
            </div>
          </div>

          <div className="modal-tags">
            {dorm.tags.map((t) => (
              <span key={t} className="modal-tag">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage({ onStartQuiz }) {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");

  const FILTERS = ["All", "Community-style", "Suite-style", "Suite + Community mix"];

  const filtered =
    filter === "All" ? DORMS : DORMS.filter((d) => d.type === filter);

  return (
    <div className="home">
      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">
          <span className="nav-logo-icon">🍊</span>
          <span className="nav-logo-text">VolDorms</span>
        </div>
        <button className="nav-quiz-btn" onClick={onStartQuiz}>
          Take the Quiz →
        </button>
      </nav>

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-inner">
          <div className="hero-badge">UTK Freshman Housing · 2025–26</div>
          <h1 className="hero-title">
            Your Guide to<br />
            <em>UTK Dorms</em>
          </h1>
          <p className="hero-sub">
            Browse all 11 freshman-eligible residence halls, see their layouts,
            and find the one that's right for you.
          </p>

          {/* QUIZ CTA BANNER */}
          <div className="quiz-cta" onClick={onStartQuiz}>
            <div className="quiz-cta-left">
              <div className="quiz-cta-icon">🎯</div>
              <div>
                <div className="quiz-cta-title">Get your personalized dorm based on your needs by taking this quiz!</div>
                <div className="quiz-cta-sub">5 quick questions → your perfect match</div>
              </div>
            </div>
            <button className="quiz-cta-btn">Start Quiz →</button>
          </div>
        </div>
      </section>

      {/* DORM GRID */}
      <section className="dorms-section">
        <div className="dorms-inner">
          <div className="section-header">
            <h2 className="section-title">All Freshman Dorms</h2>
            <p className="section-sub">Click any dorm to see full details</p>
          </div>

          {/* FILTER TABS */}
          <div className="filter-tabs">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`filter-tab ${filter === f ? "active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="dorm-grid">
            {filtered.map((dorm) => (
              <DormCard key={dorm.name} dorm={dorm} onClick={setSelected} />
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="footer-cta">
        <div className="footer-cta-inner">
          <h2>Still not sure which dorm is right for you?</h2>
          <p>Take our 5-question quiz and get a personalized recommendation.</p>
          <button className="footer-quiz-btn" onClick={onStartQuiz}>
            Get my personalized match 🍊
          </button>
          <p className="footer-note">
            Data based on 2025–26 UTK housing info.{" "}
            <a href="https://studentlife.utk.edu/housing" target="_blank" rel="noreferrer">
              Always verify at studentlife.utk.edu/housing ↗
            </a>
          </p>
        </div>
      </section>

      {/* MODAL */}
      <DormModal dorm={selected} onClose={() => setSelected(null)} />
    </div>
  );
}