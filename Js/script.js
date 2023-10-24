const fechaActual = new Date();
const mesActual = fechaActual.getMonth();
const nombresMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const nombreMesActual = nombresMeses[mesActual];

console.log("El mes actual es:", nombreMesActual);
const h1MesActual = document.getElementById("mes-actual");
h1MesActual.textContent = nombreMesActual;

let total = 0;

function agregarGasto() {
    const nombre = document.getElementById("nombre").value;
    const precio = parseFloat(document.getElementById("precio").value);

    if (nombre && !isNaN(precio) && precio > 0) {
        total += precio;
        document.getElementById("total").textContent = total.toFixed(2);
        // Puedes reiniciar los campos de nombre y precio si lo deseas
        document.getElementById("nombre").value = "";
        document.getElementById("precio").value = "";
        
        // También puedes agregar el nuevo gasto a la tabla si lo deseas
        const listaGastos = document.getElementById("lista-gastos");
        const newRow = listaGastos.insertRow();
        newRow.insertCell().textContent = nombre;
        newRow.insertCell().textContent = `$${precio.toFixed(2)}`;
    } else {
        alert("Por favor, ingresa un nombre válido y un precio mayor a 0.");
    }
}

let startX = 0;
let startY = 0;
let isSwiping = false;

document.getElementById("lista-gastos").addEventListener("touchstart", handleTouchStart, false);
document.getElementById("lista-gastos").addEventListener("mousedown", handleTouchStart, false);

document.getElementById("lista-gastos").addEventListener("touchmove", handleTouchMove, false);
document.getElementById("lista-gastos").addEventListener("mousemove", handleTouchMove, false);

document.getElementById("lista-gastos").addEventListener("touchend", handleTouchEnd, false);
document.getElementById("lista-gastos").addEventListener("mouseup", handleTouchEnd, false);

function handleTouchStart(event) {
    startX = event.clientX || event.touches[0].clientX;
    startY = event.clientY || event.touches[0].clientY;
}

function handleTouchMove(event) {
    if (startX === 0 || startY === 0) {
        return;
    }

    const currentX = event.clientX || event.touches[0].clientX;
    const currentY = event.clientY || event.touches[0].clientY;

    const deltaX = startX - currentX;
    const deltaY = startY - currentY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Deslizamiento horizontal
        isSwiping = true;
    } else {
        // Deslizamiento vertical, cancelar la operación de deslizamiento
        isSwiping = false;
    }
}

function handleTouchEnd(event) {
    if (isSwiping) {
        const deltaX = startX - (event.clientX || event.changedTouches[0].clientX);
        if (deltaX > 50) {
            // Se deslizó hacia la izquierda, eliminar la fila
            const selectedRow = event.target.parentNode;
            if (selectedRow.tagName.toLowerCase() === "tr") {
                const precio = parseFloat(selectedRow.children[1].textContent.slice(1));
                total -= precio;
                selectedRow.classList.add("deslizar-izquierda"); // Agregar la clase de animación
                selectedRow.innerHTML += '<td><button class="eliminar">Eliminar</button></td>'; // Agregar botón de eliminar
                document.getElementById("total").textContent = total.toFixed(2);
            }
        }
    }

    // Restablecer los valores
    startX = 0;
    startY = 0;
    isSwiping = false;
}
