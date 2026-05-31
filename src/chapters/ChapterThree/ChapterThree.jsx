// import React, { useState } from "react";
// import "./chapterThree.css";

// function ChapterThree({ levelData, onLeave }) {
//   const [isStarted, setIsStarted] = useState(false); 
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [score, setScore] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [isAnswered, setIsAnswered] = useState(false);
//   const [typedAnswer, setTypedAnswer] = useState(""); // Для ввода текста (имени банды)

//   const questions = levelData?.questions || [];
//   const currentQuestion = questions[currentIndex];
//   const introText = levelData?.story || levelData?.prologue;

//   // Проверяем, текстовый ли это вопрос (например, имя банды) или обычный тест
//   const isTextInputQuestion = !currentQuestion?.options || currentQuestion?.options.length === 0;

//   function handleAnswerClick(answerIndex) {
//     if (isAnswered) return;
//     setSelectedAnswer(answerIndex);
//     setIsAnswered(true);

//     if (answerIndex === currentQuestion.correct) {
//       setScore((prev) => prev + 1);
//     }
//   }

//   function handleTextSubmit(e) {
//     e.preventDefault();
//     if (!typedAnswer.trim()) return;
    
//     setIsAnswered(true);
//     // Для текстовых вопросов автоматически засчитываем успех при заполнении
//     setScore((prev) => prev + 1); 
//   }

//   function handleNext() {
//     setSelectedAnswer(null);
//     setIsAnswered(false);
//     setTypedAnswer("");
//     setCurrentIndex((prev) => prev + 1);
//   }

//   return (
//     <div className="chapter-three-layout">
//     style={{ backgroundImage: "url('/backgroundChapter3.png')" }}
//       <button className="ch1-back-btn" onClick={onLeave}>
//         ← Abandon Mission
//       </button>

//       {/* ЭКРАН 1: ПРОЛОГ */}
//       {!isStarted ? (
//         <div className="ch3-prologue-card">
//           <div className="ch3-prologue-header">
//             <span className="prologue-tag">PROLOGUE</span>
//             <span className="status-tag">STATUS: READY</span>
//           </div>
          
//           <h1 className="ch3-prologue-title">
//             Chapter III: {levelData?.title || "The Corporate Ladder"}
//           </h1>
          
//           <p className="ch3-prologue-description">
//             {introText || "Ascend to the next hierarchy level and complete the corporate trials."}
//           </p>
          
//           <button className="ch3-begin-btn" onClick={() => setIsStarted(true)}>
//             Begin Trial ➜
//           </button>
//         </div>
//       ) : (
//         /* ЭКРАН 2: ИГРОВОЙ КВИЗ */
//         <div className="ch3-quiz-box">
//           {currentIndex >= questions.length ? (
//             <div className="ch3-result-screen">
//               <h3 style={{ color: "#38bdf8", fontSize: "26px", marginBottom: "15px", fontWeight: "700" }}>
//                 Trial Finished
//               </h3>
//               <p className="score-text" style={{ fontSize: "18px", color: "#fff", marginBottom: "10px" }}>
//                 Score: {score} / {questions.length}
//               </p>
//               <p className="status-text" style={{ color: "#94a3b8", marginBottom: "25px" }}>
//                 Status: Completed. Your path to power continues.
//               </p>
//               <button className="ch3-next-btn" onClick={onLeave}>
//                 Return to Map ➜
//               </button>
//             </div>
//           ) : (
//             <>
//               <div className="quiz-progress">
//                 Question {currentIndex + 1} / {questions.length}
//               </div>
              
//               <h2 className="ch3-question-text">
//                 {currentQuestion?.text}
//               </h2>

//               {/* Вариант А: Если нужно вписать текст ручками (Имя банды) */}
//               {isTextInputQuestion ? (
//                 <form onSubmit={handleTextSubmit} className="ch3-text-form">
//                   <input
//                     type="text"
//                     className="ch3-text-input"
//                     placeholder="Enter your gang name..."
//                     value={typedAnswer}
//                     onChange={(e) => setTypedAnswer(e.target.value)}
//                     disabled={isAnswered}
//                     autoFocus
//                   />
//                   {!isAnswered && (
//                     <button type="submit" className="ch3-submit-input-btn" disabled={!typedAnswer.trim()}>
//                       Confirm Name
//                     </button>
//                   )}
//                 </form>
//               ) : (
//                 /* Вариант Б: Обычные кнопки-варианты ответов */
//                 <div className="ch3-answers-list">
//                   {currentQuestion?.options?.map((option, idx) => {
//                     let btnClass = "ch3-answer-btn";
//                     if (isAnswered) {
//                       if (idx === currentQuestion.correct) {
//                         btnClass += " correct";
//                       } else if (idx === selectedAnswer) {
//                         btnClass += " wrong";
//                       } else {
//                         btnClass += " disabled";
//                       }
//                     }

//                     return (
//                       <button
//                         key={idx}
//                         className={btnClass}
//                         disabled={isAnswered}
//                         onClick={() => handleAnswerClick(idx)}
//                       >
//                         {option}
//                       </button>
//                     );
//                   })}
//                 </div>
//               )}

//               {isAnswered && (
//                 <button className="ch3-next-btn" onClick={handleNext}>
//                   Next Question ➜
//                 </button>
//               )}
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ChapterThree;