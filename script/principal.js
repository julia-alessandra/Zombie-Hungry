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