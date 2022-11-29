const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

class jogador {
  constructor() {
    this.velocidade = {
      x: 0,
      y: 0
    };


    const imagem = new Image();
    imagem.src = "./jogo/playerDown.png";
    imagem.onload = () => {
      this.imagem = imagem;
      this.width = imagem.width;
      this.height = imagem.height;
      this.posicao = {
        x: canvas.width / 2,
        y: canvas.height / 2 + 200,
      };
    };
  }
  draw() {
    if (this.imagem)
      c.drawImage(
        this.imagem,
        this.posicao.x,
        this.posicao.y,
        this.width,
        this.height
      );
  }

  update() {
    if (this.imagem) {
      this.draw();
      this.posicao.x += this.velocidade.x;
    }
  }
}

class Projectile {
  constructor({posicao, velocidade}){
    this.posicao = posicao
    this.velocidade = velocidade
    this.radius = 3
  }

  draw(){
    c.beginPath()
    c.arc(this.posicao.x, this.posicao.y, this.radius, 0, Math.PI*2)
    c.fillStyle = 'black'
    c.fill()
    c.closePath()
  }

  up(){
    this.draw()
    this.posicao.x += this.velocidade.x
    this.posicao.y += this.velocidade.y
  }
}

class comida {
  constructor() {
    this.velocidade = {
      x: 0,
      y: 0
    };


    const imagem = new Image();
    imagem.src = "./jogo/cerebro.png";
    imagem.onload = () => {
      this.imagem = imagem;
      this.width = imagem.width;
      this.height = imagem.height;
      this.posicao = {
        x: canvas.width / 2,
        y: canvas.height /2 - 300,
      };
    };
  }
  draw() {
    if (this.imagem)
      c.drawImage(
        this.imagem,
        this.posicao.x,
        this.posicao.y,
        this.width /6,
        this.height/6
      );
  }

  update() {
    if (this.imagem) {
      this.draw();
      this.posicao.x += this.velocidade.x;
      this.posicao.y += this.velocidade.y;
    }
  }
}

const zombie = new jogador();
const projectiles = []
const cerebro = new comida()

const botoes = {
  arrowLeft: {
    pressed: false,
  },
  arrowRight: {
    pressed: false,
  },
  space: {
    pressed: false,
  }
};

function animacao() {
  requestAnimationFrame(animacao);
  c.fillStyle = 'green'
  c.fillRect(0, 0, canvas.width, canvas.height)
  cerebro.update();
  zombie.update();
  projectiles.forEach(projectile => {
    projectile.up()
  })
  

if(botoes.arrowLeft.pressed && zombie.posicao.x >= 0){
  zombie.velocidade.x = -5
}
else if(botoes.arrowRight.pressed && zombie.posicao.x + zombie.width <= canvas.width){
  zombie.velocidade.x = 5
}
else{
  zombie.velocidade.x = 0
}

}
animacao();

addEventListener("keydown", ({key}) => {
  switch (key) {
    case " ":
      projectiles.push(new Projectile({
        posicao:{
          x:zombie.posicao.x +50,
          y:zombie.posicao.y -10
        },
        velocidade:{
          x:0,
          y:-5
        }
      }))
      break;
    case "ArrowRight":
      botoes.arrowRight.pressed = true
      break;
    case "ArrowLeft":
      botoes.arrowLeft.pressed = true
      break;
  }
});

addEventListener("keyup", ({key}) => {
  switch (key) {
    case " ":
      console.log("aaaa")
      break;
    case "ArrowRight":
      botoes.arrowRight.pressed = false
      break;
    case "ArrowLeft":
      botoes.arrowLeft.pressed = false
      break;
  }
});
