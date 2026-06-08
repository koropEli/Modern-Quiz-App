import React, { useState, useMemo } from "react";
import "./chapterTwo.css";
import { progressStorage } from "../../progressStorage";

function ChapterTwo({ levelData, onLeave }) {
  const [screen, setScreen] = useState("story");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const currentQuestion = useMemo(() => {
    return levelData?.questions[currentIndex] || null;
  }, [levelData, currentIndex]);

  const questions = levelData?.questions || [];

  function handleAnswerClick(answerIndex) {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);

    if (answerIndex === currentQuestion.correct) {
      setScore((prev) => prev + 1);
    }
  }

  function handleNext() {
    if (currentIndex === questions.length - 1) {
      progressStorage.unlockLevel(3);
    }

    setCurrentIndex((prev) => prev + 1);
    setIsAnswered(false);
    setSelectedAnswer(null);
  }

  return (
    <div className="chapter-two-layout" style={{ backgroundImage: "url('/backgroundChapter2.png')" }}>
      
      {/* КНОПКА ВСЕГДА В ОДНОМ МЕСТЕ */}
      <button className="ch1-back-btn" onClick={onLeave}>← Abandon Mission</button>

      {/* ЭКРАН ПРОЛОГА */}
      {screen === "story" && (
        <div className="casino-prologue-card">
          <div className="casino-prologue-header">
            <span className="prologue-tag">PROLOGUE</span>
            <span className="status-tag">STATUS: READY</span>
          </div>
          <h1 className="casino-prologue-title">Chapter II: Casino Royale</h1>
          <p className="casino-prologue-description">{levelData?.story}</p>
          <button className="casino-begin-btn" onClick={() => setScreen("quiz")}>
            Begin Trial ➜
          </button>
        </div>
      )}

      {/* ЭКРАН КВИЗА */}
      {screen === "quiz" && (
        <div className="casino-quiz-box">
          {currentIndex >= questions.length ? (
            /* ЭКРАН ИТОГОВ */
            <div className="casino-result-screen">
              <h3 style={{ color: "#f59e0b", fontSize: "26px", marginBottom: "15px", fontWeight: "700" }}>
                Card Battle Finished
              </h3>
              <p className="score-text" style={{ fontSize: "18px", color: "#fff", marginBottom: "10px" }}>
                Score: {score} / {questions.length}
              </p>
              <p className="status-text" style={{ color: "#94a3b8", marginBottom: "25px" }}>
                {score === questions.length ? "Status: Success. The initial capital is yours!" : "The cards have been dealt, and the final tally is in."} 
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <button className="casino-next-btn" onClick={onLeave}>Return to Map ➜</button>
              </div>
            </div>
          ) : (
            /* ВОПРОСЫ */
            <>
              <div className="quiz-progress">Question {currentIndex + 1} / {questions.length}</div>
              <h2 className="casino-question-text">{currentQuestion?.text}</h2>

              <div className="casino-answers-list">
                {currentQuestion?.options.map((option, idx) => {
                  let btnClass = "casino-answer-btn";
                  if (isAnswered) {
                    if (idx === currentQuestion.correct) btnClass += " correct";
                    else if (idx === selectedAnswer) btnClass += " wrong";
                    else btnClass += " disabled";
                  }

                  return (
                    <button
                      key={idx}
                      className={btnClass}
                      disabled={isAnswered}
                      onClick={() => handleAnswerClick(idx)}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '20px' }}>
                  <button className="casino-next-btn" onClick={handleNext}>Next Question ➜</button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ChapterTwo;