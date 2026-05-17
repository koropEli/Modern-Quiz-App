import { useState } from "react";
import "./App.css";


const quizData = [
  {
    text: "Which ocean is the largest?",
    options: ["Atlantic", "Indian", "Pacific", "Arctic"],
    correct: 2,
  },
  {
    text: "Where do wild ducks NOT live?",
    options: ["Africa", "Antarctica", "Australia", "Europe"],
    correct: 1,
  },
  {
    text: "Which human organ never rests?",
    options: ["Brain", "Lungs", "Stomach", "Heart"],
    correct: 3,
  },
  {
    text: "Which metal is liquid at room temperature?",
    options: ["Mercury", "Gold", "Iron", "Zinc"],
    correct: 0,
  },
  {
    text: "What did Cinderella lose at the ball?",
    options: ["Ring", "Slipper", "Necklace", "Glove"],
    correct: 1,
  },
  {
    text: "Is a duck a bird?",
    options: ["Yes", "No"],
    correct: 0,
  },
];


function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  // the selected answer index.
  const [selected, setSelected] = useState(null);
  const [showDuck, setShowDuck] = useState(false);
  // the current question object from quizData.
  const currentQuestion = quizData[currentIndex];


  function checkAnswer(index) {
    // if an answer is already selected, stop the function.
    if (selected !== null) return;
    setSelected(index);
    setShowDuck(true);
    if (index === currentQuestion.correct) {
      setScore(score + 1);
    }
  }


  function nextQuestion() {
    setCurrentIndex(currentIndex + 1);
    setSelected(null);
    setShowDuck(false);
  }


  if (currentIndex >= quizData.length) {
    return (
      <div className="app">
        <div className="card">
          <div className="top-bar">
            <span>Done</span>
            <span>
              Score: {score} / {quizData.length}
            </span>
          </div>
          <h1>🎉 Quiz Finished!</h1>
          <h2>
            Your score: {score} / {quizData.length}
          </h2>
          <div className="final-duck-card-container active">
            <img
              src="/dancingduck.gif"
              alt="Dancing Duck"
              className="duck"
            />
          </div>
        </div>
      </div>
    );
  }


  return (

    <div className="app">
      <header className="header">
        <h1>🧠 Knowledge Quiz</h1>
        <p>Test your general knowledge</p>
      </header>

      <div className="card">
        <div className="top-bar">
          <span>
            Question {currentIndex + 1} / {quizData.length}
          </span>
          <span>Score: {score}</span>
        </div>


        <h2>{currentQuestion.text}</h2>
        <div className="answers">
          {currentQuestion.options.map((option, index) => (
            <button
              // unique key required by react when rendering lists
              key={index}
              // Dynamic CSS classes.
              className={`answer 
              ${
                selected !== null &&
                index === currentQuestion.correct
                  ? "correct"
                  : ""
              }
              ${
                selected === index &&
                index !== currentQuestion.correct
                  ? "wrong"
                  : ""
              }`}
              // disable buttons after answer selection.
              disabled={selected !== null}
              // run checkAnswer
              onClick={() => checkAnswer(index)}
            >
              {option}
            </button>
          ))}
        </div>


        {/* show duck animation only if showDuck = true */}
        {showDuck && (

          <div className="inline-duck-container run">

            <img
              src="/feedbackduck.gif"
              className="inline-duck-gif"
              alt="Duck Feedback"
            />
            <span
              className={`inline-feedback-text ${
                selected === currentQuestion.correct
                  ? "correct-text"
                  : "wrong-text"
              }`}
            >
              {selected === currentQuestion.correct
                ? "Quack! Correct!"
                : "Oh no! Wrong!"}
            </span>
          </div>
        )}


        {selected !== null && (
          <button id="nextBtn" onClick={nextQuestion}>
            Next Question ➜
          </button>
        )}
      </div>


      <footer>
        <p className="footer-text">Built for Fun</p>
      </footer>
    </div>
  );
}

export default App;