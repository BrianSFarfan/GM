const fechaActual = new Date();
const mesActual = fechaActual.getMonth();
const nombresMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const nombreMesActual = nombresMeses[mesActual];

console.log("El mes actual es:", nombreMesActual);
const h1MesActual = document.getElementById("mes-actual");
h1MesActual.textContent = nombreMesActual;

