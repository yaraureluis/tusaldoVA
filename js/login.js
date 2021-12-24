// referencia al formulario de ingreso del usuario
const formulario_login = document.getElementById("login");
const cerrar_sesion = document.getElementById("cerrar");

$("#login").submit(function (event) {
  event.preventDefault();
  localStorage.setItem("Nombre", formulario_login.usuario.value);
  login();

  formulario_login.reset();
});

function login() {
  formulario_login.hidden = true;
  document.getElementById(`saludo_usuario`).hidden = false;
  cerrar_sesion.hidden = false;
  $(`#saludo_usuario`).text(`¡Bienvenido ${localStorage.getItem("Nombre")}!`);
}

if (localStorage.getItem("Nombre")) login();

$("#cerrar").click(function () {
  localStorage.clear();
  location.reload();
});
