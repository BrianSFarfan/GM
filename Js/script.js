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
// ... (tu código existente)

function handleTouchEnd(event) {
    if (isSwiping) {
        const deltaX = startX - (event.clientX || event.changedTouches[0].clientX);
        if (deltaX > 50) {
            // Se deslizó hacia la izquierda, mostrar el botón de eliminar
            const selectedRow = event.target.parentNode;
            if (selectedRow.tagName.toLowerCase() === "tr") {
                const eliminarCell = document.createElement("td");
                const eliminarButton = document.createElement("button");
                eliminarButton.classList.add("eliminar");
                eliminarButton.textContent = "Eliminar";
                eliminarCell.appendChild(eliminarButton);
                eliminarButton.addEventListener("click", function() {
                    eliminarFila(selectedRow);
                });
                selectedRow.appendChild(eliminarCell);
                selectedRow.style.transform = "translateX(-100px)"; // Desplaza la fila 100px hacia la izquierda
            }
        } else {
            // Restablece la posición de la fila
            const selectedRow = event.target.parentNode;
            if (selectedRow.tagName.toLowerCase() === "tr") {
                selectedRow.style.transform = "translateX(0)";
            }
        }
    }

    // Restablecer los valores
    startX = 0;
    startY = 0;
    isSwiping = false;
}

function eliminarFila(row) {
    const precio = parseFloat(row.children[1].textContent.slice(1));
    total -= precio;
    row.remove();
    document.getElementById("total").textContent = total.toFixed(2);
}
