import { useState, useMemo, useEffect } from "react";
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


// reusable component for question text and answer options
// receives question text and answer options through props
function Question({ currentQuestion, alterScore }) {
  const [selected, setSelected] = useState(null);
  const [showDuck, setShowDuck] = useState(false);

  useEffect(() => {
    setSelected(null);
    setShowDuck(false);
  }, [currentQuestion]);

  function checkAnswer(index) {
    if (selected !== null) return;

    setSelected(index);
    setShowDuck(true);

    const isCorrect = index === currentQuestion.correct;
    alterScore(isCorrect);
  }

  return (
    <>
      <h2>{currentQuestion.text}</h2>
      <div className="answers">
        {currentQuestion.options.map((option, index) => (
          <AnswerButton
            key={index}
            option={option}
            index={index}
            selected={selected}
            correct={currentQuestion.correct}
            checkAnswer={checkAnswer}
          />
        ))}
      </div>

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
    </>
  );
}


// reusable component for answer button
// receives all needed data through props
function AnswerButton({
  option,
  index,
  selected,
  correct,
  checkAnswer,
}) {
  return (
    <button
      // dynamic classes for correct/wrong answers
      className={`answer 
      ${
        selected !== null && index === correct
          ? "correct"
          : ""
      }
      ${
        selected === index && index !== correct
          ? "wrong"
          : ""
      }`}
      
      // disable buttons after selecting answer
      disabled={selected !== null}

      // send selected answer index
      onClick={() => checkAnswer(index)}
    >
      {option}
    </button>
  );
}


function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  // tracks whether current question has been answered (for Next button)
  const [answered, setAnswered] = useState(false);

  // memoized current question object
  const currentQuestion = useMemo(() => quizData[currentIndex], [currentIndex]);


  // called by Question after an answer is selected
  function alterScore(isCorrect) {
    if (isCorrect) setScore((s) => s + 1);
    setAnswered(true);
  }


  function nextQuestion() {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setAnswered(false);
  }


  // final screen after all questions
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

        {/* reuVable question component */}
        <Question currentQuestion={currentQuestion} alterScore={alterScore} />


        {/* next question button */}
        {answered && (
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