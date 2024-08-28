const d = document;
const textArea = d.querySelector(".form__input");
const resultadoTitulo = d.querySelector(".result__title");
const resultadoTexto = d.querySelector(".result__text");
const botonEncriptar = d.querySelectorAll(".form__btn")[0];
const botonDesencriptar = d.querySelectorAll(".form__btn")[1];
const botonCopiar = d.querySelector(".result__btn");

const llaves = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"],
];

// Función para encriptar
function encriptarTexto(texto) {
    let textoEncriptado = "";
    for (let i = 0; i < texto.length; i++) {
        let letra = texto[i];
        let encriptada = letra;
        for (let j = 0; j < llaves.length; j++) {
            if (letra === llaves[j][0]) {
                encriptada = llaves[j][1]; // Reemplaza la letra por el texto encriptado
                break; // Termina el bucle cuando se encuentra la correspondiente letra
            }
        }
        textoEncriptado += encriptada;
    }
    return textoEncriptado;
}

// Función para desencriptar
function desencriptarTexto(texto) {
    let textoDesencriptado = texto;
    for (let i = 0; i < llaves.length; i++) {
        let regex = new RegExp(llaves[i][1], 'g');
        textoDesencriptado = textoDesencriptado.replace(regex, llaves[i][0]);
    }
    return textoDesencriptado;
}

// Ocultar elementos
textArea.addEventListener("input", (e) => {
    resultadoTitulo.textContent = "Capturando Texto";
    resultadoTexto.textContent = "";
});

// Función del botón encriptar
botonEncriptar.addEventListener("click", (e) => {
    e.preventDefault();
    let texto = textArea.value.toLowerCase();
    let textoEncriptado = encriptarTexto(texto);
    resultadoTexto.textContent = textoEncriptado;
    botonCopiar.classList.remove("hidden");
    resultadoTitulo.textContent = "El resultado es:";
});

// Función del botón desencriptar
botonDesencriptar.addEventListener("click", (e) => {
    e.preventDefault();
    let texto = textArea.value.toLowerCase();
    let textoDesencriptado = desencriptarTexto(texto);
    resultadoTexto.textContent = textoDesencriptado;
    resultadoTitulo.textContent = "El resultado es:";
    botonCopiar.classList.remove("hidden");
});

botonCopiar.addEventListener('click', () => {
    let textoCopiado = resultadoTexto.textContent;
    navigator.clipboard.writeText(textoCopiado).then(() => {
    resultadoTitulo.textContent = "El texto se copió";
    botonCopiar.classList.add("hidden");
    resultadoTexto.textContent = "";
    });
});