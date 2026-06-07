import React, { useState } from "react";
import "./chapterFour.css";

function ChapterFour({ levelData, onLeave }) {
  const [isStarted, setIsStarted] = useState(false); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [typedAnswer, setTypedAnswer] = useState(""); 

  const questions = levelData?.questions || [];
  const currentQuestion = questions[currentIndex];
  const introText = levelData?.story || levelData?.prologue;

  // Проверяем, текстовый ли это вопрос (например, имя Королевства)
  const isTextInputQuestion = currentQuestion?.type === "text" || !currentQuestion?.options || currentQuestion?.options.length === 0;

  // Выбор имперского решения
  function handleAnswerClick(answerIndex) {
    if (isAnswered) return;
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);

    // Любое государственное решение продвигает нас по сюжету
    setScore((prev) => prev + 1);
  }

  // Утверждение названия государства
  function handleTextSubmit(e) {
    e.preventDefault();
    if (!typedAnswer.trim()) return;
    
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
      {/* Кнопка отступить */}
      <button className="ch4-back-btn" onClick={onLeave}>
        ← Abandon Crown
      </button>

      {/* ЭКРАН 1: ПРОЛОГ (КОРОНАЦИЯ) */}
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
        /* ЭКРАН 2: ИМПЕРСКИЕ РЕШЕНИЯ */
        <div className="ch4-quiz-box">
          {currentIndex >= questions.length ? (
            <div className="ch4-result-screen">
              <h3 className="ch4-victory-title">
                Empire Established
              </h3>
              <p className="ch4-score-text">
                Decrees Signed: {score} / {questions.length}
              </p>
              <p className="ch4-status-text">
                Status: Sovereign. Your empire stands unbreakable. The Chronicles of Ascension are complete!
              </p>
              <button className="ch4-finish-btn" onClick={onLeave}>
                Complete Chronicle 👑
              </button>
            </div>
          ) : (
            <>
              <div className="ch4-quiz-progress">
                Imperial Decree {currentIndex + 1} / {questions.length}
              </div>
              
              <h2 className="ch4-question-text">
                {currentQuestion?.text}
              </h2>

              {/* Вариант А: Текстовый ввод (Имя Королевства) */}
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
                /* Вариант Б: Выбор из указов */
                <div className="ch4-answers-list">
                  {currentQuestion?.options?.map((option, idx) => {
                    let btnClass = "ch4-answer-btn";
                    if (isAnswered) {
                      if (idx === selectedAnswer) {
                        btnClass += " imperial-active"; // Подсвечиваем золотом выбранный указ
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
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ChapterFour;