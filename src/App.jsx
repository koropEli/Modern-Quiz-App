import { useState, useMemo } from "react";
import { levelsData } from "./levelsData";
import ChapterVideo from "./ChapterVideo";

import ChapterOne from "./chapters/ChapterOne/ChapterOne";
import ChapterTwo from "./chapters/ChapterTwo/ChapterTwo";
import ChapterThree from "./chapters/ChapterThree/ChapterThree";
import ChapterFour from "./chapters/ChapterFour/ChapterFour";

import "./index.css";
import "./App.css";
import "./MainMenu.css";

function App() {
  const [screen, setScreen] = useState("menu"); 
  const [unlockedLevels] = useState([1, 2, 3, 4]); // Для тестирования все уровни открыты
  // const [unlockedLevels, setUnlockedLevels] = useState([1]);
  // Хранит объект текущей выбранной главы (напр. levelsData[0])
  const [currentLevel, setCurrentLevel] = useState(null);

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


  const currentBackground = useMemo(() => {
    if (screen === "menu") return "/mainMenuBackground.jpg";
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
      style={{ backgroundImage: `url(${currentBackground})` }} // Привязываем динамический фон
    >
      
      {screen === "menu" && (
        <div className="main-menu-layout"> 
          <div className="menu-box">
            <h1 className="game-title">Duck Throne</h1>
            <p className="game-subtitle">The Chronicles of Ascension</p>
            <div className="menu-buttons-list">
              {levelsData.map((level) => {
                // Проверяем, открыт ли уровень для игрока
                const isUnlocked = unlockedLevels.includes(level.id);
                return (
                  <button 
                    key={level.id} 
                    className="menu-btn" 
                    disabled={!isUnlocked} // Блокируем кнопку, если уровень закрыт
                    onClick={() => handleSelectLevel(level)} // Запуск логики выбора
                  >
                    <span><span className="marker">◆</span>{level.title}</span>
                    {!isUnlocked && <span className="lock-icon">🔒</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {screen !== "menu" && currentLevel && (
        <>
          {currentLevel.id === 1 && (
            <ChapterOne levelData={currentLevel} onLeave={() => setScreen("menu")} />
          )}
          
          {currentLevel.id === 2 && (
            <ChapterTwo levelData={currentLevel} onLeave={() => setScreen("menu")} />
          )}

          {/* Комментарии к 3 и 4 главе не удалены, они скрыты внутри условий */}
           
          {currentLevel.id === 3 && (
            <ChapterThree levelData={currentLevel} onLeave={() => setScreen("menu")} />
          )}
          
          {currentLevel.id === 4 && (
            <ChapterFour levelData={currentLevel} onLeave={() => setScreen("menu")} />
          )}
        </>
      )}
    </div>
  );
}

export default App;