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
    setAnswered(true); // Блокируем кнопки после ответа
  }


  function handleNext() {
    if (currentIndex === levelData.questions.length - 1) {
      progressStorage.unlockLevel(2);
    }

    setCurrentIndex((prev) => prev + 1); 
    setAnswered(false);
    setSelectedChoiceIdx(null); 
  }

  return (
    <div className="ch1-layout">
      {/* 1. Если экран "story" — показываем пролог с текстом */}
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

      {/* 2. Если экран "quiz" — показываем саму игру */}
      {screen === "quiz" && (
        <div className="ch1-screen-wrapper">
          <button className="ch1-back-btn" onClick={onLeave}>🡨 Abandon Mission</button>
          <div className="ch1-card">
            
            {/* Если мы прошли все вопросы -> показываем итоги */}
            {currentIndex >= levelData.questions.length ? (
              <>
                <div className="ch1-top-bar">
                  <span>Victory</span>
                  <span>Score: {score} / {levelData.questions.length}</span>
                </div>
                <h2 className="ch1-question-text">Objective Complete. Awaiting further instruction</h2>
                <button className="ch1-action-btn" onClick={onLeave}>Continue Journey ➜</button>
              </>
            ) : (
              
              /* Если вопросы еще есть -> рисуем текущий вопрос */
              <>
                <div className="ch1-top-bar">
                  <span>Question {currentIndex + 1} of {levelData.questions.length}</span>
                  <span>Score: {score}</span>
                </div>
                {currentQuestion && (
                  <>
                    <h2 className="ch1-question-text">{currentQuestion.text}</h2>
                    <div className="ch1-answers-grid">
                      {/* Берем варианты ответа и рисуем кнопку для каждого */}
                      {currentQuestion.options.map((option, idx) => {
                        const isCorrect = idx === currentQuestion.correct; 
                        const isSelected = selectedChoiceIdx === idx;
                        
                        return (
                          <button 
                            key={idx} 
                            // зеленым (correct) или красным (wrong)
                            className={`ch1-answer-btn ${answered && isCorrect ? "correct" : ""} ${isSelected && !isCorrect ? "wrong" : ""}`} 
                            disabled={answered} // Отключаем клики после первого ответа
                            onClick={() => handleQuizAnswer(idx)}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>

                    {answered && (
                      <div className="ch1-duck-feedback">
                        {selectedChoiceIdx === currentQuestion.correct ? (
                          <>
                            <img src="/dancingduck.gif" alt="Correct Duck" className="ch1-duck-gif" />
                            <span className="ch1-correct-txt">Correct! Great job!</span>
                          </>
                        ) : (
                          <>
                            <img src="/feedbackduck.gif" alt="Wrong Duck" className="ch1-duck-gif" />
                            <span className="ch1-wrong-txt">Oops! That's incorrect.</span>
                          </>
                        )}
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