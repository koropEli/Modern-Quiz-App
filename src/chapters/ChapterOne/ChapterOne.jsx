import { useState, useMemo } from "react";
import "./ChapterOne.css";
import { progressStorage } from "../../progressStorage";

// Принимаем levelData (вопросы) и onLeave (команду вернуться в меню) от Режиссера (App)
function ChapterOne({ levelData, onLeave }) {
  // Внутри главы тоже есть экраны: "story" (пролог) и "quiz" (сама игра)
  const [screen, setScreen] = useState("story"); 
  // Номер вопроса, который сейчас на экране (0 - это первый вопрос)
  const [currentIndex, setCurrentIndex] = useState(0); 
  // Количество правильных ответов
  const [score, setScore] = useState(0);
  // Флаг: нажал ли игрок кнопку ответа (чтобы нельзя было кликать дважды)
  const [answered, setAnswered] = useState(false); 
  // Какую именно кнопку нажал игрок (чтобы покрасить ее в красный или зеленый)
  const [selectedChoiceIdx, setSelectedChoiceIdx] = useState(null);

  // Вытаскиваем нужный вопрос из массива на основе currentIndex
  const currentQuestion = useMemo(() => {
    return levelData.questions[currentIndex] || null;
  }, [levelData, currentIndex]);

  // Функция старта квиза (сбрасывает всё на ноль)
  function startQuiz() {
    setCurrentIndex(0);
    setScore(0);
    setAnswered(false);
    setSelectedChoiceIdx(null);
    setScreen("quiz"); // Убирает пролог, показывает вопросы
  }

  // Функция обработки клика по варианту ответа
  function handleQuizAnswer(index) {
    if (answered) return; // Если уже ответил — игнорируем клик
    
    setSelectedChoiceIdx(index); // Запоминаем, что именно он нажал
    
    // Проверяем, совпал ли индекс нажатия с correct из levelsData
    if (index === currentQuestion.correct) {
      setScore((s) => s + 1); // Если да — даем очко
    }
    setAnswered(true); // Замораживаем кнопки, показываем утку-реакцию
  }

  // Функция кнопки "Next" (к следующему вопросу)
  function handleNext() {
    // Если это был последний вопрос в списке
    if (currentIndex === levelData.questions.length - 1) {
      // 👑 ПОБЕДА! Сохраняем в память, что открыта 2 глава!
      progressStorage.unlockLevel(2);
    }

    // Независимо от того, последний вопрос или нет, двигаем индекс вперед
    // (Если вопрос последний, интерфейс ниже сам переключится на экран "Chapter Cleared!")
    setCurrentIndex((prev) => prev + 1); 
    setAnswered(false); // Размораживаем кнопки для нового вопроса
    setSelectedChoiceIdx(null); // Убираем подсветку
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
            
            {/* Если мы прошли все вопросы (индекс больше длины массива) -> показываем итоги */}
            {currentIndex >= levelData.questions.length ? (
              <>
                <div className="ch1-top-bar">
                  <span>Victory</span>
                  <span>Score: {score} / {levelData.questions.length}</span>
                </div>
                {/* ... верстка экрана победы ... */}
                <button className="ch1-action-btn" onClick={onLeave}>Continue Journey ➜</button>
              </>
            ) : (
              
              /* Если вопросы еще есть -> рисуем текущий вопрос */
              <>
                {/* ... заголовок и текст вопроса ... */}
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
                            // Классы для подсветки зеленым (correct) или красным (wrong)
                            className={`ch1-answer-btn ${answered && isCorrect ? "correct" : ""} ${isSelected && !isCorrect ? "wrong" : ""}`} 
                            disabled={answered} // Отключаем клики после первого ответа
                            onClick={() => handleQuizAnswer(idx)}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>

                    {/* Показываем гифку и кнопку NEXT только ПОСЛЕ ответа (когда answered === true) */}
                    {answered && (
                      <div className="ch1-duck-feedback">
                        {/* ... гифка утки ... */}
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