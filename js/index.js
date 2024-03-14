// Importando o arquivo color.js
var enginer = {
   cores: ["green", "blue", "red", "yellow", "purple", "orange", "pink"],
   codHexadecimal: [
      "#008000",
      "#0000FF",
      "#FF0000",
      "#FFFF00",
      "#800080",
      "#FFA500",
      "#FFC0CB",
   ],
   moedas: 0,
};


// Escolher uma cor aleatória e colocar na tag com id "cor-aleatoria"
function escolherCorAleatoria() {
    var corAleatoria = Math.floor(Math.random() * enginer.cores.length);
    const id_cor = document.getElementById("cor-aleatoria");
    id_cor.innerHTML = enginer.cores[corAleatoria];
    return enginer.cores[corAleatoria];
}

// Funcão que vai pegar a cor escolhida e aplicar na caixa de cor
function aplicarCor() {
    const cor_caixa = document.getElementById("cor-caixa");
    //chamar a função escolherCorAleatoria
    var corAleatoria = escolherCorAleatoria();
    cor_caixa.style.backgroundColor = corAleatoria
    cor_caixa.style.backgroundImage = "url('/img/caixa-fechada.png')";
    cor_caixa.style.backgroundSize = "100%";
    return corAleatoria;
}

