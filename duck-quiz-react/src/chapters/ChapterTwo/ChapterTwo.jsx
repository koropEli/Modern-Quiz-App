import React, { useState } from "react";
import "./chapterTwo.css";

function ChapterTwo({ levelData, onLeave }) {
  // Состояние: запущен ли сам игровой процесс квиза (false — видим пролог)
  const [isStarted, setIsStarted] = useState(false); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Безопасное извлечение вопросов через оператор опциональной цепочки
  const questions = levelData?.questions || [];
  const currentQuestion = questions[currentIndex];
  // Поддержка полей названия пролога из разных версий бэкенда данных
  const introText = levelData?.story || levelData?.prologue;

  // Клик по карте/ответу в казино
  function handleAnswerClick(answerIndex) {
    if (isAnswered) return;
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);

    // Если индекс совпал с правильным — увеличиваем счет побед над дилером
    if (answerIndex === currentQuestion.correct) {
      setScore((prev) => prev + 1);
    }
  }

  // Сброс стейтов выбора для перехода на следующую раздачу карт
  function handleNext() {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCurrentIndex((prev) => prev + 1);
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
                  // Стилизация кнопок ответов в зависимости от статуса проверки
                  if (isAnswered) {
                    if (idx === currentQuestion.correct) {
                      btnClass += " correct"; // Подсвечиваем зелёным верную карту
                    } else if (idx === selectedAnswer) {
                      btnClass += " wrong";   // Подсвечиваем красным ошибку игрока
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