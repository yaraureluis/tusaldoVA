// Para generar clientes
function img_clientes() {
  for (let i = 1; i <= 8; i++) {
    $("#capturas_clientes").append(`      
      <picture>
      <source media="(max-width:768px)" srcset="../assets/imagenes/capturas${i}_180.jpg" />
      <img src="../assets/imagenes/capturas${i}.jpg" alt="comentarios-ws" />
    </picture>
  `);
  }
}

$(function () {
  img_clientes();
});
