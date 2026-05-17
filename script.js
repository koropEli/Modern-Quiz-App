const quizData = [
    { text: "Which ocean is the largest?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], correct: 2 },
    { text: "Where do wild ducks NOT live?", options: ["Africa", "Antarctica", "Australia", "Europe"], correct: 1 },
    { text: "Which human organ never rests?", options: ["Brain", "Lungs", "Stomach", "Heart"], correct: 3 },
    { text: "Which metal is liquid at room temperature?", options: ["Mercury", "Gold", "Iron", "Zinc"], correct: 0 },
    { text: "What did Cinderella lose at the ball?", options: ["Ring", "Slipper", "Necklace", "Glove"], correct: 1 },
    { text: "Is a duck a bird?", options: ["Yes", "No"], correct: 0 }
];

let currentIndex = 0;
let score = 0;

function loadQuestion() {
    let q = quizData[currentIndex];
    document.getElementById("question").textContent = q.text;
    document.getElementById("progress").textContent = "Question " + (currentIndex + 1) + " / " + quizData.length;
    document.getElementById("inlineDuckContainer").classList.remove("run");

    const answersContainer = document.getElementById("answers");
    answersContainer.innerHTML = ""; // Очищаем контейнер перед загрузкой новых кнопок

    // вставляем текст ответа, включаем кнопку, сбрасываем цвета (удаляем красный/зеленый)
    // Теперь создаем ровно столько кнопок, сколько вариантов в текущем вопросе
    q.options.forEach((optionText, index) => {
        const btn = document.createElement("button");
        btn.textContent = optionText;
        btn.className = "answer";
        btn.onclick = () => checkAnswer(index);
        answersContainer.appendChild(btn);
    });

    document.getElementById("nextBtn").style.display = "none";
}

function checkAnswer(userChoice) {
    let q = quizData[currentIndex];
    let duck = document.getElementById("inlineDuckContainer");
    let feedback = document.getElementById("inlineFeedbackText");
    
    // Находим все созданные кнопки, чтобы их отключить
    const buttons = document.querySelectorAll(".answer");
    buttons.forEach(btn => btn.disabled = true);

    if (userChoice === q.correct) {
        buttons[userChoice].classList.add("correct");
        score++;
        document.getElementById("score").textContent = "Score: " + score;
        feedback.textContent = "Quack! Correct!";
        feedback.style.color = "#22c55e";
    } else {
        buttons[userChoice].classList.add("wrong");
        buttons[q.correct].classList.add("correct");
        feedback.textContent = "Oh no! Wrong!";
        feedback.style.color = "#ef4444"; 
    }
    duck.classList.add("run");
    setTimeout(function() {
        document.getElementById("nextBtn").style.display = "block";
    }, 4500); 
}

// NEXT
document.getElementById("nextBtn").onclick = function() {
    currentIndex++;
    if (currentIndex < quizData.length) {
        loadQuestion();
    } else {
        showFinal();
    }
};

function showFinal() {
    document.getElementById("question").textContent = "🎉 Finished!";
    document.getElementById("answers").style.display = "none";
    document.querySelector(".card").innerHTML = `
        <div class="top-bar">
            <span>Done</span>
            <span>Score: ${score}</span>
        </div>
        <h2 style="margin-top: 40px;">🎉 Quiz Finished!</h2>
        <h3 style="margin-bottom: 20px;">Your score: ${score} / ${quizData.length}</h3>
        
        <div id="finalDuckContainer" class="final-duck-card-container active">
            <img src="dancingduck.gif" alt="Dancing Duck" style="height: 180px;">
        </div>
    `;
    document.getElementById("nextBtn").style.display = "none";
}

loadQuestion();