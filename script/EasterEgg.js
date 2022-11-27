//esse vai ser o js mais ridiculo que eu já fiz na minha vida

//audios
const lover = new Audio("audios/Paper-Rings.mp3");
const fearless = new Audio("audios/Love-Story.mp3");
const folklore = new Audio("audios/august.mp3");
const reputation = new Audio("audios/Dont-Blame-Me.mp3");

let inicio = document.querySelectorAll("#escolher");
let botoes = document.querySelector("#simnao");
let primeiraPergunta = document.querySelector("#primeira");
let segundaPergunta = document.querySelector("#segunda");
let terceiraPergunta = document.querySelector("#terceira");
let quartaPergunta = document.querySelector("#quarta");
let quintaPergunta = document.querySelector("#quinta");

//começo
for (let i = 0; i < inicio.length; i++)
  inicio[i].addEventListener("click", function () {
    if (i === 0) {
      primeiraPergunta.classList.remove("invisivel");
      botoes.classList.add("invisivel");
    } else window.location.href = "index.html";
  });

let perguntasPrimeira = document.querySelectorAll("#primeiraEscolha");
let perguntasSegunda = document.querySelectorAll("#segundaEscolha");
let perguntasTerceira = document.querySelectorAll("#terceiraEscolha");
let perguntasQuarta = document.querySelectorAll("#quartaEscolha");
let perguntasQuinta = document.querySelectorAll("#quintaEscolha");

//perguntas
for (let i = 0; i < perguntasPrimeira.length; i++) {
  perguntasPrimeira[i].addEventListener("click", function () {
    primeiraPergunta.classList.add("invisivel");
    segundaPergunta.classList.remove("invisivel");
  });

  perguntasSegunda[i].addEventListener("click", function () {
    segundaPergunta.classList.add("invisivel");
    terceiraPergunta.classList.remove("invisivel");
  });

  perguntasTerceira[i].addEventListener("click", function () {
    terceiraPergunta.classList.add("invisivel");
    quartaPergunta.classList.remove("invisivel");
  });

  perguntasQuarta[i].addEventListener("click", function () {
    quartaPergunta.classList.add("invisivel");
    quintaPergunta.classList.remove("invisivel");
  });

  perguntasQuinta[i].addEventListener("click", function () {
    quintaPergunta.classList.add("invisivel");
    respostas[numeroAleatorio].texto.classList.remove("invisivel");
    fim.classList.remove("invisivel");
  });
}

let resposta1 = document.querySelector("#album1");
let resposta2 = document.querySelector("#album2");
let resposta3 = document.querySelector("#album3");
let resposta4 = document.querySelector("#album4");
let fim = document.querySelector("#fim");

let respostas = [
  {
    texto: resposta1,
    num: 0,
    musicaSorteada: reputation,
  },
  {
    texto: resposta2,
    num: 1,
    musicaSorteada: fearless,
  },
  {
    texto: resposta3,
    num: 2,
    musicaSorteada: lover,
  },
  {
    texto: resposta4,
    num: 3,
    musicaSorteada: folklore,
  },
];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

let numeroAleatorio = getRandomInt(0, 4);

console.log(numeroAleatorio);
console.log(respostas[numeroAleatorio].texto);

//-------
let voltar = document.querySelector("#voltar");
let escutar = document.querySelector("#ouvir");
let albumSalvo = respostas[numeroAleatorio].num;

voltar.addEventListener("click", function () {
  window.location.href = "index.html";
});

ouvir.addEventListener("click", function () {
  respostas[albumSalvo].musicaSorteada.play();
});
