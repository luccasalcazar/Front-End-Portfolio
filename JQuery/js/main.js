var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(function(){
   atualizaTamanhoFrase();
   inicializaContadores();
   inicializaCronometro();
   inicializaMarcadores();
   $("#botao-reiniciar").click(reiniciaJogo);
   atualizaPlacar();

   $("#usuarios").selectize({
      create: true,
      sortField: 'text'
   });

   $(".tooltip").tooltipster({
      trigger: "custom"
   });
});

function atualizaTamanhoFrase() {
   var frase = $(".frase").text();
   var numeroPalavras = frase.split(" ").length;
   var tamanhoFrase = $("#tamanho-frase");
   tamanhoFrase.text(numeroPalavras);
}

function atualizaTempoInicial(tempo) {
   tempoInicial = tempo;
   $("#tempo-digitacao").text(tempo);
}

function inicializaContadores() {
   campo.on("input", function(){
      var conteudo = campo.val();
      var quantidadePalavras = conteudo.split(/\S+/).length - 1;
      $("#contador-palavras").text(quantidadePalavras);

      var quantidadeCaracteres = conteudo.length;
      $("#contador-caracteres").text(quantidadeCaracteres)
   });
}

function inicializaCronometro() {
   campo.one("focus", function(){
      var tempoRestante = $("#tempo-digitacao").text();
      var cronometroID = setInterval(function(){
         tempoRestante--;
         $("#tempo-digitacao").text(tempoRestante);
         if(tempoRestante < 1) {
            clearInterval(cronometroID);
            finalizaJogo();
         }
      },1000);
   });
}

function finalizaJogo(){
   campo.attr("disabled", true);
   campo.toggleClass("campo-desativado");
   inserePlacar();
}

function inicializaMarcadores() {
   campo.on("input", function(){
      var frase = $(".frase").text();

         var digitado = campo.val();
         var comparavel = frase.substr(0, digitado.length);

         if(digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha")
         } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
         }

   });
}

function reiniciaJogo() {
   campo.attr("disabled", false);
   campo.val("");
   $("#contador-palavras").text("0");
   $("#contador-caracteres").text("0");
   $("#tempo-digitacao").text(tempoInicial);
   inicializaCronometro();
   campo.toggleClass("campo-desativado");
   campo.removeClass("borda-vermelha");
   campo.removeClass("borda-verde");
}

function inserePlacar(){
   var corpoTabela = $(".placar").find("tbody");
   var usuario = "Lucas";
   var numPalavras = $("#contador-palavras").text();
   var linha = novaLinha(usuario, numPalavras);
   linha.find(".botao-remover").click(removeLinha);

   corpoTabela.prepend(linha);
}

function novaLinha(usuario, palavras) {
   var linha = $("<tr>");
   var colunaUsuario = $("<td>").text(usuario);
   var colunaPalavras = $("<td>").text(palavras);
   var colunaRemover = $("<td>");
   var link = $("<a>").addClass("botao-remover").attr("href", "#");
   var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

   link.append(icone);

   colunaRemover.append(link);

   linha.append(colunaUsuario);
   linha.append(colunaPalavras);
   linha.append(colunaRemover);

   return linha;
}

function removeLinha() {
      event.preventDefault();
      $(this).parent().parent().remove();
}
