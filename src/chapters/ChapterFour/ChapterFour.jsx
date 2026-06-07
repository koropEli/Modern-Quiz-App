// Импортируем сам React и хук useState для управления внутренним состоянием компонента
import React, { useState } from "react";
// Подключаем наш обновленный светлый файл стилей для этой главы
import "./chapterFour.css";
import { progressStorage } from "../../progressStorage";

// Объявляем основной компонент четвертой главы, принимающий данные уровня и функцию выхода в меню
function ChapterFour({ levelData, onLeave }) {
  // Переключатель: false — показываем пролог, true — запускаем сам квиз/финал
  const [isStarted, setIsStarted] = useState(false); 
  // Индекс текущего вопроса в массиве (начинается с 0, то есть с первого вопроса)
  const [currentIndex, setCurrentIndex] = useState(0);
  // Счетчик набранных очков (кликов/ответов игрока)
  const [score, setScore] = useState(0);
  // Хранит индекс выбранного пользователем ответа (null, если еще ничего не нажато)
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // Флаг: ответил ли уже игрок на текущий вопрос (true блокирует повторные клики)
  const [isAnswered, setIsAnswered] = useState(false);
  
  // Временное хранилище для текста, который игрок вводит руками в инпут
  const [typedAnswer, setTypedAnswer] = useState(""); 
  // Имя королевства (по умолчанию "Your Kingdom", перезаписывается вводом игрока)
  const [kingdomName, setKingdomName] = useState("Your Kingdom"); 
  // Стиль правления: "benevolent" (милосердный/Сердце) или "absolute" (жесткий/Трефы)
  const [reignStyle, setReignStyle] = useState(""); 

  // Вытаскиваем массив вопросов из переданного объекта levelData (если его нет, берем пустой массив)
  const questions = levelData?.questions || [];
  // Определяем объект текущего вопроса по его индексу в массиве
  const currentQuestion = questions[currentIndex];
  // Забираем текст пролога/истории из данных уровня
  const introText = levelData?.story || levelData?.prologue;

  // Проверка: является ли текущий вопрос текстовым (если тип "text" или у него вообще нет вариантов ответов)
  const isTextInputQuestion = currentQuestion?.type === "text" || !currentQuestion?.options || currentQuestion?.options.length === 0;

  // Функция, которая срабатывает при клике на вариант ответа в обычном вопросе
  function handleAnswerClick(answerIndex) {
    // Если на вопрос уже ответили — игнорируем повторные клики
    if (isAnswered) return;
    // Запоминаем, на какую кнопку нажал игрок
    setSelectedAnswer(answerIndex);
    // Ставим флаг, что ответ принят (чтобы подсветить кнопку и показать кнопку "Далее")
    setIsAnswered(true);
    // Увеличиваем общий счетчик очков
    setScore((prev) => prev + 1);

    // Логика финала: проверяем, является ли вопрос финальным (по ID "regime" или просто если он последний)
    if (currentQuestion?.id === "regime" || currentIndex === questions.length - 1) {
      // Если выбран первый вариант (индекс 0) — это путь Доброты (Сердце)
      if (answerIndex === 0) {
        setReignStyle("benevolent"); 
      } else {
        // Иначе — это путь Абсолютной Власти (Трефы)
        setReignStyle("absolute"); 
      }
    }
  }

  // Функция, обрабатывающая отправку формы с вводом имени королевства
  function handleTextSubmit(e) {
    // Отменяем стандартную перезагрузку страницы при отправке формы
    e.preventDefault();
    // Если игрок ничего не ввел или нажал кучу пробелов — ничего не делаем
    if (!typedAnswer.trim()) return;
    
    // Сохраняем очищенный от лишних пробелов текст как официальное имя королевства
    setKingdomName(typedAnswer.trim()); 
    // Фиксируем, что на текстовый вопрос получен ответ
    setIsAnswered(true);
    // Прибавляем балл в прогресс
    setScore((prev) => prev + 1); 
  }

  // Функция перехода к следующему вопросу/шагу квиза
  function handleNext() {
    // Сбрасываем выбранный ответ для нового вопроса
    setSelectedAnswer(null);
    // Сбрасываем флаг ответа в false, чтобы кнопки снова стали активными
    setIsAnswered(false);
    // Очищаем текстовое поле ввода для будущих инпутов
    setTypedAnswer("");
    // Переключаем индекс на следующий элемент массива вопросов
    setCurrentIndex((prev) => prev + 1);
  }

  return (
    // Главный контейнер экрана, динамически подгружающий картинку бэкграунда из папки public
    <div 
      className="chapter-four-layout"
      style={{ backgroundImage: "url('/backgroundChapter4.jpg')" }}
    >
      {/* Кнопка "Abandon Crown" рендерится только пока мы не дошли до финального экрана итогов */}
      {currentIndex < questions.length && (
        <button className="ch4-back-btn" onClick={onLeave}>
          ← Abandon Crown
        </button>
      )}

      {/* ЭКРАН 1: ПРОЛОГ. Показывается только если isStarted равен false */}
      {!isStarted ? (
        <div className="ch4-prologue-card">
          {/* Верхняя декоративная плашка пролога */}
          <div className="ch4-prologue-header">
            <span className="ch4-tag-gold">IMPERIAL ASCENSION</span>
            <span className="ch4-tag-status">DYNASTY: READY</span>
          </div>
          
          {/* Главный заголовок четвертой главы */}
          <h1 className="ch4-prologue-title">
            {levelData?.title || "Chapter IV: The Imperial Crown"}
          </h1>
          
          {/* Текст описания. Если в JSON пришел "Dynamic Text", заменяем его красивой заготовкой */}
          <p className="ch4-prologue-description">
            {introText === "Dynamic Text" ? "The final trial has arrived. Take the ultimate seat of power, build your empire, and secure the Duck Throne for eternity." : introText}
          </p>
          
          {/* Кнопка старта. Переключает стейт и мгновенно убирает пролог, запуская квиз */}
          <button className="ch4-begin-btn" onClick={() => setIsStarted(true)}>
            Claim the Throne ➜
          </button>
        </div>
      ) : (
        /* ЭКРАН 2: ИГРОВАЯ ЗОНА (Включается после клика по кнопке выше) */
        <div className="ch4-quiz-box-wrapper">
          {/* ЕСЛИ ИНДЕКС ВОПРОСА ВЫШЕЛ ЗА ПРЕДЕЛЫ МАССИВА — ИГРОК ВСЕ ПРОШЕЛ, ПОКАЗЫВАЕМ ФИНАЛ */}
          {currentIndex >= questions.length ? (
            /* ================= СВЕТЛАЯ ИМПЕРСКАЯ КАРТОЧКА ИТОГОВ ================= */
            <div className="ch4-custom-summary-card">
              {/* Верхняя навигационная панель карточки итогов */}
              <div className="ch4-summary-top-bar">
                <button className="ch4-summary-menu-btn" onClick={onLeave}>
                  Main Menu
                </button>
              </div>

              {/* Тело финального экрана, разделенное на две половины */}
              <div className="ch4-summary-content">
                {/* Левая сторона: Текстовые поздравления с интеграцией выборов */}
                <div className="ch4-summary-text-side">
                  <h2>Empire Established!</h2>
                  {/* Выводим имя королевства, которое игрок ввел на 1 шаге */}
                  <p className="ch4-summary-status-desc">
                    The Kingdom of <span className="ch4-highlight-kingdom">"{kingdomName}"</span> stands eternal!
                  </p>
                  {/* Выводим стиль правления и вешаем на него нужный класс ("kind" или "hard") для подсветки */}
                  <p className="ch4-summary-style-desc">
                    By your imperial decree, you have chosen to build a <span className={`ch4-style-badge ${reignStyle === "benevolent" ? "ch4-style-kind" : "ch4-style-hard"}`}>{reignStyle || "sovereign"}</span> state. 
                    May your crown shine brightly, and we wish you absolute good luck in your future trials!
                  </p>
                  {/* Итоговый счет */}
                  <p className="ch4-summary-score">Imperial Decrees Issued: {score} / {questions.length}</p>
                </div>

                {/* Правая сторона: Демонстрация премиальной карточки утки */}
                <div className="ch4-summary-card-side">
                  {/* Если reignStyle равен "benevolent", показываем утку с Сердцем */}
                  {reignStyle === "benevolent" ? (
                    <div className="ch4-card-preview-box ch4-animation-fade-in">
                      <img src="/cardHeart.jpg" alt="Card Heart" className="ch4-result-duck-card" />
                      <span className="ch4-card-caption">Path of Benevolence</span>
                    </div>
                  ) : (
                    /* Во всех остальных случаях (путь силы) — выводим утку с Трефами */
                    <div className="ch4-card-preview-box ch4-animation-fade-in">
                      <img src="/cardAceofClubs.jpg" alt="Card Ace of Clubs" className="ch4-result-duck-card" />
                      <span className="ch4-card-caption">Path of Absolute Power</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* ОБЫЧНЫЙ РЕЖИМ ВОПРОСОВ (Пока currentIndex < длины массива) */
            <div className="ch4-quiz-box">
              {/* Счетчик текущего шага */}
              <div className="ch4-quiz-progress">
                Imperial Decree {currentIndex + 1} / {questions.length}
              </div>
              
              {/* Текст текущего вопроса */}
              <h2 className="ch4-question-text">
                {currentQuestion?.text}
              </h2>

              {/* Если вопрос текстовый (ввод имени королевства) — рендерим текстовую форму */}
              {isTextInputQuestion ? (
                <form onSubmit={handleTextSubmit} className="ch4-text-form">
                  <input
                    type="text"
                    className="ch4-text-input"
                    placeholder={currentQuestion?.placeholder || "Enter kingdom name..."}
                    value={typedAnswer}
                    onChange={(e) => setTypedAnswer(e.target.value)} // Синхронизируем ввод с переменной typedAnswer
                    disabled={isAnswered} // Замораживаем инпут, если кнопка отправки уже нажата
                    autoFocus // Автоматически ставит курсор в поле при появлении вопроса
                  />
                  {/* Кнопка отправки формы видна только до фиксации ответа */}
                  {!isAnswered && (
                    <button type="submit" className="ch4-submit-input-btn" disabled={!typedAnswer.trim()}>
                      Establish Kingdom
                    </button>
                  )}
                </form>
              ) : (
                /* Если вопрос обычный (с кнопками) — перебираем массив опций через .map() */
                <div className="ch4-answers-list">
                  {currentQuestion?.options?.map((option, idx) => {
                    // Базовый класс для кнопок-ответов
                    let btnClass = "ch4-answer-btn";
                    // Если игрок уже нажал на одну из кнопок:
                    if (isAnswered) {
                      if (idx === selectedAnswer) {
                        btnClass += " imperial-active"; // Активной (выбранной) кнопке добавляем стиль золотого свечения
                      } else {
                        btnClass += " imperial-disabled"; // Остальные кнопки тушим через opacity
                      }
                    }

                    return (
                      <button
                        key={idx}
                        className={btnClass}
                        disabled={isAnswered} // Отключаем кликабельность после выбора ответа
                        onClick={() => handleAnswerClick(idx)} // По клику вызываем функцию проверки
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Кнопка "Следующий указ" всплывает только тогда, когда текущий выбор зафиксирован (isAnswered === true) */}
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

// Экспортируем компонент наружу, чтобы его можно было импортировать в файле App.jsx
export default ChapterFour;