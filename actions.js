const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = document.querySelector(".quit");
const cnt_btn = document.querySelector(".restart");
const quiz_box = document.querySelector(".quiz_box");
const que_text = document.querySelector(".que_text");
const option_list = document.querySelector(".option_list");
const next_btn = document.querySelector(".next_btn");
const quesCounetr = document.querySelector("footer .total_que");
const timer_sec = document.querySelector(".timer_sec");
const spinner = document.querySelector(".text-success");

var question = [];
var indexCount = 0;

const timer = (timerCount) => {
  const timerInterval = setInterval(() => {
    if (timerCount > 0) {
      timerCount = timerCount - 1;
      timer_sec.innerText = timerCount;
    } else if (timerCount < 9) {
      timer_sec.textContent = timerCount;
    } else {
      console.log("here");
      clearTimeout(timerInterval);
    }
  }, 1000);
};

start_btn.onclick = () => {
  info_box.classList.add("activeInfo");
};

exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo");
};

cnt_btn.onclick = async () => {
  // const res = await fetch("https://opentdb.com/api.php?amount=10");
  // const resJson = await res.json();
  // questions = resJson.results;
  if (!resJson) {
    info_box.classList.remove("activeInfo");
    spinner.classList.remove("d-none");
    spinner.classList.add("spinner-grow");
  } else {
    spinner.classList.remove("spinner-grow");

    quiz_box.classList.add("activeQuiz");
    showQuestion(indexCount);
    timer(15);
  }
};

const showQuestion = (index) => {
  let question = `<span>${index + 1} . ${questions[index].question}  </span>`;
  que_text.innerHTML = question;
  const { incorrect_answers } = questions[index];

  const option =
    questions[index].incorrect_answers.length == 1
      ? `<div class="option"><span>${questions[index].incorrect_answers[0]}</span></div>
      <div class="option"><span>${questions[index].correct_answer}</span></div>`
      : `<div class="option"><span>${questions[index].incorrect_answers[0]}</span></div> 
        <div class="option"><span>${questions[index].incorrect_answers[1]}</span></div>
        <div class="option"><span>${questions[index].incorrect_answers[2]}</span></div>
        <div class="option"><span>${questions[index].correct_answer}</span></div>`;

  option_list.innerHTML = option;

  const options = option_list.querySelectorAll(".option");
  for (let i = 0; i < options.length; i++) {
    options[i].setAttribute("onclick", "optionSelected(this)");
  }
  questionCounter(index);
};

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

const optionSelected = (context) => {
  const { correct_answer } = questions[indexCount];
  const totalOptions = option_list.children.length;
  if (correct_answer === context.innerText) {
    context.classList.add("correct");
    context.insertAdjacentHTML("beforeend", tickIconTag);
  } else {
    context.classList.add("incorrect");
    context.insertAdjacentHTML("beforeend", crossIconTag);
  }
  for (let i = 0; i < totalOptions; i++) {
    option_list.children[i].classList.add("disabled");
  }
  next_btn.classList.add("show");
};

next_btn.onclick = () => {
  if (indexCount < 10) {
    indexCount = indexCount + 1;
  }
  showQuestion(indexCount);
  questionCounter(indexCount);
};

const questionCounter = (index) => {
  let totalCounter = `<span><p>${index + 1} of ${questions.length}</p></span>`;
  quesCounetr.innerHTML = totalCounter;
};
