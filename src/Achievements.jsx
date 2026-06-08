import React, { useState, useEffect } from "react";
import "./Achievements.css";
import { progressStorage } from "./progressStorage";

function Achievements({ onBack }) {
  const [unlocked, setUnlocked] = useState([]);

  useEffect(() => {
    setUnlocked(progressStorage.getAchievements());
  }, []);

  const achievementsData = [
    { id: "merciful_don", title: "The Merciful Don", desc: "Chapter III: Spared the rival.", image: "/cardDiamond.jpg" },
    { id: "ruthless_don", title: "The Ruthless Don", desc: "Chapter III: Eliminated the threat.", image: "/cardAceofSpades.jpg" },
    { id: "peacemaker", title: "The Peacemaker", desc: "Chapter IV: United the duck ponds.", image: "/cardHeart.jpg" },
    { id: "emperor_duck", title: "Emperor Duck", desc: "Chapter IV: Ruled with an iron wing.", image: "/cardAceofClubs.jpg" },
  ];

  return (
    <div className="achievements-layout">
      <div className="achievements-container">
        <div className="achievements-header">
          <h2>Trophy Room</h2>
          <p>Unlocked: {unlocked.length} / 4</p>
        </div>

        <div className="achievements-grid">
          {achievementsData.map((ach) => {
            const isUnlocked = unlocked.includes(ach.id);
            return (
              <div key={ach.id} className={`achievement-card ${isUnlocked ? "unlocked" : "locked"}`}>
                <div className="achievement-icon">
                  {isUnlocked ? (
                    <img src={ach.image} alt={ach.title} className="achievement-img-small" />
                  ) : (
                    "❓"
                  )}
                </div>
                <h3>{isUnlocked ? ach.title : "Locked"}</h3>
                <p>{isUnlocked ? ach.desc : "Keep playing to discover."}</p>
              </div>
            );
          })}
        </div>

        <button className="back-to-menu-btn" onClick={onBack}>
          🡨 Return to Menu
        </button>
      </div>
    </div>
  );
}

export default Achievements;