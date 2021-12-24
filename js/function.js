// referencia al formulario de recarga del index
const formulario_recargar = document.getElementById("formRecarga");

const operadoras = ["Movilnet", "Movistar", "Digitel", "Simple TV", "Inter", "Movistar TV"];
const planes = ["Diamante", "Oro", "Plata", "Bronce"];

// se agrega la opción "seleccionar" por defecto en el listado que se oculta al desplegar
formulario_recargar.operadora[0] = new Option("Seleccionar", "", false, true);
formulario_recargar.operadora[0].hidden = true;

// recorremos el array operadoras y se agregan las opciones en el select desde la posición 1, para que no sobreescriba la posición 0 (donde agregamos la opción seleccionar)
operadoras.forEach(function (element, key) {
  formulario_recargar.operadora[key + 1] = new Option(element, element);
});

// se agrega la opción "seleccionar" por defecto en el listado que se oculta al desplegar
formulario_recargar.plan[0] = new Option("Seleccionar", "", false, true);
formulario_recargar.plan[0].hidden = true;
// recorremos el array operadoras y se agregan las opciones en el select desde la posición 1, para que no sobreescriba la posición 0 (donde agregamos la opción seleccionar)
planes.forEach(function (element, key) {
  formulario_recargar.plan[key + 1] = new Option(element, element);
});

// se crea la clase recarga que recibira 3 parametros en el constructor
class recarga {
  constructor(operadora, plan, numero_recargar) {
    this.operadora = operadora.toLowerCase();
    this.plan = plan.toLowerCase();
    this.numero_recargar = numero_recargar;
  }

  // método para solicitar nombre de usuario
  obetener_nombre(objeto) {
    let nombre_usuario = localStorage.getItem("Nombre");
    if (nombre_usuario === null) nombre_usuario = "";
    objeto.nombre = nombre_usuario.toUpperCase();
  }

  // método para generar la solicitud de recarga
  solicitar() {
    let mensaje;
    if (this.nombre.trim() != "") {
      mensaje = `
    Hola, mi nombre es ${this.nombre}, quisiera recargar el plan ${this.plan} de ${this.operadora} al siguiente número: ${this.numero_recargar}. 
    `;
    } else {
      mensaje = `
      Hola, quisiera recargar el plan ${this.plan} de ${this.operadora} al siguiente número: ${this.numero_recargar}. 
      `;
    }
    window.open(`https://wa.me/5491123972723?text=${mensaje}`);
  }
}

function comienzo() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: "Por favor verifique sus datos",
      html: `<p><b>Operadora:</b> ${formulario_recargar.operadora.value}</p> <p><b>Plan:</b> ${formulario_recargar.plan.value}</p> <p><b>Número a recargar:</b> ${formulario_recargar.telefono.value}</p> <p><i>Será redirigido a WhatsApp para ser atendido por un asesor.</i></p>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, son correctos",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true,
      backdrop: "#03081885",
    })
    .then((result) => {
      if (result.isConfirmed) {
        const recarga1 = new recarga(formulario_recargar.operadora.value, formulario_recargar.plan.value, formulario_recargar.telefono.value);
        recarga1.obetener_nombre(recarga1);
        recarga1.solicitar();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire("Cancelado", "Comencemos nuevamente", "error");
        formulario_recargar.reset();
      }
    });
}
// se crea el EventListener para ejecutar la función comienzo al hacer submit
$("#formRecarga").submit(function (event) {
  event.preventDefault();
  comienzo();
});

// llamado Ajax para generar operadoras y precios minimos en el index

const URLGET = "json/planes.json";

function genera_planes_base(datos) {
  $("#operadoras").empty();
  datos.forEach((element) => {
    $("#operadoras").append(`
    <div>
    <img src="${element.logo}" alt="logo-${element.operadora.toLowerCase()}" />
    <p>Desde ${element.desde_pesos} Ars (${element.desde_bs}Bs)</p>
    </div>
    `);
  });
}

$(function () {
  $.get(URLGET, (respuesta, estado) => {
    if (estado === "success") {
      genera_planes_base(respuesta);
    }
  });
});
