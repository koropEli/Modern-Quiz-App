const questions = [
    {
        text: "What is the capital of Poland?",
        options: ["Berlin", "Warsaw", "Paris", "Rome"],
        correct: 1
    },
    {
        text: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        correct: 1
    },
    {
        text: "What is 10 + 7?",
        options: ["10", "17", "9", "16"],
        correct: 1
    },
    {
        text: "Which language runs in a web browser?",
        options: ["Python", "C++", "JavaScript", "Java"],
        correct: 2
    },
    {
        text: "Who wrote 'Harry Potter'?",
        options: ["Tolkien", "Rowling", "Martin", "Shakespeare"],
        correct: 1
    }
];

let currentIndex = 0; //which question you are on
let score = 0;        //how many correct answers user got


function loadQuestion() {

    let q = questions[currentIndex];

    document.getElementById("question").textContent = q.text;

    let currentNum = currentIndex + 1;
    document.getElementById("progress").textContent = "Question " + currentNum + " / " + questions.length;

    for (let i = 0; i < 4; i++) {
        let btn = document.getElementById("btn" + i);
        
        btn.textContent = q.options[i]; 
        btn.disabled = false;          
        btn.className = "answer";  
    }
    document.getElementById("nextBtn").style.display = "none";
}

function check(userChoice) {
    let q = questions[currentIndex];
    let correctChoice = q.correct;

    for (let i = 0; i < 4; i++) {
        document.getElementById("btn" + i).disabled = true;
    }
    if (userChoice === correctChoice) {
        document.getElementById("btn" + userChoice).classList.add("correct");
        score = score + 1;
        document.getElementById("score").textContent = "Score: " + score;
    } else {
        document.getElementById("btn" + userChoice).classList.add("wrong");
        document.getElementById("btn" + correctChoice).classList.add("correct");
    }
    document.getElementById("nextBtn").style.display = "block";
}

document.getElementById("nextBtn").onclick = function() {
    currentIndex = currentIndex + 1; 
    if (currentIndex < questions.length) {
        loadQuestion();
    } else {
        showFinal();
    }
};

function showFinal() {
    document.getElementById("question").textContent = "🎉 Quiz Finished!";
    document.getElementById("answers").innerHTML = "<h3>Your score: " + score + " / " + questions.length + "</h3>";
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("progress").textContent = "Done";
}
loadQuestion();