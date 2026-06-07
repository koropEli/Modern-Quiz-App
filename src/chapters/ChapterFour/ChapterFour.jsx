import React, { useState } from "react";
import "./chapterFour.css";

function ChapterFour({ levelData, onLeave }) {
  const [isStarted, setIsStarted] = useState(false); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  
  // Хранилища для имперского финала
  const [typedAnswer, setTypedAnswer] = useState(""); // Вводимый текст
  const [kingdomName, setKingdomName] = useState("Your Kingdom"); // Имя королевства
  const [reignStyle, setReignStyle] = useState(""); // "benevolent" (милосердный/сердце) или "absolute" (тоталитарный/трефы)

  const questions = levelData?.questions || [];
  const currentQuestion = questions[currentIndex];
  const introText = levelData?.story || levelData?.prologue;

  const isTextInputQuestion = currentQuestion?.type === "text" || !currentQuestion?.options || currentQuestion?.options.length === 0;

  function handleAnswerClick(answerIndex) {
    if (isAnswered) return;
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    setScore((prev) => prev + 1);

    // ПРОВЕРКА: Если это финальный вопрос про форму правления (например, указ о власти)
    // В зависимости от того, какой по счету это вопрос или какой у него ID (обычно финальный вопрос про тип режима)
    if (currentQuestion?.id === "regime" || currentIndex === questions.length - 1) {
      if (answerIndex === 0) {
        setReignStyle("benevolent"); // Путь Сердца (Доброжелательный)
      } else {
        setReignStyle("absolute"); // Путь Треф (Абсолютный/Жесткий)
      }
    }
  }

  function handleTextSubmit(e) {
    e.preventDefault();
    if (!typedAnswer.trim()) return;
    
    setKingdomName(typedAnswer.trim()); // Сохраняем имя королевства
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
      className="chapter-four-layout"
      style={{ backgroundImage: "url('/backgroundChapter4.jpg')" }}
    >
      {/* Скрываем кнопку дезертирства на финальном экране */}
      {currentIndex < questions.length && (
        <button className="ch4-back-btn" onClick={onLeave}>
          ← Abandon Crown
        </button>
      )}

      {/* ЭКРАН 1: ПРОЛОГ */}
      {!isStarted ? (
        <div className="ch4-prologue-card">
          <div className="ch4-prologue-header">
            <span className="ch4-tag-gold">IMPERIAL ASCENSION</span>
            <span className="ch4-tag-status">DYNASTY: READY</span>
          </div>
          
          <h1 className="ch4-prologue-title">
            {levelData?.title || "Chapter IV: The Imperial Crown"}
          </h1>
          
          <p className="ch4-prologue-description">
            {introText === "Dynamic Text" ? "The final trial has arrived. Take the ultimate seat of power, build your empire, and secure the Duck Throne for eternity." : introText}
          </p>
          
          <button className="ch4-begin-btn" onClick={() => setIsStarted(true)}>
            Claim the Throne ➜
          </button>
        </div>
      ) : (
        /* ЭКРАН 2: ИГРА ИЛИ ПРЕМИАЛЬНЫЙ ФИНАЛ */
        <div className="ch4-quiz-box-wrapper">
          {currentIndex >= questions.length ? (
            /* ================= ЗОЛОТАЯ ИМПЕРСКАЯ ВКЛАДКА ИТОГОВ ================= */
            <div className="ch4-custom-summary-card">
              <div className="ch4-summary-top-bar">
                <button className="ch4-summary-menu-btn" onClick={onLeave}>
                  Main Menu
                </button>
              </div>

              <div className="ch4-summary-content">
                <div className="ch4-summary-text-side">
                  <h2>Empire Established!</h2>
                  <p className="ch4-summary-status-desc">
                    The Kingdom of <span className="ch4-highlight-kingdom">"{kingdomName}"</span> stands eternal!
                  </p>
                  <p className="ch4-summary-style-desc">
                    By your imperial decree, you have chosen to build a <span className={`ch4-style-badge ${reignStyle === "benevolent" ? "ch4-style-kind" : "ch4-style-hard"}`}>{reignStyle || "sovereign"}</span> state. 
                    May your crown shine brightly, and we wish you absolute good luck in your future trials!
                  </p>
                  <p className="ch4-summary-score">Imperial Decrees Issued: {score} / {questions.length}</p>
                </div>

                <div className="ch4-summary-card-side">
                  {/* Вывод оставшихся карт из файла image_5a1883.png */}
                  {reignStyle === "benevolent" ? (
                    <div className="ch4-card-preview-box ch4-animation-fade-in">
                      <img src="/cardHeart.jpg" alt="Card Heart" className="ch4-result-duck-card" />
                      <span className="ch4-card-caption">Path of Benevolence</span>
                    </div>
                  ) : (
                    <div className="ch4-card-preview-box ch4-animation-fade-in">
                      <img src="/cardAceofClubs.jpg" alt="Card Ace of Clubs" className="ch4-result-duck-card" />
                      <span className="ch4-card-caption">Path of Absolute Power</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* ОБЫЧНЫЙ ИМПЕРСКИЙ КВИЗ */
            <div className="ch4-quiz-box">
              <div className="ch4-quiz-progress">
                Imperial Decree {currentIndex + 1} / {questions.length}
              </div>
              
              <h2 className="ch4-question-text">
                {currentQuestion?.text}
              </h2>

              {isTextInputQuestion ? (
                <form onSubmit={handleTextSubmit} className="ch4-text-form">
                  <input
                    type="text"
                    className="ch4-text-input"
                    placeholder={currentQuestion?.placeholder || "Enter kingdom name..."}
                    value={typedAnswer}
                    onChange={(e) => setTypedAnswer(e.target.value)}
                    disabled={isAnswered}
                    autoFocus
                  />
                  {!isAnswered && (
                    <button type="submit" className="ch4-submit-input-btn" disabled={!typedAnswer.trim()}>
                      Establish Kingdom
                    </button>
                  )}
                </form>
              ) : (
                <div className="ch4-answers-list">
                  {currentQuestion?.options?.map((option, idx) => {
                    let btnClass = "ch4-answer-btn";
                    if (isAnswered) {
                      if (idx === selectedAnswer) {
                        btnClass += " imperial-active";
                      } else {
                        btnClass += " imperial-disabled";
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
                <button className="ch4-next-btn" onClick={handleNext}>
                  Issue Next Decree ➜
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ChapterFour;