const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

const barreiraMap = [];
for (let i = 0; i < barreiraNum.length; i += 70) {
  barreiraMap.push(barreiraNum.slice(i, 70 + i));
}

const batalhaMap = [];
for (let i = 0; i < batalhas.length; i += 70) {
  batalhaMap.push(batalhas.slice(i, 70 + i));
}


class barreira {
  static width = 38;
  static height = 38;
  constructor({ posicao }) {
    this.posicao = posicao;
    this.width = 38;
    this.height = 38;
  }
  draw() {
    c.fillStyle = "pink";
    c.fillRect(this.posicao.x, this.posicao.y, this.width, this.height);
  }
}
const zonaBatalha = [];
const muralhas = []

const off = {
  x: -125,
  y: -200,
};

barreiraMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 672 || symbol ===29311)
      muralhas.push(
        new barreira({
          posicao: {
            x: j * barreira.width + off.x,
            y: i * barreira.height + off.y,
          },
        })
      );
  });
});

batalhaMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 672)
      zonaBatalha.push(
        new barreira({
          posicao: {
            x: j * barreira.width + off.x,
            y: i * barreira.height + off.y,
          },
        })
      );
  });
});

//imagens
const imagem = new Image();
imagem.src = "./jogo/map.png";

const jogador = new Image();
jogador.src = "./jogo/playerDown.png";

class sprite {
  constructor({ posicao, velocidade, imagem, frames = {max: 1} }) {
    this.posicao = posicao;
    this.imagem = imagem;
    this.frames = frames

    this.imagem.onload = () => {
      this.width = this.imagem.width / this.frames.max
      this.height = this.imagem.height
      console.log(this.width)
      console.log(this.height)
    }
  }

  draw() {
    c.drawImage(this.imagem, this.posicao.x, this.posicao.y);
  }
}

const fundo = new sprite({
  posicao: {
    //essa posição é onde o personagem vai começar
    x: off.x,
    y: off.y,
  },
  imagem: imagem,
});

const botoes = {
  arrowUp: {
    pressed: false,
  },
  arrowDown: {
    pressed: false,
  },
  arrowRight: {
    pressed: false,
  },
  arrowLeft: {
    pressed: false,
  },
};

const movimento = [fundo, ...muralhas,...zonaBatalha];

function colisaoRetangulo({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  );
}

const teste = new barreira({
  posicao:{
    x: -125,
    y: -200
  }
})
//as barreiras estap seguindo o personagem, n sei arrumar
function animacao() {
  window.requestAnimationFrame(animacao);
  fundo.draw();
  muralhas.forEach((muralha) => {
    muralha.draw()
  })
  teste.draw()
  c.drawImage(
    jogador,
    0,
    0,
    jogador.width / 4,
    jogador.height,
    canvas.width / 2,
    canvas.height / 2,
    30,
    40
  );


  zonaBatalha.forEach((zonaDeBatalha) => {
    zonaDeBatalha.draw();
  });

  for(let i = 0; i > zonaBatalha.length; i++){
    const zonaDeBatalha = zonaBatalha[i]
    if(
      colisaoRetangulo({
        rectangle1: jogador,
        rectangle2: zonaDeBatalha
      })
    ) {
      console.log('colisao');
      break
    }
  }

  //para o personagem andar, eu estou alterando a posicao do fundo!!!!
  if (botoes.arrowDown.pressed && ultimo === "ArrowDown") {
    movimento.forEach((movimento) => {
      movimento.posicao.y -= 3;
    });
  } else if (botoes.arrowUp.pressed && ultimo === "ArrowUp") {
    movimento.forEach((movimento) => {
      movimento.posicao.y += 3;
    });
  } else if (botoes.arrowRight.pressed && ultimo === "ArrowRight") {
    movimento.forEach((movimento) => {
      movimento.posicao.x -= 3;
    });
  } else if (botoes.arrowLeft.pressed && ultimo === "ArrowLeft") {
    movimento.forEach((movimento) => {
      movimento.posicao.x += 3;
    });
  }
}
animacao();

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      botoes.arrowUp.pressed = true;
      ultimo = "ArrowUp";
      break;
    case "ArrowDown":
      botoes.arrowDown.pressed = true;
      ultimo = "ArrowDown";
      break;
    case "ArrowRight":
      botoes.arrowRight.pressed = true;
      ultimo = "ArrowRight";
      break;
    case "ArrowLeft":
      botoes.arrowLeft.pressed = true;
      ultimo = "ArrowLeft";
      break;
  }
  //console.log(botoes);
});

let ultimo; //isso é pra apertar duas ao mesmo tempo
window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowUp":
      botoes.arrowUp.pressed = false;
      break;
    case "ArrowDown":
      botoes.arrowDown.pressed = false;
      break;
    case "ArrowRight":
      botoes.arrowRight.pressed = false;
      break;
    case "ArrowLeft":
      botoes.arrowLeft.pressed = false;
      break;
  }
});
