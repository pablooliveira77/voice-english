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

const audio_moeda = new Audio("/audio/moeda.mp3");
const audio_errou = new Audio("/audio/errou.mp3");

function escolherCorAleatoria() {
    var corAleatoria = Math.floor(Math.random() * enginer.cores.length);
    const id_cor = document.getElementById("cor-aleatoria");
    id_cor.innerHTML = enginer.cores[corAleatoria];
    return enginer.cores[corAleatoria];
}

function aplicarCor() {
    const cor_caixa = document.getElementById("cor-caixa");
    var corAleatoria = escolherCorAleatoria();
    cor_caixa.style.backgroundColor = corAleatoria
    cor_caixa.style.backgroundImage = "url('/img/caixa-fechada.png')";
    cor_caixa.style.backgroundSize = "100%";
    return corAleatoria;
}

function atualizaPontuacao(valor) {
    var pontuacao = document.getElementById("pontuacao-atual");
    enginer.moedas += valor;

    if (valor > 0) {
        audio_moeda.play();
    } else {
        audio_errou.play();
    }
    pontuacao.innerHTML = enginer.moedas;
    return "Pontuação atualizada!"
}

var btnResponder = document.getElementById("btn-responder");
var transcrever = ""

if (window.SpeechRecognition || window.webkitSpeechRecognition) {
    var SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    var gravador = new SpeechAPI();
    gravador.continuous = false;
    gravador.lang = "en-US";

    gravador.onstart = function () {
        btnResponder.innerHTML = "Estou ouvindo...";
        btnResponder.style.backgroundColor = "white";
        btnResponder.style.color = "black";
    }

    gravador.onend = function () {
        btnResponder.innerHTML = "Responder";
        btnResponder.style.backgroundColor = "transparent";
        btnResponder.style.color = "white";
    }

    gravador.onresult = function (evento) {
        transcrever = evento.results[0][0].transcript.toUpperCase();
        var resposta = document.getElementById("cor-aleatoria").innerHTML.toUpperCase();

        console.log("Cor escolhida: ",resposta);
        console.log("O que ouvi: ",transcrever);
        if (transcrever == resposta) {
            atualizaPontuacao(1);
            aplicarCor(escolherCorAleatoria());
            addTexto(``);
            aplicarCor(escolherCorAleatoria());
        } else {
            atualizaPontuacao(-1);
            addTexto(`O que ouvi ${transcrever}!`);
        }
    }

} else {
    alert("Seu navegador não suporta a API de Reconhecimento de voz");
}

function addTexto(texto) {
    var div_resposta = document.getElementById("resposta");
    div_resposta.innerHTML = texto;
}

aplicarCor(escolherCorAleatoria())

btnResponder.addEventListener("click", function () {
    gravador.start();
});
