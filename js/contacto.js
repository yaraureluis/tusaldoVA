// formulario de contacto
$("#contacto").submit(function (event) {
  event.preventDefault();
  Swal.fire({
    position: "top-center",
    icon: "success",
    title: "Su consulta ha sido enviada exitosamente!",
    text: "Estaremos en contacto en breve. ¡Gracias por preferir Tu Saldo VA!",
    showConfirmButton: false,
    timer: 4500,
    backdrop: "#03081885",
  });
  document.getElementById("contacto").reset();
});
