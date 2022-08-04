const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = document.querySelector(".quit");
const cnt_btn = document.querySelector(".restart");
const quiz_box = document.querySelector(".quiz_box");

start_btn.onclick = () => {
  info_box.classList.add("activeInfo");
};

exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo");
};

cnt_btn.onclick = () => {
  fetch("https://opentdb.com/api.php?amount=10")
    .then((res) => res.json())
    .then((rejson) => console.log(rejson.results))
    .catch((err) => console.log(err));

  info_box.classList.remove("activeInfo");
  quiz_box.classList.add("activeQuiz");
};
