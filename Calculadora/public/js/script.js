function adicionar_parametro(parametro) {
    document.querySelector("[name='tela']").value += parametro;
}

function apagar() {
    document.querySelector("[name='tela']").value = "";
}

function adicionar_ponto() {
    if (document.querySelector("[name='tela']").value.indexOf(".") == -1) {
        document.querySelector("[name='tela']").value += ".";
    }
}

$("#cal").click(function () {
    $.get("/calcular",
        { tela: document.querySelector("[name='tela']").value },
        function (data) {

            const expre = document.querySelector("[name='tela']").value;

            if (data === "expressão incorreta") {

                document.querySelector("[name='tela']").value = "";
            }
            else {
                document.querySelector("[name='tela']").value = data;
            }

            document.querySelector("[id='expressao-resul']").innerHTML += `<h1>${expre} = ${data}</h1>`;

        });
});
