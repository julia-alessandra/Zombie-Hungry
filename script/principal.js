//só está funcionando assim
let body = document.querySelector("body")
body.style.backgroundImage = 'url(imagens/fundo-tp2.png)'
body.style.backgroundRepeat = 'no-repeat'
body.style.backgroundPosition = 'left bottom'
body.style.backgroundSize = 'cover'
body.style.height = '100vh'

//botoes de abrir e fechar
let botaoEl = document.querySelectorAll(".botao");
let fechar = document.querySelectorAll("#fechar");

let ajudaEl = document.querySelector("#ajuda");
let rankingEl = document.querySelector("#ranking");
let criadorasEl = document.querySelector("#criadoras");
let configuracoesEl = document.querySelector("#configurar");

let siteFundo = document.querySelector("main");

let botoes = [
  {
    container: ajudaEl,
  },
  {
    container: rankingEl,
  },
  {
    container: criadorasEl,
  },
  {
    container: configuracoesEl,
  },
];

for (let i = 0; i < botaoEl.length; i++) {
  botaoEl[i].addEventListener("click", function () {
    botoes[i].container.classList.remove("invisivel");
    siteFundo.classList.add("invisivel")
  });

  fechar[i].addEventListener("click", function(){
    botoes[i].container.classList.add("invisivel");
    siteFundo.classList.remove("invisivel")
  })
}

//configuraaçoes
let nomeEl = document.querySelector("#nome")
let nomeInput = document.querySelector("#nomeInput")

nomeInput.addEventListener("keyup", () => {
  nomeEl.innerHTML = nomeInput.value
})


let personagens = document.querySelectorAll("#personagemZombie")
let imagemPrincipal = document.querySelector("#zombie")
let imagemPequena = document.querySelector("#perfilZombie")

for (let i = 0; i < personagens.length; i++) {
  personagens[i].addEventListener("click", function () {
    imagemPrincipal.src = personagens[i].value
    imagemPequena.src = personagens[i].value
  })}

let classico = document.querySelector("#classico")
let among = document.querySelector("#among")
let cefet = document.querySelector("#cefet")
let hasan = document.querySelector("#hasan")
let peralta = document.querySelector("#peralta")
let taylor = document.querySelector("#taylor")

imagemPrincipal.addEventListener("click", function () {
    if(imagemPrincipal.src = personagens[5].value)
  window.location.href = "Ovo.html";
})