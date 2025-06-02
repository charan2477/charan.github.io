const quizData = [{
    question : "Which of these elements in HTML can be used for making a text bold?",
    a : "<a>",
    b : "<b>",
    c : "<i>",
    d : "<u>",
    correct:"b",
},
{
    question : " Which tag do we use in HTML for inserting a line-break?",
    a : "<br>",
    b : "<hr>",
    c : "<p>",
    d : "<img>",
    correct:"a",
},
{
    question : "Which of the following is a valid attribute for the <img> tag in HTML",
    a : "src",
    b : "alt",
    c : "title",
    d : "all of the above",
    correct:"d",
},
{
    question : "What is the use of <hr> tag in HTML?",
    a : "To make text bold",
    b : "To make text italic",
    c : "To insert a horizontal line",
    d : "To insert a vertical line",
    correct:"c",
},
{
    question : "Which HTML tag do we use to display text along with a scrolling effect?",
    a : "<u>",
    b : "<blink>",
    c : "<i>",
    d : "<marquee>",
    correct:"d",
}
];
const quiz=document.getElementById("quiz");
const resultEle=document.getElementById("result")

const answerEls= document.querySelectorAll('.answer');
const labelEls= document.querySelectorAll('.op_label');
const questionEle=document.getElementById("question");
const a_text=document.getElementById("a_text");
const b_text=document.getElementById("b_text");
const c_text=document.getElementById("c_text");
const d_text=document.getElementById("d_text");
const prevBtn=document.getElementById("prev");
const nextBtn=document.getElementById("next");
const submitBtn=document.getElementById("submit");
const scoreEle=document.getElementById("score");
const reloadBtn=document.getElementById("reload");


let currentQtn=0;
let answered=0;
let submitted=false;
// this is used to store the answers
let userSelected = {
}

loadQuiz()
function loadQuiz(){
    questionEle.innerText=quizData[currentQtn].question;
    a_text.innerText=quizData[currentQtn].a;
    b_text.innerText=quizData[currentQtn].b;
    c_text.innerText=quizData[currentQtn].c;
    d_text.innerText=quizData[currentQtn].d;
    deSelectAnswer()

    if (userSelected[currentQtn]){
        let selected = userSelected[currentQtn];
        document.getElementById(selected).checked = true
    }
    if(currentQtn == quizData.length - 1){
        nextBtn.style.display="none";
        if (submitted){
            submitBtn.style.display="none";
            reloadBtn.style.display="block";
        }
        else{
            submitBtn.style.display='block';
            reloadBtn.style.display="none";
        }
        
    }
    if(submitted){
        let actualAns = quizData[currentQtn].correct;
        let selected = userSelected[currentQtn];
        labelEls.forEach(
            (labelEle) => {
                labelEle.classList.remove('correct');
                labelEle.classList.remove('wrong');
            }
        )

        if (actualAns == selected){
            let op=actualAns + "_text"
            document.getElementById(op).classList.add('correct')
        }
        else{
            let correct_op=actualAns + "_text";
            document.getElementById(correct_op).classList.add('correct');
            let user_op=selected+ "_text";
            document.getElementById(user_op).classList.add('wrong');
        }

    }
}
function deSelectAnswer(){
    answerEls.forEach(
        (answerEle)=>{
            // if the answer element is checked
            answerEle.checked = false
        }
    )
}
nextBtn.addEventListener(
    'click', () => {
        let answer = getSelected();
        if(!submitted){
            if(answer){
                if (answer == quizData[currentQtn].correct){
                    answered++;     
                }
                // 0,1,2,3,4
                currentQtn++;
                // next question 
                // upto 4<5
                if(currentQtn < quizData.length){
                    loadQuiz()
                }
            }
        }
        else{
            currentQtn++;
            loadQuiz();
        }

    }
)

prevBtn.addEventListener(
    'click',() => {
        if(currentQtn>0){
            currentQtn--;
            loadQuiz()
        }
    }
)
submitBtn.addEventListener(
    'click', () => {
        if (getSelected()){
            submitted = true;
            answered = 0;

            // Recalculate correct answers
            for (let i = 0; i < quizData.length; i++) {
                if (userSelected[i] === quizData[i].correct) {
                    answered++;
                }
            }
            resultEle.classList.add('padd')
            quiz.style.display = 'none';
            resultEle.style.display = "block";
            scoreEle.innerText = answered + "/" + quizData.length + " questions answered correctly";
            
        }
    }
);

function getSelected(){
    let answer;
    // loop through all the answer elements
    answerEls.forEach(
        (answerEle)=>{
            // if the answer element is checked
            if(answerEle.checked){
                answer=answerEle.id;
                userSelected[currentQtn]= answer;
            }
        }
    )
    return answer
}
function loadAnswers(){
    currentQtn=0;
    quiz.style.display='block';
    resultEle.style.display="none";
    answerEls.forEach(
        (answerEle) => {
            answerEle.disabled =true;
        }
    )
    submitBtn.style.display='none';
    nextBtn.style.display='block';
    loadQuiz()
}