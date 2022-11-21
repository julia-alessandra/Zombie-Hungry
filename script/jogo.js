const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

//imagem de fundo
c.fillStyle = "white";
c.fillRect(0, 0, canvas.width, canvas.height);

const imagem = new Image();
imagem.src = "./jogo/map.png";

const jogador = new Image();
jogador.src = "./jogo/playerDown.png";


//posicao do fundo
class sprite {
  constructor({ posicao, imagem }) {
    this.posicao = posicao;
    this.imagem = imagem;
  }
  draw() {
    c.drawImage(this.imagem, this.posicao.x, this.posicao.y);
  }
}

const fundo = new sprite({
  posicao: {
    x: -200,
    y: -350,
  },
  imagem: imagem,
});



//personagem


//personagem andar se botao for pressionado

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

let ultimo //isso é pra apertar duas ao mesmo tempo

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      botoes.arrowUp.pressed = true
      ultimo = "ArrowUp"
      break
    case "ArrowDown":
      botoes.arrowDown.pressed = true
      ultimo = "ArrowDown"
      break
    case "ArrowRight":
      botoes.arrowRight.pressed = true
      ultimo = "ArrowRight"
      break
    case "ArrowLeft":
      botoes.arrowLeft.pressed = true
      ultimo = "ArrowLeft"
    break
  }
  console.log(botoes)
});

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

  function animacao() {
    window.requestAnimationFrame(animacao);
    fundo.draw();
    c.drawImage(
      jogador,
      0,
      0,
      jogador.width / 4,
      jogador.height,
      canvas.width / 2,
      canvas.height / 2,
      jogador.width / 4,
      jogador.height
    );
  
    if (botoes.arrowDown.pressed && ultimo === "ArrowDown") fundo.posicao.y -= 3;
    else if (botoes.arrowUp.pressed && ultimo === "ArrowUp") fundo.posicao.y += 3;
    else if (botoes.arrowRight.pressed && ultimo === "ArrowRight") fundo.posicao.x -= 3;
    else if(botoes.arrowLeft.pressed && ultimo === "ArrowLeft") fundo.posicao.x += 3;
  }
  animacao();