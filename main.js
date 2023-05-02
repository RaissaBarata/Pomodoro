const buttons = document.querySelectorAll(".options button");
const body = document.querySelector("body");
const changeBackground = document.querySelector(".changeBackground");
const changeBackground1 = document.querySelector(".changeBackground1");
const changeBackground2 = document.querySelector(".changeBackground2");
const startButton = document.querySelector(".startButton");
const container = document.querySelector(".container");
const timer = document.querySelector(".timer");
let isRunning = false;
let timerState = 'stopped'; // variável global para controlar o estado do cronômetro
let minutes = 25;
let seconds = 0;



//para rodar/parar o cronometro:
let intervalId;

buttons.forEach((button) => {
button.addEventListener("click", (e) => {
switchOff();
e.target.setAttribute("active", "true");
 });
});

 function switchOff() {
  buttons.forEach((button) => {
    button.setAttribute("active", "false");
  });
}

// altera as propriedades e as cores do fundo e dos botões;
changeBackground.addEventListener("click", () => {
  changeTimer(
    "linear-gradient(rgb(125,86,240), rgb(211,198,250))",
    "#D3C6FA",
    "#7D56F0",
    "#C5B4F8",
    25
  );
  stopTimer();
});

changeBackground1.addEventListener("click", () => {
  changeTimer(
    "linear-gradient(rgb(207,67,239), rgb(245,217,252))",
    "#F5D9FC",
    "#CF43EF",
    "#f1c7fa",
    5
  );
  stopTimer();
});

changeBackground2.addEventListener("click", () => {
  changeTimer(
    "linear-gradient(rgb(78, 204, 208), rgb(207, 241, 242))",
    "#CFF1F2",
    "#4ECCD0",
    "#BFECEE",
    15
  );
  stopTimer();
});

function changeTimer(
  endGradient,
  timerButtonsColor,
  startButtonColor,
  containerColor,
  startingMinutes
) {
  isRunning = false;
  const bodyRgb = getComputedStyle(body).getPropertyValue("background-image");
  animateLinearGradient(bodyRgb, endGradient, 1000);
  buttons.forEach(
    (button) => (button.style.backgroundColor = timerButtonsColor)
  );
  startButton.style.background = startButtonColor;
  container.style.backgroundColor = containerColor;
  var startTimer = startingMinutes.toString().padStart(2, '0') + ":00";
  // startTimer += ":00";
  timer.textContent = startTimer;
  minutes = startingMinutes;
  seconds = 0;
}




function animateLinearGradient(startGradient, endGradient, duration) {
    const element = document.body;
    const hexToRgb = (hex) =>
      hex.match(/[a-f0-9]{2}/gi).map((x) => parseInt(x, 16));
    const colors1 = startGradient
      .match(/rgb\(.+?\)/g)
      .map((color) => color.match(/\d+/g).map(Number)); // Array de cores do primeiro gradient
    const colors2 = endGradient
      .match(/rgb\(.+?\)/g)
      .map((color) => color.match(/\d+/g).map(Number)); // Array de cores do segundo gradient
    const gradients = []; // Array com os valores de gradient para cada quadro
    const frames = (duration / 1000) * 60; // Número de quadros na animação (assumindo 60fps)
  
    // Cria um novo gradient para cada quadro da animação
    for (let i = 0; i <= frames; i++) {
      const gradient = [];
      for (let j = 0; j < colors1.length; j++) {
        const color1 = colors1[j];
        const color2 = colors2[j];
        const r = Math.round(color1[0] + ((color2[0] - color1[0]) / frames) * i);
        const g = Math.round(color1[1] + ((color2[1] - color1[1]) / frames) * i);
        const b = Math.round(color1[2] + ((color2[2] - color1[2]) / frames) * i);
        gradient.push(`rgb(${r},${g},${b})`);
      }
      gradients.push(`linear-gradient(${gradient.join(", ")})`);
    }
  
    // Função que atualiza o valor do gradient a cada quadro da animação
    let currentFrame = 0;
    function updateGradient() {
      element.style.background = gradients[currentFrame];
      currentFrame++;
      if (currentFrame < frames) {
        requestAnimationFrame(updateGradient);
      }
    }
  
    // Inicia a animação
    updateGradient();
  }

startButton.addEventListener("click", manageTimer);

function manageTimer() {
  if (!isRunning && timerState === 'stopped') {
    startTimer();
  } else {
    stopTimer();
  }
  startButton.setAttribute("stop", isRunning);
}

function stopTimer() {
  startButton.innerText = "Start";
  clearInterval(intervalId);
  isRunning = false;
  timerState = 'stopped';
}



function startTimer() {
  startButton.innerText = "Stop";
  timerState = 'running'; // definir o estado do cronômetro como 'running'
  intervalId = setInterval(() => {
    if (timerState === 'stopped') {
      clearInterval(intervalId); // se o cronômetro estiver parado, limpe o intervalo e saia do loop
      isRunning = false;
      return;
    }

    if (seconds == 0 && minutes == 0) {
      clearInterval(intervalId);
      alert("Time to rest!");
      timerState = 'stopped'; // definir o estado do cronômetro como 'stopped' quando o tempo acabar
    } else if (seconds == 0) {
      seconds = 59;
      minutes--;
    } else {
      seconds--;
    }
    timer.innerHTML = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, 1000);
  isRunning = true;
}

