// useState - для хранения данных, меняющих экран
// useMemo - для запоминания вычислений
// useEffect - для действий, происходящих при загрузке/изменениях
import { useState, useMemo, useEffect } from "react";

import { levelsData } from "./levelsData";
import ChapterVideo from "./ChapterVideo";
import { progressStorage } from "./progressStorage";

import ChapterOne from "./chapters/ChapterOne/ChapterOne";
import ChapterTwo from "./chapters/ChapterTwo/ChapterTwo";
import ChapterThree from "./chapters/ChapterThree/ChapterThree";
import ChapterFour from "./chapters/ChapterFour/ChapterFour";

import "./index.css";
import "./App.css";
import "./MainMenu.css";

function App() {
  // Текущий экран. По умолчанию показываем "menu"
  const [screen, setScreen] = useState("menu"); 
  // Хранит список открытых уровней. Сразу при старте берет данные из progressStorage
  const [unlockedLevels, setUnlockedLevels] = useState(() => progressStorage.getUnlockedLevels());
  // Хранит объект уровня, который игрок сейчас выбрал кликом (например, всю Главу 1)
  const [currentLevel, setCurrentLevel] = useState(null);

  // useEffect следит за переменной 'screen'. 
  // Если мы вернулись в "menu", он заново считывает память, чтобы убрать замочки с новых уровней
  useEffect(() => {
    if (screen === "menu") {
      setUnlockedLevels(progressStorage.getUnlockedLevels());
    }
  }, [screen]);

  // Функция запускается, когда кликаем на кнопку уровня в меню
  function handleSelectLevel(level) {
    // Запоминаем, в какую главу мы заходим
    setCurrentLevel(level);
    // Если у главы есть видео, включаем экран "video", иначе сразу "story" (саму игру)
    if (level.video) {
      setScreen("video");
    } else {
      setScreen("story"); 
    }
  }

  // Функция запускается, когда видео заканчивается (или мы его скипаем)
  function handleVideoFinished() {
    setScreen("story");
  }

  // Функция для сброса всего прогресса
  function handleResetGame() {
    const confirmReset = window.confirm(
      "👑 Are you sure you want to overthrow the current dynasty? All progress will be lost!"
    );
    if (confirmReset) {
      // Если нажал "Да" -> чистим память браузера
      progressStorage.resetProgress(); 
      setUnlockedLevels([1]);          
      // Выкидываем игрока в меню
      setScreen("menu");               
    }
  }

  // useMemo "вычисляет" какую картинку поставить на фон всего приложения
  const currentBackground = useMemo(() => {
    // Если мы в меню — ставим картинку меню
    if (screen === "menu") return "/mainMenuBackground.jpg";
    // Если мы в уровне — ставим картинку уровня (quizBg из levelsData)
    if (currentLevel) {
      return currentLevel.quizBg || "/mainMenuBackground.jpg"; 
    }
    // На всякий случай (по умолчанию)
    return "/mainMenuBackground.jpg";
  }, [screen, currentLevel]); // Пересчитываем только если изменился экран или уровень


  // ЧТО МЫ ПОКАЗЫВАЕМ НА ЭКРАНЕ (Верстка)

  // 1. Если режим "video" — показываем только плеер
  if (screen === "video" && currentLevel) {
    return (
      <ChapterVideo 
        videoSrc={currentLevel.video}
        onVideoEnd={handleVideoFinished}
      />
    );
  }

  // 2. Если не видео, рисуем главный контейнер с нашими обоями (background)
  return (
    <div 
      className="game-app-container" 
      style={{ backgroundImage: `url(${currentBackground})` }} 
    >
      
      {/* 2.1. Если режим "menu" — рисуем кнопки */}
      {screen === "menu" && (
        <div className="main-menu-layout"> 
          <div className="menu-box">
            <h1 className="game-title">Duck Throne</h1>
            <p className="game-subtitle">The Chronicles of Ascension</p>
            
            <div className="menu-buttons-list">
              {/* Проходимся по всем уровням из базы данных и делаем для каждого кнопку */}
              {levelsData.map((level) => {
                // Узнаем, открыт ли этот уровень, проверяя массив unlockedLevels
                const isUnlocked = unlockedLevels.includes(level.id);
                return (
                  <button 
                    key={level.id} 
                    className="menu-btn" 
                    // Если не открыт (!isUnlocked) — кнопка disabled (серая и не нажимается)
                    disabled={!isUnlocked} 
                    onClick={() => handleSelectLevel(level)} 
                  >
                    <span><span className="marker">◆</span>{level.title}</span>
                    {/* Если не открыт — рисуем иконку замочка */}
                    {!isUnlocked && <span className="lock-icon">🔒</span>}
                  </button>
                );
              })}
            </div>

            {/* Декоративная линия */}
            <hr style={{ borderColor: "rgba(251, 191, 36, 0.2)", margin: "25px auto", width: "80%" }} />

            {/* Наша новая кнопка обнуления прогресса */}
            <button 
              className="menu-reset-btn"
              onClick={handleResetGame}
            >
              ☢️ Reset Chronicles
            </button>
          </div>
        </div>
      )}

      {/* 2.2. Если режим не меню (то есть "story") — показываем сам уровень */}
      {screen !== "menu" && currentLevel && (
        <>
          {/* Смотрим на ID уровня и рендерим нужный компонент. 
              onLeave={...} — это функция, которую глава вызовет, когда захочет вернуть нас в меню */}
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