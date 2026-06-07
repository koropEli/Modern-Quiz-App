import React, { useState } from "react";
import "./chapterThree.css";

function ChapterThree({ levelData, onLeave }) {
  const [isStarted, setIsStarted] = useState(false); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  
  // Хранилища для финала
  const [typedAnswer, setTypedAnswer] = useState(""); // Вводимый текст
  const [gangName, setGangName] = useState("Your Gang"); // Имя банды
  const [mercyStyle, setMercyStyle] = useState(""); // "merciful" или "ruthless"

  const questions = levelData?.questions || [];
  const currentQuestion = questions[currentIndex];
  const introText = levelData?.story || levelData?.prologue;

  const isTextInputQuestion = currentQuestion?.type === "text" || !currentQuestion?.options || currentQuestion?.options.length === 0;

  function handleAnswerClick(answerIndex) {
    if (isAnswered) return;
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    setScore((prev) => prev + 1);

    // Логика определения стиля правления по ID вопроса из вашего levelsData
    if (currentQuestion?.id === "mercy") {
      if (answerIndex === 0) {
        setMercyStyle("merciful");
      } else {
        setMercyStyle("ruthless");
      }
    }
  }

  function handleTextSubmit(e) {
    e.preventDefault();
    if (!typedAnswer.trim()) return;
    
    setGangName(typedAnswer.trim());
    setIsAnswered(true);
    setScore((prev) => prev + 1); 
  }

  function handleNext() {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setTypedAnswer("");
    setCurrentIndex((prev) => prev + 1);
  }

  return (
    <div 
      className="chapter-three-layout"
      style={{ backgroundImage: "url('/backgroundChapter3.png')" }} 
    >
      {/* Кнопка "Abandon" видна только во время пролога или квиза */}
      {currentIndex < questions.length && (
        <button className="ch3-back-btn" onClick={onLeave}>
          ← Abandon Mission
        </button>
      )}

      {/* ЭКРАН 1: ПРОЛОГ */}
      {!isStarted ? (
        <div className="ch3-prologue-card">
          <div className="ch3-prologue-header">
            <span className="prologue-tag">PROLOGUE</span>
            <span className="status-tag">STATUS: READY</span>
          </div>
          <h1 className="ch3-prologue-title">
            Chapter III: {levelData?.title || "The Shadow Don"}
          </h1>
          <p className="ch3-prologue-description">
            {introText || "Command your syndicate, deal with rival gangs, and earn absolute loyalty."}
          </p>
          <button className="ch3-begin-btn" onClick={() => setIsStarted(true)}>
            Begin Trial ➜
          </button>
        </div>
      ) : (
        /* ЭКРАН 2: ИГРА ИЛИ ФИНАЛЬНАЯ КАРТОЧКА */
        <>
          {currentIndex >= questions.length ? (
            /* ФИНАЛЬНАЯ КАРТОЧКА УСПЕХА */
            <div className="ch3-custom-summary-card">
              <div className="summary-top-bar">
                <button className="summary-menu-btn" onClick={onLeave}>
                  Main Menu
                </button>
              </div>

              <div className="summary-content">
                <div className="summary-text-side">
                  <h2>Mission Accomplished!</h2>
                  <p className="summary-status-desc">
                    The <span className="highlight-gang">"{gangName}"</span> syndicate is growing!
                  </p>
                  <p className="summary-style-desc">
                    Throughout the turf wars, you have established a <span className={`style-badge ${mercyStyle === "merciful" ? "style-kind" : "style-hard"}`}>{mercyStyle || "unique"}</span> regime of power.
                  </p>
                  <p className="summary-score">Decisions Made: {score} / {questions.length}</p>
                </div>

                <div className="summary-card-side">
                  {mercyStyle === "merciful" ? (
                    <div className="card-preview-box animation-fade-in">
                      <img src="/cardDiamond.jpg" alt="Card Diamond" className="result-duck-card" />
                      <span className="card-caption">Path of Mercy</span>
                    </div>
                  ) : (
                    <div className="card-preview-box animation-fade-in">
                      <img src="/cardAceofSpades.jpg" alt="Card Ace of Spades" className="result-duck-card" />
                      <span className="card-caption">Path of Ruthlessness</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* САМ ИГРОВОЙ КВИЗ */
            <div className="ch3-quiz-box">
              <div className="quiz-progress">
                Decision {currentIndex + 1} / {questions.length}
              </div>
              
              <h2 className="ch3-question-text">
                {currentQuestion?.text}
              </h2>

              {isTextInputQuestion ? (
                <form onSubmit={handleTextSubmit} className="ch3-text-form">
                  <input
                    type="text"
                    className="ch3-text-input"
                    placeholder={currentQuestion?.placeholder || "Enter text..."}
                    value={typedAnswer}
                    onChange={(e) => setTypedAnswer(e.target.value)}
                    disabled={isAnswered}
                    autoFocus
                  />
                  {!isAnswered && (
                    <button type="submit" className="ch3-submit-input-btn" disabled={!typedAnswer.trim()}>
                      Confirm Name
                    </button>
                  )}
                </form>
              ) : (
                <div className="ch3-answers-list">
                  {currentQuestion?.options?.map((option, idx) => {
                    let btnClass = "ch3-answer-btn";
                    if (isAnswered) {
                      if (idx === selectedAnswer) {
                        btnClass += " correct";
                      } else {
                        btnClass += " disabled";
                      }
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
              )}

              {isAnswered && (
                <button className="ch3-next-btn" onClick={handleNext}>
                  Next Decision ➜
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ChapterThree;