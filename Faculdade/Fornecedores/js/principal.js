mostrarTabela();

function mostrarTabela() {
   var botao = document.querySelector("#botao");

   botao.addEventListener("click", function(event){
      event.preventDefault();

      var tabela = document.querySelector(".table");
      tabela.classList.remove("table");
      tabela.classList.add("table-visivel");

   });
}
