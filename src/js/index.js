
import { Carrito } from './carrito.js';
import { Producto } from './producto.js'; 
import { ProductoFisico } from './productoFisico.js';
import { ProductoDescargable } from './productoDescargable.js';
require('materialize-css');
import '../main.css';

// Inicialización objeto carrito de clase Carrito para empezzar
const carrito = new Carrito();

// Elementos del html con los que interactuaremos para que todo funcione ok y las guardamos en constantes
const productoNombre = document.getElementById("producto-nombre");
const productoPrecio = document.getElementById("producto-precio");
const productoStock = document.getElementById("producto-stock");
const añadirBtn = document.getElementById("añadir");
const carritoContenido = document.getElementById("carrito-contenido");
const productoBuscar = document.getElementById("producto-buscar");  // Input de búsqueda
const buscarBtn = document.getElementById("buscar");  // Botón de búsqueda

/* 
Cuando user haga click en el boton para añadir, se hace esta validación previa. Primero guarda los inputs del user en variables y en caso de que todos los
campos no se hayan llenado correctamente, saltará alerta
*/
añadirBtn.addEventListener("click", () => {
    const nombre = productoNombre.value.trim(); //trim elimina espacios en blanco tanto principio como final para que no haya futuros errores
    const precio = parseFloat(productoPrecio.value); 
    const stock = parseInt(productoStock.value);

    //si no estan los campos llenos o correctamente, mensaje de alerta
    if (!nombre || isNaN(precio) || isNaN(stock)) {
        alert("Por favor, complete todos los campos correctamente para añadir un nuevo producto");
        return;
    }

    // Crear el producto y lo añade al carrito usando el metodo
    const nuevoProducto = new Producto(Date.now(), nombre, precio, stock); 
    carrito.añadirProducto(nuevoProducto);
    alert("Se ha añadido correctamente un producto a su carrito");

    // Limpiar los campos para no tener que borrarlos manualmente si queremos ir añadiendo más cosas
    productoNombre.value = '';
    productoPrecio.value = '';
    productoStock.value = '';

    // Actualizar el estado del carrito
    actualizarCarrito();
});

// Función para buscar un producto en el carrito
buscarBtn.addEventListener("click", () => {
    const nombreBuscado = productoBuscar.value.trim();

    if (!nombreBuscado) {
        alert("Por favor, ingrese un nombre de producto para buscar.");
        return;
    }

    // Llamar al método buscarProducto
    const resultado = carrito.buscarProducto(nombreBuscado);

    if (resultado) {
        // Si el producto es encontrado, mostrar sus detalles usando el metodo
        alert(`Producto encontrado: ${resultado.mostrarDetalles()}`);
    } else {
        // Si no se encuentra, mostra un mensaje de alerta
        alert("Producto no encontrado");
    }

    // Limpiar el campo de búsqueda
    productoBuscar.value = '';
});



// Funcion para actualizar el contenido del carrito cada vez que se hace un cambio. Elimina el anterior para que no se acumule el anterior con el nuevo
function actualizarCarrito() {
    carritoContenido.innerHTML = ''; // Limpiar el contenido actual
    const productosCarrito = carrito.mostrarProductos();

    // Si no hay productos en el carrito, mostrar mensaje de que esta vacio
    if (productosCarrito === "El carrito está vacío. Por favor, añada algun producto.") {
        const mensaje = document.createElement("p");
        mensaje.textContent = productosCarrito;
        carritoContenido.appendChild(mensaje);
        return;
    }

    // Crear los elementos del carrito con botones para sumar, restar y eliminar
    const productos = productosCarrito.split('\n');
    productos.forEach((detalle, index) => {
        const li = document.createElement("li");
        li.textContent = detalle;

        // Botón de aumentar cantidad
        const btnAumentar = document.createElement("button");
        btnAumentar.textContent = "+";
        btnAumentar.addEventListener("click", () => {
            const idProducto = carrito.productos[index].id;
            carrito.cambiarCantidadProducto(idProducto, 1); // Aumentar cantidad con metodo
            actualizarCarrito();
        });

        // Botón de disminuir cantidad
        const btnDisminuir = document.createElement("button");
        btnDisminuir.textContent = "-";
        btnDisminuir.addEventListener("click", () => {
            const idProducto = carrito.productos[index].id;
            carrito.cambiarCantidadProducto(idProducto, -1); // Disminuye cantidad con método
            actualizarCarrito();
        });

        // Botón de eliminar producto
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", () => {
            const idProducto = carrito.productos[index].id;
            carrito.eliminarProducto(idProducto); // Eliminar producto
            actualizarCarrito();
        });

        // Añadir botones al `li`
        li.appendChild(btnAumentar);
        li.appendChild(btnDisminuir);
        li.appendChild(btnEliminar);
        carritoContenido.appendChild(li);
    });
}

// Funcion para el carrito actualice al cargar  página
actualizarCarrito();




