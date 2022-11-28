const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

const batalhaMap = [];
for (let i = 0; i < batalhas.length; i += 70) {
  batalhaMap.push(batalhas.slice(i, 70 + i));
}

//console.log(batalhaMap);

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

const off = {
  x: -1,
  y: -70,
};

batalhaMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 27989)
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
  constructor({ posicao, velocidade, imagem }) {
    this.posicao = posicao;
    this.imagem = imagem;
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

const movimento = [fundo, ...zonaBatalha];

function colisaoRetangulo({ retangulo1, retangulo2 }) {
  return (
    retangulo1.posicao.x + retangulo1.width >= retangulo2.posicao.x &&
    retangulo1.posicao.x <= retangulo2.posicao.x + retangulo2.width &&
    retangulo1.posicao.y <= retangulo2.posicao.y + retangulo1.height &&
    retangulo1.posicao.y + retangulo1.height >= retangulo2.posicao.y
  );
}
//as barreiras estap seguindo o personagem, n sei arrumar
function animacao() {
  window.requestAnimationFrame(animacao);
  fundo.draw();
  //teste.draw()
  c.drawImage(
    jogador,
    0,
    0,
    jogador.width / 4,
    jogador.height,
    canvas.width / 2,
    canvas.height / 2,
    //não sei se isso é pixel, se for eu me mato
    30,
    40
  );


  for(let i=0; i<zonaBatalha.length; i++){
    const batalhaZona = zonaBatalha(i)
    if(
      colisaoRetangulo({
        retangulo1:jogador,
        retangulo2: batalhaZona
      })
    ){
      movimento = false
      break
    }
  }

  zonaBatalha.forEach((zonaBatalha) => {
    zonaBatalha.draw();
  });
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
