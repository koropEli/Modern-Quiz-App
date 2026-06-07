import React, { useState } from "react";
import "./chapterThree.css";

function ChapterThree({ levelData, onLeave }) {
  const [isStarted, setIsStarted] = useState(false); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [typedAnswer, setTypedAnswer] = useState(""); 

  const questions = levelData?.questions || [];
  const currentQuestion = questions[currentIndex];
  const introText = levelData?.story || levelData?.prologue;

  // Текстовый вопрос — если тип равен "text" или нет вариантов ответа
  const isTextInputQuestion = currentQuestion?.type === "text" || !currentQuestion?.options || currentQuestion?.options.length === 0;

  // Обработка обычного клика по ролевому выбору
  function handleAnswerClick(answerIndex) {
    if (isAnswered) return;
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);

    // ПОПРАВКА: так как в Главе 3 нет жесткого "correct", мы засчитываем любой выбор как успешное решение
    setScore((prev) => prev + 1);
  }

  // Обработка ввода имени банды
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
    // ИСПРАВЛЕНО: Стили теперь внутри тега div, как положено!
    <div 
      className="chapter-three-layout"
      style={{ backgroundImage: "url('/backgroundChapter3.jpg')" }} 
    >
      <button className="ch1-back-btn" onClick={onLeave}>
        ← Abandon Mission
      </button>

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
        /* ЭКРАН 2: ИГРОВОЙ КВИЗ */
        <div className="ch3-quiz-box">
          {currentIndex >= questions.length ? (
            <div className="ch3-result-screen">
              <h3 style={{ color: "#38bdf8", fontSize: "26px", marginBottom: "15px", fontWeight: "700" }}>
                Trial Finished
              </h3>
              <p className="score-text" style={{ fontSize: "18px", color: "#fff", marginBottom: "10px" }}>
                Decisions Made: {score} / {questions.length}
              </p>
              <p className="status-text" style={{ color: "#94a3b8", marginBottom: "25px" }}>
                Status: Completed. Your path to power continues.
              </p>
              <button className="ch3-next-btn" onClick={onLeave}>
                Return to Map ➜
              </button>
            </div>
          ) : (
            <>
              <div className="quiz-progress">
                Decision {currentIndex + 1} / {questions.length}
              </div>
              
              <h2 className="ch3-question-text">
                {currentQuestion?.text}
              </h2>

              {/* Вариант А: Поле ввода текста */}
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
                /* Вариант Б: Кнопки выбора */
                <div className="ch3-answers-list">
                  {currentQuestion?.options?.map((option, idx) => {
                    let btnClass = "ch3-answer-btn";
                    if (isAnswered) {
                      if (idx === selectedAnswer) {
                        btnClass += " correct"; // Подсвечиваем выбор игрока зеленым/активным
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
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ChapterThree;