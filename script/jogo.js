//Oi hasan, espero que ache esse codigo legal, nos finalmente aprendemos(de verdade) a mexer no canvas e é bem divertido(e assustador)
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

//configuraçoes zombie
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
        //lugar onde ele vai estar
        x: canvas.width / 2,
        y: canvas.height / 2 + 200,
      };
    };
  }
  draw() {
    //desenhar na tela
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
      //para ele andar, nos mudamos a quantidade de velocidade
      this.posicao.x += this.velocidade.x;
    }
  }
}

class Projectile {
  //particula que atira
  constructor({ posicao, velocidade }) {
    this.posicao = posicao
    this.velocidade = velocidade
    this.radius = 3
  }

  draw() {
    c.beginPath() //inicia um novo desenho
    c.arc(this.posicao.x, this.posicao.y, this.radius, 0, Math.PI * 2) //faz um arco circular no desenho do cerebro
    c.fillStyle = 'red'
    c.fill()
    c.closePath()//fecha o desenho
  }

  up() {
    //unidade popular
    //brincadeira, é updade mesmo
    this.draw()
    this.posicao.x += this.velocidade.x
    this.posicao.y += this.velocidade.y
  }
}

class comida {
  //apenas uma imagem!!!!
  constructor({ posicao }) {
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
        x: posicao.x,
        y: posicao.y,
      };
    };
  }
  draw() {
    if (this.imagem)
      c.drawImage(
        this.imagem,
        this.posicao.x,
        this.posicao.y,
        this.width / 10,
        this.height / 10
      );
  }

  update({ velocidade }) {
    if (this.imagem) {
      this.draw();
      this.posicao.x += velocidade.x;
      this.posicao.y += velocidade.y;
    }
  }
}

class Conjunto {
  //Conjunto de todas as imagens juntas
  constructor() {
    this.posicao = {
      x: 0,
      y: 0
    }
    this.velocidade = {
      x: 3,
      y: 0
    }
    this.almoco = []

    //gera um numero aleatorio de colunas e linhas
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    }

    let numeroColunas = getRandomInt(5, 8);
    let numeroLinhas = getRandomInt(4, 8);

    this.width = numeroColunas * 90

    for (let i = 0; i < numeroLinhas; i++) {
      for (let j = 0; j < numeroColunas; j++)
        this.almoco.push(new comida({ posicao: { x: i * 45, y: j * 40 } }))
    }
    console.log(this.almoco)
  }
  update() {
    this.posicao.x += this.velocidade.x
    this.posicao.y += this.velocidade.y

    this.velocidade.y = 0

    if (this.posicao.x + this.width >= canvas.width || this.posicao.x <= 0) {
      this.velocidade.x = -this.velocidade.x
      this.velocidade.y = 30
    }
  }
}

const zombie = new jogador();
const projectiles = []
const conjuntos = []

//andar
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

let frames = 0
let intervalo = Math.floor((Math.random() * 500) + 500)

function animacao() {
  requestAnimationFrame(animacao);
  c.fillStyle = 'green'//cor de fundo
  c.fillRect(0, 0, canvas.width, canvas.height)
  zombie.update();

  projectiles.forEach(projectile => {
    projectile.up()
  })

  conjuntos.forEach((conjunto) => {
    conjunto.update()
    conjunto.almoco.forEach((cerebro, i) => {
      cerebro.update({ velocidade: conjunto.velocidade })

      projectiles.forEach((projectile, j) => {
        if(
          projectile.posicao.y - projectile.radius <= cerebro.posicao.y + cerebro.height &&
          projectile.posicao.x + projectile.radius >= cerebro.posicao.x &&
          projectile.posicao.x - projectile.radius <= cerebro.posicao.x &&
          projectile.posicao.y + projectile.radius <= cerebro.posicao.y){
          setTimeout(() => {
            conjunto.almoco.splice(i, 1)
            projectiles.splice(j, 1)
          },0)
        }
      })
    })
  })

  //andar
  if (botoes.arrowLeft.pressed && zombie.posicao.x >= 0) {
    zombie.velocidade.x = -5
  }
  else if (botoes.arrowRight.pressed && zombie.posicao.x + zombie.width <= canvas.width) {
    zombie.velocidade.x = 5
  }
  else {
    zombie.velocidade.x = 0
  }

  if (frames % intervalo === 0) {
    conjuntos.push(new Conjunto())
  }
  frames++

}
animacao();



//evento de andar
addEventListener("keydown", ({ key }) => {
  switch (key) {
    case " ":
      projectiles.push(new Projectile({
        posicao: {
          x: zombie.posicao.x + 50,
          y: zombie.posicao.y - 10
        },
        velocidade: {
          x: 0,
          y: -5
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

addEventListener("keyup", ({ key }) => {
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
