const problemElement = document.querySelector(".problem")
const p1Form = document.querySelector(".p1-form")
const p2Form = document.querySelector(".p2-form")
const ourField = document.querySelector(".our-field")
const ourField2 = document.querySelector(".our-field-2")
const pointsNeeded = document.querySelector(".points-needed")
const pointsNeeded2 = document.querySelector(".points-needed-2")
const mistakesAllowed = document.querySelector(".mistakes-allowed")
const mistakesAllowed2 = document.querySelector(".mistakes-allowed-2")
const progressBar = document.querySelector(".progress-inner")
const endMessage = document.querySelector(".end-message")
const resetButton = document.querySelector(".reset-button")

let state = {
  p1score: 0,
  p2score: 0,
  p1WrongAnswers: 0,
  p2WrongAnswers: 0
}

let gamePoint = 5;

function updateProblem() {
  state.currentProblem = generateProblem()
  problemElement.innerHTML = `${state.currentProblem.numberOne} ${state.currentProblem.operator} ${state.currentProblem.numberTwo}`
  ourField.value = "";
  ourField.focus();
  ourField2.value = "";
}

updateProblem();


function generateNumber(max) {
  return Math.floor(Math.random() * (max + 1))
}

function generateProblem() {
  return {
    numberOne: generateNumber(10),
    numberTwo: generateNumber(10),
    operator: ['+', '-', 'x'][generateNumber(2)]
  }
}

let flag = 0;
p2Form.style.display = "none";

p1Form.addEventListener("submit", handleSubmit)
p2Form.addEventListener("submit", handleSubmit2)

function handleSubmit(e) {
  e.preventDefault()
  let correctAnswer;
  const p = state.currentProblem
  if (p.operator == "+") correctAnswer = p.numberOne + p.numberTwo
  if (p.operator == "-") correctAnswer = p.numberOne - p.numberTwo
  if (p.operator == "x") correctAnswer = p.numberOne * p.numberTwo

  if (parseInt(ourField.value, 10) === correctAnswer) {
    state.p1score++;
    pointsNeeded.textContent = state.p1score;
    updateProblem();
  } else {
    state.p1WrongAnswers++;
    mistakesAllowed.textContent = 2 - state.p1WrongAnswers
    problemElement.classList.add("animate-wrong")
    setTimeout(() => problemElement.classList.remove("animate-wrong"), 451)
  }
  checkLogic()
}

function handleSubmit2(e) {
    e.preventDefault()
  
    let correctAnswer;
    const p = state.currentProblem;
    if (p.operator == "+") correctAnswer = p.numberOne + p.numberTwo
    if (p.operator == "-") correctAnswer = p.numberOne - p.numberTwo
    if (p.operator == "x") correctAnswer = p.numberOne * p.numberTwo
  
    if (parseInt(ourField2.value, 10) === correctAnswer) {
      state.p2score++;
      pointsNeeded2.textContent = state.p2score
      updateProblem()
    } else {
      state.p2WrongAnswers++
      mistakesAllowed2.textContent = 2 - state.p2WrongAnswers
      problemElement.classList.add("animate-wrong")
      setTimeout(() => problemElement.classList.remove("animate-wrong"), 451)
    }
    checkLogic2()
  }

function checkLogic() {
  // if P1 lost
  if (state.p1WrongAnswers === 3) {
    endMessage.textContent = "Sorry! Player Two You lost.";
    document.body.classList.add("overlay-is-open")
    setTimeout(() => resetButton.focus(), 331)
  }
  flag++;

  if(flag === gamePoint) {
    p1Form.style.display = "none";
    p2Form.style.display = "block";
    p2Form.style.textAlign = "center";
  }
}

function checkLogic2() {
    if (state.p2score === gamePoint) {
        if (state.p2score > state.p1score && state.p2WrongAnswers < state.p1WrongAnswers) {
            endMessage.textContent = `Congrats! Player 2 you completed the challenge and WON!!!. with ${state.p2score} P1 points are ${state.p1score}`;
            document.body.classList.add("overlay-is-open")
            setTimeout(() => resetButton.focus(), 331)
        }
        if (state.p2score < state.p1score && state.p2WrongAnswers > state.p1WrongAnswers) {
            endMessage.textContent = `Congrats! Player 1 you completed the challenge and WON!!!. with ${state.p1score} P2 points are ${state.p2score}`;
            document.body.classList.add("overlay-is-open")
            setTimeout(() => resetButton.focus(), 331)
        }
        else {
          endMessage.textContent = `It's a TIE!!!!`;
            document.body.classList.add("overlay-is-open")
            setTimeout(() => resetButton.focus(), 331)
        }
    }
  
    // if P2 lost
    if (state.p2WrongAnswers === 3) {
      endMessage.textContent = "Sorry! Player Two You lost.";
      document.body.classList.add("overlay-is-open")
      setTimeout(() => resetButton.focus(), 331)
    }
  }

resetButton.addEventListener("click", resetGame)

function resetGame() {
  document.body.classList.remove("overlay-is-open")
  updateProblem();
  state.p1score = 0;
  state.p2score = 0;
  state.p1WrongAnswers = 0;
  state.p2WrongAnswers = 0;
  gamePoint = 0;
  mistakesAllowed.textContent = 2;
  location.reload();
}