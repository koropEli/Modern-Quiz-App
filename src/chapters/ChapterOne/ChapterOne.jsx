import { useState, useMemo } from "react";
import "./ChapterOne.css";
import { progressStorage } from "../../progressStorage";

function ChapterOne({ levelData, onLeave }) {
  const [screen, setScreen] = useState("story"); 
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false); 
  const [selectedChoiceIdx, setSelectedChoiceIdx] = useState(null);

  const currentQuestion = useMemo(() => {
    // Предотвращаем падение кода, если индекс вышел за пределы массива на экране победы
    return levelData.questions[currentIndex] || null;
  }, [levelData, currentIndex]);

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

  /* 👑 ИСПРАВЛЕННАЯ ФУНКЦИЯ handleNext */
  function handleNext() {
    // Проверяем: если текущий вопрос был самым последним в списке
    if (currentIndex === levelData.questions.length - 1) {
      
      // Вызываем сохранение и разблокируем Главу 2 в Главном Меню!
      progressStorage.unlockLevel(2);
      
    }

    // Переключаемся дальше (на экран "Chapter Cleared!")
    setCurrentIndex((prev) => prev + 1); 
    setAnswered(false);
    setSelectedChoiceIdx(null); 
  }

  return (
    <div className="ch1-layout">
      {screen === "story" && (
        <div className="ch1-screen-wrapper">
          <button className="ch1-back-btn" onClick={onLeave}>🡨 Back to Map</button>
          <div className="ch1-card"> 
            <div className="ch1-top-bar"><span>Prologue</span><span>Status: Ready</span></div>
            <h1 className="ch1-story-title">{levelData.title}</h1>
            <p className="ch1-story-text">{levelData.story}</p>
            <button className="ch1-action-btn" onClick={startQuiz}>Begin Trial ➜</button>
          </div>
        </div>
      )}

      {screen === "quiz" && (
        <div className="ch1-screen-wrapper">
          <button className="ch1-back-btn" onClick={onLeave}>🡨 Abandon Mission</button>
          <div className="ch1-card">
            {currentIndex >= levelData.questions.length ? (
              <>
                <div className="ch1-top-bar">
                  <span>Victory</span>
                  <span>Score: {score} / {levelData.questions.length}</span>
                </div>
                <h1 style={{ color: "#0f172a", marginBottom: "20px", fontWeight: "800", textAlign: "center", fontSize: "28px" }}>Chapter Cleared!</h1>
                <div style={{ textAlign: "center", margin: "20px 0" }}>
                  <img src="/dancingduck.gif" alt="Duck" style={{ width: "180px" }} />
                </div>
                <button className="ch1-action-btn" onClick={onLeave}>Continue Journey ➜</button>
              </>
            ) : (
              <>
                <div className="ch1-top-bar">
                  <span>Question {currentIndex + 1} / {levelData.questions.length}</span>
                </div>
                {currentQuestion && (
                  <>
                    <h2 className="ch1-question-text">{currentQuestion.text}</h2>
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
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ChapterOne;