//só está funcionando assim
let body = document.querySelector("body");
body.style.backgroundImage = "url(imagens/fundo-tp2.png)";
body.style.backgroundRepeat = "no-repeat";
body.style.backgroundPosition = "left bottom";
body.style.backgroundSize = "cover";
body.style.height = "100vh";

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
    siteFundo.classList.add("invisivel");
  });

  fechar[i].addEventListener("click", function () {
    botoes[i].container.classList.add("invisivel");
    siteFundo.classList.remove("invisivel");
  });
}

//configuraaçoes
let nomeEl = document.querySelector("#nome");
let nomeInput = document.querySelector("#nomeInput");

nomeInput.addEventListener("keyup", () => {
  nomeEl.innerHTML = nomeInput.value;
});

let personagens = document.querySelectorAll("#personagemZombie");
let imagemPrincipal = document.querySelector("#zombie");
let imagemPequena = document.querySelector("#perfilZombie");

for (let i = 0; i < personagens.length; i++) {
  personagens[i].addEventListener("click", function () {
    imagemPrincipal.src = personagens[i].value;
    imagemPequena.src = personagens[i].value;
  });
}

imagemPrincipal.addEventListener("click", function () {
  if ((imagemPrincipal.src = personagens[5].value))
    window.location.href = "Ovo.html";
});

//-----
let salvar = document.querySelector("#salvar");
let cor = document.querySelector("#cor");

salvar.addEventListener("click", function () {
  localStorage.setItem("dono", nomeInput.value);
  localStorage.setItem("cor", cor.value);
  localStorage.setItem("ImagemP", imagemPequena.src);
});

let carregar = document.querySelector("#carregar");

carregar.addEventListener("click", function () {
  nomeEl.innerHTML = localStorage.getItem("dono");
  let desenhos = localStorage.getItem("ImagemP");
  imagemPequena.src = desenhos;
  imagemPrincipal.src = desenhos;
});
