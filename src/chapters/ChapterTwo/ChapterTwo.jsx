import React, { useState } from "react";
import "./chapterTwo.css";
import { progressStorage } from "../../progressStorage";

function ChapterTwo({ levelData, onLeave }) {
  // Состояние: запущен ли сам игровой процесс квиза (false — видим пролог)
  const [isStarted, setIsStarted] = useState(false); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Достаём вопросы из данных главы. Если данных нет, используем пустой массив
  const questions = levelData?.questions || [];
  const currentQuestion = questions[currentIndex];
  const introText = levelData?.story || levelData?.prologue;

  function handleAnswerClick(answerIndex) {
    if (isAnswered) return;
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);// зеелный для правильного ответа, красный для неправильного, остальные приглушаются

    if (answerIndex === currentQuestion.correct) {
      setScore((prev) => prev + 1);
    }
    
    if (currentIndex === questions.length - 1) {
      progressStorage.unlockLevel(3);
    }
  }

  function handleNext() {
  setSelectedAnswer(null); // Забываем прошлый выбор (убираем подсветку кнопок)
  setIsAnswered(false); // Снимаем заморозку экрана (кнопки снова можно нажимать)
  setCurrentIndex((prev) => prev + 1); // Переключаем номер вопроса на следующий (+1)
  }

  return (
    <div 
      className="chapter-two-layout" 
      style={{ backgroundImage: "url('/backgroundChapter2.png')" }} // Индивидуальный фон казино
    >
      <button className="ch1-back-btn" onClick={onLeave}>
        ← Abandon Mission
      </button>

      {/* ЭКРАН 1: ОФИЦИАЛЬНЫЙ ПРОЛОГ (Показывается ДО старта квиза) */}
      {!isStarted ? (
        <div className="casino-prologue-card">
          <div className="casino-prologue-header">
            <span className="prologue-tag">PROLOGUE</span>
            <span className="status-tag">STATUS: READY</span>
          </div>
          <h1 className="casino-prologue-title">Chapter II: Casino Royale</h1>
          <p className="casino-prologue-description">
            {introText || "Play cards perfectly in the underground casino to win your initial capital."}
          </p>
          <button className="casino-begin-btn" onClick={() => setIsStarted(true)}>
            Begin Trial ➜
          </button>
        </div>
      ) : (


        /* ЭКРАН 2: САМ КВИЗ С ВОПРОСАМИ (Показывается ПОСЛЕ нажатия кнопки) */
        <div className="casino-quiz-box">
          {/* ФИНАЛЬНЫЙ ЭКРАН ПОДВЕДЕНИЯ ИТОГОВ РАУНДА В КАЗИНО */}
          {currentIndex >= questions.length ? (
            <div className="casino-result-screen">
              <h3 style={{ color: "#f59e0b", fontSize: "26px", marginBottom: "15px", fontWeight: "700" }}>
                Trial Finished
              </h3>
              <p className="score-text" style={{ fontSize: "18px", color: "#fff", marginBottom: "10px" }}>
                Score: {score} / {questions.length}
              </p>
              <p className="status-text" style={{ color: "#94a3b8", marginBottom: "25px" }}>
                {score === questions.length 
                  ? "Status: Success. The initial capital is yours!" 
                  : "Status: Finished. The mafia acknowledges your attempt."}
              </p>
              <button className="casino-next-btn" onClick={onLeave}>
                Return to Map ➜
              </button>
            </div>
          ) : (



            /* ЭКРАН ОТОБРАЖЕНИЯ АКТИВНОГО КАРТОЧНОГО ВОПРОСА */
            <>
              <div className="quiz-progress">
                Question {currentIndex + 1} / {questions.length}
              </div>
              <h2 className="casino-question-text">{currentQuestion?.text}</h2>

              <div className="casino-answers-list">
                {currentQuestion?.options.map((option, idx) => {
                  let btnClass = "casino-answer-btn";
                  if (isAnswered) {
                    if (idx === currentQuestion.correct) {
                      btnClass += " correct"; 
                    } else if (idx === selectedAnswer) {
                      btnClass += " wrong"; 
                    } else {
                      btnClass += " disabled"; // Приглушаем прозрачность остальных кнопок
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

              {/* Кнопка перехода к следующему дилингу */}
              {isAnswered && (
                <button className="casino-next-btn" onClick={handleNext}>
                  Next Question ➜
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ChapterTwo;