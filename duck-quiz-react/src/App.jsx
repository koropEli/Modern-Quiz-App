import { useState, useMemo } from "react";
import { levelsData } from "./levelsData";
import ChapterVideo from "./ChapterVideo";

// Импортируем компоненты игровых глав
import ChapterOne from "./chapters/ChapterOne/ChapterOne";
import ChapterTwo from "./chapters/ChapterTwo/ChapterTwo";
// import ChapterThree from "./chapters/ChapterThree/ChapterThree";
// import ChapterFour from "./chapters/ChapterFour/ChapterFour";

import "./index.css";
import "./App.css";
import "./MainMenu.css";

function App() {
  // Переключатель экранов. Может принимать значения: "menu", "video", "story"
  const [screen, setScreen] = useState("menu"); 
  // Массив ID уровней, которые открыты для нажатия. Пока открыты 1 и 2 главы
  const [unlockedLevels] = useState([1, 2]);
  // Хранит объект текущей выбранной главы (напр. levelsData[0])
  const [currentLevel, setCurrentLevel] = useState(null);

  // Функция срабатывает при выборе главы в меню
  function handleSelectLevel(level) {
    setCurrentLevel(level); // Запоминаем выбранную главу
    if (level.video) {
      setScreen("video"); // Если у уровня прописано видео — включаем плеер
    } else {
      setScreen("story"); // Иначе сразу переходим к карточке пролога
    }
  }

  // Функция вызывается, когда видеоролик просмотрен или пропущен
  function handleVideoFinished() {
    setScreen("story"); // Переключаем игрока на экран текстового пролога главы
  }

  // Специфический хук useMemo оптимизирует смену фоновой картинки всего приложения
  const currentBackground = useMemo(() => {
    if (screen === "menu") return "/mainMenuBackground.jpg"; // Обои для главного меню
    if (currentLevel) {
      return currentLevel.quizBg || "/mainMenuBackground.jpg"; // Обои выбранной главы
    }
    return "/mainMenuBackground.jpg";
  }, [screen, currentLevel]); // Пересчитывать картинку только при изменении экрана или уровня

  // УСЛОВИЕ 1: Если включен режим видео и уровень выбран — рендерим только видеоплеер
  if (screen === "video" && currentLevel) {
    return (
      <ChapterVideo 
        videoSrc={currentLevel.video}
        onVideoEnd={handleVideoFinished}
      />
    );
  }

  // ОСНОВНОЙ РЕНДЕР ПРИЛОЖЕНИЯ
  return (
    <div 
      className="game-app-container" 
      style={{ backgroundImage: `url(${currentBackground})` }} // Привязываем динамический фон
    >
      
      {/* ЭКРАН: ГЛАВНОЕ МЕНЮ (показывается только если screen === "menu") */}
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

      {/* ЭКРАН: ИГРОВЫЕ ГЛУБИНЫ КВИЗА (Показывается, если мы вышли из главного меню) */}
      {screen !== "menu" && currentLevel && (
        <>
          {/* Если ID уровня равен 1 — рендерим первую главу */}
          {currentLevel.id === 1 && (
            <ChapterOne levelData={currentLevel} onLeave={() => setScreen("menu")} />
          )}
          
          {/* Если ID уровня равен 2 — рендерим вторую главу */}
          {currentLevel.id === 2 && (
            <ChapterTwo levelData={currentLevel} onLeave={() => setScreen("menu")} />
          )}

          {/* Комментарии к 3 и 4 главе не удалены, они скрыты внутри условий */}
          {/*
          {currentLevel.id === 3 && (
            <ChapterThree levelData={currentLevel} onLeave={() => setScreen("menu")} />
          )}

          {currentLevel.id === 4 && (
            <ChapterFour levelData={currentLevel} onLeave={() => setScreen("menu")} />
          )}
          */}
        </>
      )}
    </div>
  );
}

export default App;