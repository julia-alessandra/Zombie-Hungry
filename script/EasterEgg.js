//esse vai ser o js mais ridiculo que eu já fiz na minha vida

let inicio = document.querySelectorAll("#escolher");
let botoes = document.querySelector("#simnao")
let primeiraPergunta = document.querySelector("#primeira");
let segundaPergunta = document.querySelector("#segunda");
let terceiraPergunta = document.querySelector("#terceira");
let quartaPergunta = document.querySelector("#quarta");
let quintaPergunta = document.querySelector("#quinta");

//começo
for (let i = 0; i < inicio.length; i++)
  inicio[i].addEventListener("click", function () {
    if (i === 0){
        primeiraPergunta.classList.remove("invisivel")
        botoes.classList.add("invisivel")
}
    else window.location.href = "index.html"
  });

let perguntasPrimeira = document.querySelectorAll("#primeiraEscolha");
let perguntasSegunda = document.querySelectorAll("#segundaEscolha");
let perguntasTerceira = document.querySelectorAll("#terceiraEscolha");
let perguntasQuarta = document.querySelectorAll("#quartaEscolha");
let perguntasQuinta = document.querySelectorAll("#quintaEscolha");

//perguntas
for (let i = 0; i < perguntasPrimeira.length; i++){
  perguntasPrimeira[i].addEventListener("click", function () {
    primeiraPergunta.classList.add("invisivel");
    segundaPergunta.classList.remove("invisivel");
  })

  perguntasSegunda[i].addEventListener("click", function () {
    segundaPergunta.classList.add("invisivel");
    terceiraPergunta.classList.remove("invisivel");
  })

  perguntasTerceira[i].addEventListener("click", function () {
    terceiraPergunta.classList.add("invisivel");
    quartaPergunta.classList.remove("invisivel");
  })
  
  perguntasQuarta[i].addEventListener("click", function () {
    quartaPergunta.classList.add("invisivel");
    quintaPergunta.classList.remove("invisivel");
  })

  perguntasQuinta[i].addEventListener("click", function () {
    quintaPergunta.classList.add("invisivel");
    respostas[numeroAleatorio].texto.classList.remove("invisivel");
  })
}
let resposta1 = document.querySelector("#album1")
let resposta2 = document.querySelector("#album2")
let resposta3 = document.querySelector("#album3")

let respostas = [
    {
        texto: resposta1
    },
    {
        texto: resposta2
    },
    {
        texto: resposta3
    }
]

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

let numeroAleatorio = getRandomInt(0, 4)

console.log(numeroAleatorio)
console.log(respostas[numeroAleatorio].texto)

