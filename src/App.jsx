import { useState, useMemo, useEffect } from "react";
import { levelsData } from "./levelsData";
import ChapterVideo from "./ChapterVideo";

// Импортируем наш созданный модуль сохранений
import { progressStorage } from "./progressStorage";

import ChapterOne from "./chapters/ChapterOne/ChapterOne";
import ChapterTwo from "./chapters/ChapterTwo/ChapterTwo";
import ChapterThree from "./chapters/ChapterThree/ChapterThree";
import ChapterFour from "./chapters/ChapterFour/ChapterFour";

import "./index.css";
import "./App.css";
import "./MainMenu.css";

function App() {
  const [screen, setScreen] = useState("menu"); 
  
  // Живой массив открытых уровней, который теперь изначально грузится из памяти браузера
  const [unlockedLevels, setUnlockedLevels] = useState(() => progressStorage.getUnlockedLevels());
  
  // Хранит объект текущей выбранной главы (напр. levelsData[0])
  const [currentLevel, setCurrentLevel] = useState(null);

  // Синхронизируем прогресс из localStorage каждый раз, когда игрок возвращается в главное меню
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

  // Новая функция для кнопки "Начать заново"
  function handleResetGame() {
    const confirmReset = window.confirm(
      "👑 Вы уверены, что хотите свергнуть текущую династию? Весь прогресс прохождения глав будет безвозвратно утерян!"
    );
    if (confirmReset) {
      progressStorage.resetProgress(); // Стираем в localStorage
      setUnlockedLevels([1]);          // Запираем стейт обратно до 1 главы
      setScreen("menu");               // Принудительно обновляем экран меню
    }
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

            {/* Декоративная линия разделения */}
            <hr style={{ borderColor: "rgba(251, 191, 36, 0.2)", margin: "25px auto", width: "80%" }} />

            {/* Кнопка сброса прогресса */}
            <button 
              className="menu-reset-btn"
              onClick={handleResetGame}
              style={{
                background: "transparent",
                color: "#f43f5e",
                border: "1px dashed #f43f5e",
                padding: "10px 20px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: "1px",
                textTransform: "uppercase",
                transition: "all 0.2s ease",
                marginTop: "10px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(244, 63, 94, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              ☢️ Reset Chronicles
            </button>
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