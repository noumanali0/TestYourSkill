const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = document.querySelector(".quit");
const cnt_btn = document.querySelector(".restart");
const quiz_box = document.querySelector(".quiz_box");
const que_text = document.querySelector(".que_text");
const option_list = document.querySelector(".option_list");

var question = [];

start_btn.onclick = () => {
  info_box.classList.add("activeInfo");
};

exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo");
};

cnt_btn.onclick = async () => {
  const res = await fetch("https://opentdb.com/api.php?amount=10");
  const resJson = await res.json();
  questions = resJson.results;
  console.log(questions);
  info_box.classList.remove("activeInfo");
  quiz_box.classList.add("activeQuiz");
  showQuestion(0);
};

const showQuestion = (index) => {
  let question = `<span>${index + 1} . ${questions[index].question}  </span>`;
  que_text.innerHTML = question;
  const { incorrect_answers } = questions[index];
  console.log(incorrect_answers);
  const option =
    questions[index].incorrect_answers.length == 1
      ? `<div class="option"><span>${questions[index].incorrect_answers[0]}</span></div>`
      : `<div class="option"><span>${questions[index].incorrect_answers[0]}</span></div> 
        <div class="option"><span>${questions[index].incorrect_answers[1]}</span></div>
        <div class="option"><span>${questions[index].incorrect_answers[2]}</span></div>`;

  option_list.innerHTML = option;
};
