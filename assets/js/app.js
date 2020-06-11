// Variables
const listaTweets = document.getElementById("lista-tweets");

// Event Listeners

eventListeners();

function eventListeners() {
  //Cuando se envia el formulario
  document
    .querySelector("#formulario")
    .addEventListener("submit", agregarTweet);

  // Borrar Tweets
  listaTweets.addEventListener("click", borrarTweet);

  // Contenido cargado
  document.addEventListener("DOMContentLoaded", localStorageListo);
}

// Funciones

// Añadir tweet del formulario
function agregarTweet(e) {
  e.preventDefault();
  // leer el valor del textarea
  const tweet = document.getElementById("tweet").value;
  const fecha = document.getElementById("fecha").value;

  // crear boton de eliminar
  const botonBorrar = document.createElement("a");
  botonBorrar.classList = "borrar-tweet";
  botonBorrar.innerText = "X";

  // Crear elemento y añadirle el contenido a la lista
  const li = document.createElement("li");
  li.innerText = [tweet, fecha];
  // añade el botón de borrar al tweet
  li.appendChild(botonBorrar);
  // añade el tweet a la lista
  listaTweets.appendChild(li);

  // Añadir a Local Storage
  const notaFecha = [tweet, fecha];
  //   console.log(notaFecha);
  agregarTweetLocalStorage(notaFecha);
}
// Elimina el Tweet del DOM
function borrarTweet(e) {
  e.preventDefault();
  if (e.target.className === "borrar-tweet") {
    e.target.parentElement.remove();
    borrarTweetLocalStorage(e.target.parentElement.innerText);
    //     console.log(e.target.parentElement.innerText);
  }
  alert("Deseas eliminar la Nota?");
}
// Mostrar datos de LocalStorage en la lista
function localStorageListo() {
  let tweets;

  tweets = obtenerTweetsLocalStorage();

  tweets.forEach(function (notaFecha) {
    // crear boton de eliminar
    const botonBorrar = document.createElement("a");
    botonBorrar.classList = "borrar-tweet";
    botonBorrar.innerText = "X";

    // Crear elemento y añadirle el contenido a la lista
    const li = document.createElement("li");
    li.innerText = notaFecha;
    // añade el botón de borrar al tweet
    li.appendChild(botonBorrar);
    // añade el tweet a la lista
    listaTweets.appendChild(li);
  });
}

// Agrega tweet a local storage
function agregarTweetLocalStorage(notaFecha) {
  let tweets;
  tweets = obtenerTweetsLocalStorage();
  // Añadir el nuevo tweet
  tweets.push(notaFecha);
  // Convertir de string a arreglo para local storage
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

// Comprobar que haya elementos en localstorage, retorna un arreglo
function obtenerTweetsLocalStorage() {
  let tweets;
  // Revisamos los valoes de local storage
  if (localStorage.getItem("tweets") === null) {
    tweets = [];
  } else {
    tweets = JSON.parse(localStorage.getItem("tweets"));
  }
  return tweets;
}

// Eliminar tweet de Local Storage

function borrarTweetLocalStorage(notaFecha) {
  let tweets, tweetBorrar;

  tweetBorrar = notaFecha.substring(0, notaFecha.length - 1);

  tweets = obtenerTweetsLocalStorage();

  tweets.forEach(function (notaFecha, index) {
    if (tweetBorrar === notaFecha) {
      tweets.splice(index);
    }
  });
  localStorage.setItem("tweets", JSON.stringify(tweets));
}
