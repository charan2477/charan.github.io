const quizData = [
    {
        question: "Which of these elements in HTML can be used for making a text bold?",
        a: "<a>",
        b: "<b>",
        c: "<i>",
        d: "<u>",
        correct: "b",
    },
    {
        question: "Which tag do we use in HTML for inserting a line-break?",
        a: "<br>",
        b: "<hr>",
        c: "<p>",
        d: "<img>",
        correct: "a",
    },
    {
        question: "How to create a hyperlink in HTML?",
        a: "<a link = “www.thinkandlearn.com”> thinkandlearn.com </a>",
        b: "<a href = “www.thinkandlearn.com”> thinkandlearn.com </a>",
        c: "<a link = “www.thinkandlearn.com”> thinkandlearn.com </a>",
        d: "<a href = “www.thinkandlearn.com”> thinkandlearn.com </a>",
        correct: "b",
    },
    {
        question: "What is the use of <hr> tag in HTML?",
        a: "To make text bold",
        b: "To make text italic",
        c: "To insert a horizontal line",
        d: "To insert a vertical line",
        correct: "c",
    },
    {
        question: "Which HTML tag do we use to display text along with a scrolling effect?",
        a: "<u>",
        b: "<blink>",
        c: "<i>",
        d: "<marquee>",
        correct: "d",
    }
];

const quiz = document.getElementById("quiz");
const resultEle = document.getElementById("result");
const answerEls = document.querySelectorAll(".answer");
const labelEls = document.querySelectorAll(".op_label");
const questionEle = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const submitBtn = document.getElementById("submit");
const scoreEle = document.getElementById("score");
const reloadBtn = document.getElementById("reload");

let currentQtn = 0;
let answered = 0;
let submitted = false;
let userSelected = {};

loadQuiz();

function loadQuiz() {
    const currentData = quizData[currentQtn];
    questionEle.innerText = currentData.question;
    a_text.innerText = currentData.a;
    b_text.innerText = currentData.b;
    c_text.innerText = currentData.c;
    d_text.innerText = currentData.d;
    deSelectAnswer();

    labelEls.forEach(label => {
        label.classList.remove("correct");
        label.classList.remove("wrong");
    });

    if (userSelected[currentQtn]) {
        document.getElementById(userSelected[currentQtn]).checked = true;
    }

    answerEls.forEach(el => {
        el.disabled = submitted;
    });

    // Button visibility logic
    prevBtn.style.display = currentQtn > 0 ? "inline-block" : "none";
    nextBtn.style.display = (!submitted && currentQtn < quizData.length - 1) ? "inline-block" : "none";
    submitBtn.style.display = (!submitted && currentQtn === quizData.length - 1) ? "inline-block" : "none";
    reloadBtn.style.display = (submitted && currentQtn === quizData.length - 1) ? "inline-block" : "none";

    if (submitted) {
        const correctAnswer = currentData.correct;
        const selectedAnswer = userSelected[currentQtn];
        if (selectedAnswer) {
            document.getElementById(correctAnswer + "_text").classList.add("correct");
            if (selectedAnswer !== correctAnswer) {
                document.getElementById(selectedAnswer + "_text").classList.add("wrong");
            }
        }
    }
}

function deSelectAnswer() {
    answerEls.forEach(answer => answer.checked = false);
}

function getSelected() {
    let selected;
    answerEls.forEach(answer => {
        if (answer.checked) {
            selected = answer.id;
            userSelected[currentQtn] = selected;
        }
    });
    return selected;
}

nextBtn.addEventListener("click", () => {
    if (!submitted && getSelected()) {
        currentQtn++;
        loadQuiz();
    } else if (submitted) {
        currentQtn++;
        loadQuiz();
    }
});

prevBtn.addEventListener("click", () => {
    if (currentQtn > 0) {
        currentQtn--;
        loadQuiz();
    }
});

submitBtn.addEventListener("click", () => {
    if (getSelected()) {
        submitted = true;
        answered = 0;
        quizData.forEach((q, i) => {
            if (userSelected[i] === q.correct) {
                answered++;
            }
        });
        quiz.style.display = "none";
        resultEle.style.display = "block";
        scoreEle.innerText = `${answered}/${quizData.length} questions answered correctly`;
    }
});

function loadAnswers() {
    currentQtn = 0;
    quiz.style.display = "block";
    resultEle.style.display = "none";
    submitted = true;
    loadQuiz();
}
