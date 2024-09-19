const calculadora = document.querySelector("div#calculadora")
const visor = document.querySelector("div.visor")
const resultados = document.querySelector("#resultados")

window.addEventListener("load", function(){
    const itens = retornarItemDoStorage();
    itens.forEach(criarItemResultado)
})


calculadora.addEventListener("click", function(event){
    if(event.target.classList.contains("btn")) {
        if(event.target.textContent === "C"){
            visor.textContent = " "

        } else if (event.target.textContent === "="){
            const expressao = visor.textContent;
            const resultado = eval(expressao);

            const testo = expressao + " = " + resultado;

            gravarItemNoStorage(testo)
            criarItemResultado(testo);

            visor.textContent = resultado;
        } else {
            if(Number(event.target.textContent) >= 0){
                visor.textContent += event.target.textContent;
            } else {
                visor.textContent += " " + event.target.textContent + " "
            }
        }
    }
});

function criarItemResultado(texto){
    const p = document.createElement("p");
    p.textContent = texto;
    resultados.append(p);
}

function gravarItemNoStorage(texto){
    const item = retornarItemDoStorage();
    item.push(texto);

    localStorage.setItem("resultado", JSON.stringify(item));
}

function retornarItemDoStorage(){
    return JSON.parse(localStorage.getItem("resultado")) || [];
}