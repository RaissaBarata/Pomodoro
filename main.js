const buttons = document.querySelectorAll('.options button');
const body = document.querySelector('body');
const changeBackground = document.querySelector('.changeBackground')
const changeBackground1 = document.querySelector('.changeBackground1')
const changeBackground2 = document.querySelector('.changeBackground2')
const startButton = document.querySelector('.startButton')
const container = document.querySelector('.container')


    
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

changeBackground.addEventListener('click', () => {
    // body.style.background = "linear-gradient(#7D56F0, #D3C6FA)"
    animateLinearGradient("linear-gradient(#CF43EF, #F5D9FC)", "linear-gradient(#7D56F0, #D3C6FA)", 1000)
    buttons.forEach(button => button.style.backgroundColor = '#D3C6FA');
    startButton.style.background = '#7D56F0'
    container.style.backgroundColor = "#C5B4F8"
})

changeBackground1.addEventListener('click', () => {
    body.style.background = 'linear-gradient(#CF43EF, #F5D9FC)'
    buttons.forEach(button => button.style.backgroundColor = '#F5D9FC');
    startButton.style.background = '#CF43EF'
    container.style.backgroundColor = "#f1c7fa"
})

changeBackground2.addEventListener('click', () => {
    body.style.background = 'linear-gradient(#4ECCD0, #CFF1F2)'
    buttons.forEach(button => button.style.backgroundColor = '#CFF1F2');
    startButton.style.background = '#4ECCD0'
    container.style.backgroundColor = "#BFECEE"
})

function animateLinearGradient(startGradient, endGradient, duration) {
    const element = document.body; 
    const colors1 = startGradient.match(/#[0-9a-f]{6}/gi); // Array de cores do primeiro gradient
    const colors2 = endGradient.match(/#[0-9a-f]{6}/gi); // Array de cores do segundo gradient
    const gradients = []; // Array com os valores de gradient para cada quadro
    const frames = duration / 1000 * 60; // Número de quadros na animação (assumindo 60fps)
  
    // Cria um novo gradient para cada quadro da animação
    for (let i = 0; i <= frames; i++) {
      const gradient = [];
      for (let j = 0; j < colors1.length; j++) {
        const color1 = colors1[j];
        const color2 = colors2[j];
        const r = Math.round(parseInt(color1.slice(1, 3), 16) + (parseInt(color2.slice(1, 3), 16) - parseInt(color1.slice(1, 3), 16)) / frames * i);
        const g = Math.round(parseInt(color1.slice(3, 5), 16) + (parseInt(color2.slice(3, 5), 16) - parseInt(color1.slice(3, 5), 16)) / frames * i);
        const b = Math.round(parseInt(color1.slice(5, 7), 16) + (parseInt(color2.slice(5, 7), 16) - parseInt(color1.slice(5, 7), 16)) / frames * i);
        gradient.push(`#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
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