import { useState, useMemo, useEffect } from "react";

import { levelsData } from "./levelsData";
import ChapterVideo from "./ChapterVideo";
import { progressStorage } from "./progressStorage";

import ChapterOne from "./chapters/ChapterOne/ChapterOne";
import ChapterTwo from "./chapters/ChapterTwo/ChapterTwo";
import ChapterThree from "./chapters/ChapterThree/ChapterThree";
import ChapterFour from "./chapters/ChapterFour/ChapterFour";
import Achievements from "./Achievements";

import "./index.css";
import "./App.css";
import "./MainMenu.css";

function App() {
  const [screen, setScreen] = useState("menu"); 
  const [unlockedLevels, setUnlockedLevels] = useState(() => progressStorage.getUnlockedLevels());
  const [currentLevel, setCurrentLevel] = useState(null);

  useEffect(() => {
    if (screen === "menu") {
      setUnlockedLevels(progressStorage.getUnlockedLevels());
    }
  }, [screen]);

  function handleSelectLevel(level) {
    setCurrentLevel(level);
    if (level.video) {
      setScreen("video");
    } else {
      setScreen("story"); 
    }
  }

  function handleVideoFinished() {
    setScreen("story");
  }

  function handleResetGame() {
    if (window.confirm("Are you sure? This will delete all your progress and achievements!")) {
      progressStorage.resetAll(); // Вызывает твой метод из progressStorage
    }
    if (confirmReset) {
      progressStorage.resetProgress(); 
      setUnlockedLevels([1]);           
      setScreen("menu");               
    }
  }

  const currentBackground = useMemo(() => {
    if (screen === "menu" || screen === "achievements") return "/mainMenuBackground.jpg";
    if (currentLevel) {
      return currentLevel.quizBg || "/mainMenuBackground.jpg"; 
    }
    return "/mainMenuBackground.jpg";
  }, [screen, currentLevel]);


  if (screen === "video" && currentLevel) {
    return (
      <ChapterVideo 
        videoSrc={currentLevel.video}
        onVideoEnd={handleVideoFinished}
      />
    );
  }


  return (
    <div 
      className="game-app-container" 
      style={{ backgroundImage: `url(${currentBackground})` }} 
    >
      
      {/* 2.1. Меню */}
      {screen === "menu" && (
        <div className="main-menu-layout"> 
          <div className="menu-box">
            <h1 className="game-title">Duck Throne</h1>
            <p className="game-subtitle">The Chronicles of Ascension</p>
            
            <div className="menu-buttons-list">
              {levelsData.map((level) => {
                const isUnlocked = unlockedLevels.includes(level.id);
                return (
                  <button 
                    key={level.id} 
                    className="menu-btn" 
                    disabled={!isUnlocked} 
                    onClick={() => handleSelectLevel(level)} 
                  >
                    <span><span className="marker">◆</span>{level.title}</span>
                    {!isUnlocked && <span className="lock-icon">🔒</span>}
                  </button>
                );
              })}
            </div>
            
            <hr style={{ borderColor: "rgba(251, 191, 36, 0.2)", margin: "25px auto", width: "80%" }} />

            {/* Кнопки теперь в контейнере, который растянет их по бокам */}
            <div className="menu-bottom-buttons">
              <button className="menu-reset-btn" onClick={handleResetGame}>
                ☢️ Reset Chronicles
              </button>
              <button className="achievements-btn" onClick={() => setScreen("achievements")}>
                🏆 Achievements
              </button>
            </div>
          </div>
        </div>
      )}

      {screen === "achievements" && (
        <Achievements onBack={() => setScreen("menu")} />
      )}

      {screen === "story" && currentLevel && (
        <>
          {currentLevel.id === 1 && <ChapterOne levelData={currentLevel} onLeave={() => setScreen("menu")} />}
          {currentLevel.id === 2 && <ChapterTwo levelData={currentLevel} onLeave={() => setScreen("menu")} />}
          {currentLevel.id === 3 && <ChapterThree levelData={currentLevel} onLeave={() => setScreen("menu")} />}
          {currentLevel.id === 4 && <ChapterFour levelData={currentLevel} onLeave={() => setScreen("menu")} />}
        </>
      )}
    </div>
  );
}

export default App;