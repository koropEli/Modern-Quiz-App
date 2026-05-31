import { useState, useMemo } from "react";
import { levelsData } from "./levelsData";
import ChapterVideo from "./ChapterVideo";
import "./index.css";
import "./MainMenu.css";
import "./ChapterOne.css";
import "./chapterTwo.css";
import "./chapterThree.css";
import "./chapterFour.css";

function App() {
  const [screen, setScreen] = useState("menu"); 
  const [unlockedLevels, setUnlockedLevels] = useState([1, 2, 3, 4]);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // индекс текущего вопроса в массиве вопросов
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);//(true/false). Предотвращает повторные клики
  const [selectedChoiceIdx, setSelectedChoiceIdx] = useState(null);

  // currentQuestion возвращает объект текущего вопроса (текст и варианты ответов)
  const currentQuestion = useMemo(() => {
    if (!currentLevel) return null; 
    return currentLevel.questions[currentIndex]; 
  }, [currentLevel, currentIndex]);

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

  function startQuiz() {
    setCurrentIndex(0);
    setScore(0);
    setAnswered(false);
    setSelectedChoiceIdx(null);
    setScreen("quiz");
  }

  function handleQuizAnswer(index) {
    if (answered) return;
    setSelectedChoiceIdx(index);
    
    if (index === currentQuestion.correct) {
      setScore((s) => s + 1);
    }
    setAnswered(true);
  }

  function handleNext() {
    setCurrentIndex((prev) => prev + 1);
    setAnswered(false);
    setSelectedChoiceIdx(null); // сбрасываем выбор ответа для следующего вопроса
  }

  const currentBackground = useMemo(() => {
    if (screen === "menu") return "/mainMenuBackground.jpg"; 
    if (currentLevel) {
      if (currentLevel.id === 1 && (screen === "story" || screen === "quiz")) {
        return "/backgroundChapter1.jpg";
      }
      return "/mainMenuBackground.jpg";
    }
    return "/mainMenuBackground.jpg";
  }, [screen, currentLevel]);

// Early Return
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
      
      {screen === "menu" && (
        <div className="main-menu-layout"> 
          <div className="menu-box">
            <h1 className="game-title">Duck Throne</h1>
            <p className="game-subtitle">The Chronicles of Ascension</p>
            <div className="menu-buttons-list">
              {levelsData.map((level) => {
                // Проверяем, находится ли id уровня в массиве unlockedLevels
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
          </div>
        </div>
      )}

      {screen === "story" && currentLevel && (
        <div className={currentLevel.themeClass}>
          <div className="chapter-one-layout">
            <div className="ch1-screen-wrapper">
              <button className="ch1-back-btn" onClick={() => setScreen("menu")}>🡨 Back to Map</button>
              <div className="ch1-card"> 
                <div className="top-bar"><span>Prologue</span><span>Status: Ready</span></div>
                <h1 className="story-title">{currentLevel.title}</h1>
                <p className="story-text">{currentLevel.story}</p>
                <button className="ch1-action-btn" onClick={startQuiz}>Begin Trial ➜</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {screen === "quiz" && currentLevel && (
        <div className={currentLevel.themeClass}>
          <div className="chapter-one-layout"> 
            <div className="ch1-screen-wrapper">
              <button className="ch1-back-btn" onClick={() => setScreen("menu")}>🡨 Abandon Mission</button>
              <div className="ch1-card">
                {currentIndex >= currentLevel.questions.length ? (
                  <>
                    <div className="top-bar">
                      <span>Victory</span>
                      <span>Score: {score} / {currentLevel.questions.length}</span>
                    </div>
                    <h1 style={{ color: "#fff", marginBottom: "15px" }}>Chapter Cleared!</h1>
                    <div style={{ textAlign: "center", margin: "20px 0" }}>
                      <img src="/dancingduck.gif" alt="Duck" style={{ width: "100px" }} />
                    </div>
                    <button className="ch1-action-btn" onClick={() => setScreen("menu")}>Continue Journey ➜</button>
                  </>
                ) : (
                  /* РЕНДЕРИНГ ВОПРОСА И ОТВЕТОВ */
                  <>
                    <div className="top-bar">
                      <span>Question {currentIndex + 1} / {currentLevel.questions.length}</span>
                    </div>
                    <h2>{currentQuestion.text}</h2>
                    <div className="ch1-answers-grid">
                      {currentQuestion.options.map((option, idx) => {
                        const isCorrect = idx === currentQuestion.correct; 
                        const isSelected = selectedChoiceIdx === idx;
                        
                        return (
                          <button 
                            key={idx} 
                            
                            className={`ch1-answer-btn ${answered && isCorrect ? "correct" : ""} ${isSelected && !isCorrect ? "wrong" : ""}`} 
                            disabled={answered} 
                            onClick={() => handleQuizAnswer(idx)}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>

                    {answered && (
                      <div className="ch1-duck-feedback">
                        <img src="/feedbackduck.gif" className="ch1-duck-gif" alt="Feedback" />
                        <span className={selectedChoiceIdx === currentQuestion.correct ? "ch1-correct-txt" : "ch1-wrong-txt"}>
                          {selectedChoiceIdx === currentQuestion.correct ? "Quack! Perfect Blueprint!" : "Oh no! Incorrect specification!"}
                        </span>
                      </div>
                    )}
                    {answered && (
                      <button className="ch1-action-btn" onClick={handleNext}>Next ➜</button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;