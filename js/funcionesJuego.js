// Selección de elementos del DOM
const marco = document.getElementById("marco");
const botones = document.querySelectorAll(".boton-juego");
const pregunta = document.getElementById("pregunta");
const conocimiento = document.getElementById("conocimiento");
const mensaje = document.getElementById("mensaje");

let preguntas = [
    "¿Quién pintó la Mona Lisa?",
    "¿En qué año cayó el Imperio Romano de Occidente?",
    "¿Qué es la Gran Muralla China?",
    "¿Qué elemento químico tiene el símbolo 'O'?",
    "¿Quién escribió *Don Quijote de la Mancha*?",
    "¿Cuál es el continente más grande del mundo?",
    "¿Qué instrumento musical tiene teclas y cuerdas?",
    "¿En qué país nació el famoso físico Albert Einstein?",
    "¿Cómo se llama la primera película de la saga de Star Wars?",
    "¿Cuál es la capital de Japón?"
];

let opciones = [
    ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"],
    ["476 d.C.", "1492 d.C.", "1066 d.C.", "300 d.C."],
    ["Un muro de defensa", "Una cadena montañosa", "Un edificio histórico", "Una carretera antigua"],
    ["Oxígeno", "Osmio", "Oro", "Ozono"],
    ["Miguel de Cervantes", "Gabriel García Márquez", "Mario Vargas Llosa", "Julio Cortázar"],
    ["Asia", "Europa", "África", "América"],
    ["Piano", "Guitarra", "Flauta", "Trompeta"],
    ["Alemania", "Estados Unidos", "Francia", "Suiza"],
    ["Una Nueva Esperanza", "El Imperio Contraataca", "La Amenaza Fantasma", "El Retorno del Jedi"],
    ["Tokio", "Beijing", "Seúl", "Bangkok"]
];

// Variables de control del juego
let numeroCorrecto = 0;        // Índice de la respuesta correcta (siempre 0 en este caso)
let intervaloMovimiento;       // Temporizador para mover botones

// Función que mueve los botones a posiciones aleatorias dentro del marco
function moverBotones() {
  const marcoWidth = marco.clientWidth;
  const marcoHeight = marco.clientHeight;

  // Limpiar el mensaje una vez antes de mover todos los botones
  mensaje.textContent = "";

  botones.forEach(boton => {
    // Calcula una posición aleatoria dentro del marco utilizando el ancho y alto reales del botón
    const x = Math.random() * (marcoWidth - boton.offsetWidth);
    const y = Math.random() * (marcoHeight - boton.offsetHeight);
    // Aplica la nueva posición
    boton.style.left = `${x}px`;
    boton.style.top = `${y}px`;
  });
}

// Genera un número aleatorio entre 0 y (nro - 1) para seleccionar la pregunta
function generarNumero(nro) {
  numeroCorrecto = Math.floor(Math.random() * nro);
  // console.log("Número correcto:", numeroCorrecto); // Para depuración
  return numeroCorrecto;
}

function iniciarJuego() {
    mensaje.textContent = "";
    let nro1 = generarNumero(6);  // Cambié el valor a 6 porque hay 6 preguntas
    pregunta.textContent = `Pregunta: ${preguntas[nro1]}`;
    cargarOpciones(nro1);
    moverBotones();
    intervaloMovimiento = setInterval(moverBotones, 6000);
}
function cargarOpciones(nroPregunta) {
    botones.forEach((boton, index) => {
        boton.innerHTML = opciones[nroPregunta][index];
        boton.setAttribute("data-num", index);  // Establecemos un atributo data-num para saber qué opción se selecciona
    });
}
// Inicia el juego: muestra la pregunta, carga las opciones, mueve los botones y activa el temporizador
/*function iniciarJuego() {
  mensaje.textContent = "";
  // Genera una pregunta aleatoria entre 0 y 9 (ya que tenemos 10 preguntas)
  let nro1 = generarNumero(9);
  // Se muestra el número de pregunta (se suma 1 para una numeración natural)
  pregunta.textContent = `Pregunta ${nro1 + 1}: ${preguntas[nro1]}`;
  
  cargarOpciones(nro1);
  moverBotones();
  intervaloMovimiento = setInterval(moverBotones, 4000); // Mueve los botones cada 2 segundos
}*/


// Carga las opciones en los botones correspondientes
/*function cargarOpciones(nroPregunta) {
  document.getElementById("b1").innerHTML = opciones[nroPregunta][0];
  document.getElementById("b2").innerHTML = opciones[nroPregunta][1];
  document.getElementById("b3").innerHTML = opciones[nroPregunta][2];
  document.getElementById("b4").innerHTML = opciones[nroPregunta][3];
}
*/
// Detiene el movimiento de botones y limpia la pregunta
function terminarJuego() {
  clearInterval(intervaloMovimiento);
  pregunta.textContent = "";
}

// Evento al hacer clic en "Iniciar Juego"
document.getElementById("iniciarBtn").addEventListener("click", iniciarJuego);

// Evento al hacer clic en "Terminar"
document.getElementById("terminarBtn").addEventListener("click", () => {
  mensaje.textContent = "Juego terminado.";
  terminarJuego();
});

// Evento para manejar clics en cada botón de opción
botones.forEach(boton => {
  boton.addEventListener("click", () => {
    // Se asume que el atributo data-num contiene el índice de la opción (0 para la correcta)
    const num = parseInt(boton.getAttribute("data-num"));
    // Si la opción es la correcta (índice 0)
    if (num === 0) {
      mensaje.textContent = "¡Correcto!";
      terminarJuego(); // Detiene el juego
      setTimeout(iniciarJuego, 600); // Reinicia el juego después de 3 segundos
    } else {
      mensaje.textContent = "¡Intenta de nuevo!";
    }
  });
});
