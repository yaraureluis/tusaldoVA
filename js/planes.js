const tasa = 0.021;
const porcentaje = 0.8;

// Json con operadoras y planes
const planes = {
  movilnet: [
    { plan: "Bronce", color: "Bronce", precio_bs: 3, precio_pesos: tasa * porcentaje },
    { plan: "Plata", color: "Plata", precio_bs: 6, precio_pesos: tasa * porcentaje },
    { plan: "Oro", color: "Oro", precio_bs: 9, precio_pesos: tasa * porcentaje },
    { plan: "Diamante", color: "Diamante", precio_bs: 12, precio_pesos: tasa * porcentaje },
  ],
  digitel: [
    { plan: "Bronce", color: "Bronce", precio_bs: 5, precio_pesos: tasa * porcentaje },
    { plan: "Plata", color: "Plata", precio_bs: 10, precio_pesos: tasa * porcentaje },
    { plan: "Oro", color: "Oro", precio_bs: 15, precio_pesos: tasa * porcentaje },
    { plan: "Diamante", color: "Diamante", precio_bs: 20, precio_pesos: tasa * porcentaje },
  ],
  movistar: [
    { plan: "Bronce", color: "Bronce", precio_bs: 4, precio_pesos: tasa * porcentaje },
    { plan: "Plata", color: "Plata", precio_bs: 8, precio_pesos: tasa * porcentaje },
    { plan: "Oro", color: "Oro", precio_bs: 12, precio_pesos: tasa * porcentaje },
    { plan: "Diamante", color: "Diamante", precio_bs: 16, precio_pesos: tasa * porcentaje },
  ],
  inter: [
    { plan: "Bronce", color: "Bronce", precio_bs: 5, precio_pesos: tasa * porcentaje },
    { plan: "Plata", color: "Plata", precio_bs: 10, precio_pesos: tasa * porcentaje },
    { plan: "Oro", color: "Oro", precio_bs: 20, precio_pesos: tasa * porcentaje },
    { plan: "Diamante", color: "Diamante", precio_bs: 25, precio_pesos: tasa * porcentaje },
  ],
  simple_tv: [
    { plan: "Bronce", color: "Bronce", precio_bs: 5, precio_pesos: tasa * porcentaje },
    { plan: "Plata", color: "Plata", precio_bs: 10, precio_pesos: tasa * porcentaje },
    { plan: "Oro", color: "Oro", precio_bs: 20, precio_pesos: tasa * porcentaje },
    { plan: "Diamante", color: "Diamante", precio_bs: 25, precio_pesos: tasa * porcentaje },
  ],
  movistar_tv: [
    { plan: "Bronce", color: "Bronce", precio_bs: 4, precio_pesos: tasa * porcentaje },
    { plan: "Plata", color: "Plata", precio_bs: 8, precio_pesos: tasa * porcentaje },
    { plan: "Oro", color: "Oro", precio_bs: 12, precio_pesos: tasa * porcentaje },
    { plan: "Diamante", color: "Diamante", precio_bs: 16, precio_pesos: tasa * porcentaje },
  ],
};

class Cintillo {
  constructor(operadora) {
    this.operadora = operadora;
  }

  generar_cintillo() {
    let plantilla = `
          <img src="../assets/imagenes/${this.operadora}.svg" alt="logo-${this.operadora}" class="logoPlanes" />
          `;
    $(`#cintillo-${this.operadora}`).prepend(plantilla);
  }
}

function estructura_planes() {
  for (const operadora in planes) {
    const cintillo = new Cintillo(operadora);
    cintillo.generar_cintillo();
    planes[operadora].forEach((element) => {
      let conversion_pesos = parseInt(element.precio_bs / element.precio_pesos / 10) * 10;
      element.precio_pesos = conversion_pesos;
      $(`#planes-${operadora}`).append(`
        <div class="col">
        <div class="card mb-4 rounded-3 shadow-sm">
            <div class="card-header py-3 fondo${element.color}">
            <h4 class="my-0 fw-normal ">PLAN ${element.plan.toUpperCase()}</h4>
            </div>
            <div class="card-body">
            <h1 class="card-title pricing-card-title mb-4">${conversion_pesos}<small class="text-muted fw-light">Ars</small></h1>
            <ul class="list-unstyled mt-3 mb-4">
                <li>Pagando ${conversion_pesos} pesos argentinos</li>
                <li>Recibe ${element.precio_bs}Bs</li>
            </ul>
            <a href="https://wa.me/5491123972723?text=Hola,%20quisiera%20recargar%20el%20plan%20${element.plan}%20de%20${operadora.toUpperCase()}" target="_blank" rel="noopener">
                <button type="button" class="w-100 btn btn-lg btn-outline-${element.color.toLowerCase()}">Lo quiero!</button>
            </a>
            </div>
        </div>
        </div>
        `);
    });
  }
}

estructura_planes();
