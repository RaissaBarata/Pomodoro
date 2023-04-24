const buttons = document.querySelectorAll('.options button');
const body = document.querySelector('body');
const changeBackground = document.querySelector('.changeBackground')
const changeBackground1 = document.querySelector('.changeBackground1')
const changeBackground2 = document.querySelector('.changeBackground2')
const startButton = document.querySelector('.startButton')
const container = document.querySelector('.container')
const timer = document.querySelector('.timer')
let isRunning = false;




    
buttons.forEach(button => {
button.addEventListener('click', (e) => {
        switchOff()
        e.target.setAttribute('active', 'true');
    })
})

function switchOff() {
    buttons.forEach(button => {
        button.setAttribute('active', 'false');
    })
}

// altera as propriedades e as cores do fundo e dos botões;
changeBackground.addEventListener('click', () => {
    changeTimer("linear-gradient(rgb(125,86,240), rgb(211,198,250))", "#D3C6FA", "#7D56F0", "#C5B4F8", "25:00");
})



changeBackground1.addEventListener('click', () => {
  changeTimer("linear-gradient(rgb(207,67,239), rgb(245,217,252))", '#F5D9FC', '#CF43EF', "#f1c7fa",'5:00');

})

changeBackground2.addEventListener('click', () => {
  changeTimer("linear-gradient(rgb(78, 204, 208), rgb(207, 241, 242))", '#CFF1F2', "#4ECCD0", "#BFECEE", "15:00");
})

function changeTimer(endGradient, timerButtonsColor, startButtonColor, containerColor, startTimer) {
  if (isRunning) {
    isRunning = false;
   }
  const bodyRgb = getComputedStyle(body).getPropertyValue('background-image');
  animateLinearGradient(bodyRgb, endGradient, 1000);
  buttons.forEach(button => button.style.backgroundColor = timerButtonsColor);
  startButton.style.background = startButtonColor;
  container.style.backgroundColor = containerColor;
  timer.textContent = startTimer;
}

function animateLinearGradient(startGradient, endGradient, duration) {
  const element = document.body;
  const hexToRgb = (hex) => hex.match(/[a-f0-9]{2}/gi).map((x) => parseInt(x, 16));
  const colors1 = startGradient.match(/rgb\(.+?\)/g).map((color) => color.match(/\d+/g).map(Number)); // Array de cores do primeiro gradient
  const colors2 = endGradient.match(/rgb\(.+?\)/g).map((color) => color.match(/\d+/g).map(Number)); // Array de cores do segundo gradient
  const gradients = []; // Array com os valores de gradient para cada quadro
  const frames = duration / 1000 * 60; // Número de quadros na animação (assumindo 60fps)

  // Cria um novo gradient para cada quadro da animação
  for (let i = 0; i <= frames; i++) {
    const gradient = [];
    for (let j = 0; j < colors1.length; j++) {
      const color1 = colors1[j];
      const color2 = colors2[j];
      const r = Math.round(color1[0] + (color2[0] - color1[0]) / frames * i);
      const g = Math.round(color1[1] + (color2[1] - color1[1]) / frames * i);
      const b = Math.round(color1[2] + (color2[2] - color1[2]) / frames * i);
      gradient.push(`rgb(${r},${g},${b})`);
    }
    gradients.push(`linear-gradient(${gradient.join(', ')})`);
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

// botão que para o cronometro
var timeStopped = false;
startButton.addEventListener('click', () => {
  timeStopped = !timeStopped;
  stopTimer(timeStopped)
})

function stopTimer(timerStopped) {
  startButton.setAttribute('stop', timerStopped);
  if (timeStopped) {
    startButton.innerText = "Stop";
  } else {
    startButton.innerText = "Start";
  }
  
}

//para rodar/parar o cronometro:
let intervalId;

startButton.addEventListener("click", () => {
if (!isRunning) {
  let segundos = 0;
  let minutos = 25;
  intervalId = setInterval(() => {
    if (segundos == 0 && minutos == 0) {
      clearInterval(intervalId);
      alert("Time to rest!");
      isRunning = false;
    } else if (segundos == 0) {
      segundos = 59;
      minutos--;
    } else {
      segundos--;
    }
    timer.innerHTML = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
  }, 1000);
  isRunning = true;
} else {
  clearInterval(intervalId);
  isRunning = false;
  
}
});