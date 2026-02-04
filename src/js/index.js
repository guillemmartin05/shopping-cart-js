import { Carrito } from './carrito.js';
import { Producto } from './producto.js'; 
import { ProductoFisico } from './productoFisico.js';
import { ProductoDescargable } from './productoDescargable.js';
require('materialize-css');
import '../main.css';

// Inicialización objeto carrito de clase Carrito para empezar
const carrito = new Carrito();

// Elementos del html
const productoNombre = document.getElementById("producto-nombre");
const productoPrecio = document.getElementById("producto-precio");
const productoStock = document.getElementById("producto-stock");
const añadirBtn = document.getElementById("añadir");
const carritoContenido = document.getElementById("carrito-contenido");
const productoBuscar = document.getElementById("producto-buscar");
const buscarBtn = document.getElementById("buscar");

// NUEVO: elemento donde mostraremos el total
const carritoTotal = document.getElementById("carrito-total");

// Añadir producto
añadirBtn.addEventListener("click", () => {
    const nombre = productoNombre.value.trim();
    const precio = parseFloat(productoPrecio.value);
    const stock = parseInt(productoStock.value);

    if (!nombre || isNaN(precio) || isNaN(stock)) {
        alert("Por favor, complete todos los campos correctamente para añadir un nuevo producto");
        return;
    }

    const nuevoProducto = new Producto(Date.now(), nombre, precio, stock);
    carrito.añadirProducto(nuevoProducto);
    alert("Se ha añadido correctamente un producto a su carrito");

    productoNombre.value = '';
    productoPrecio.value = '';
    productoStock.value = '';

    actualizarCarrito();
});

// Buscar producto
buscarBtn.addEventListener("click", () => {
    const nombreBuscado = productoBuscar.value.trim();

    if (!nombreBuscado) {
        alert("Por favor, ingrese un nombre de producto para buscar.");
        return;
    }

    const resultado = carrito.buscarProducto(nombreBuscado);

    if (resultado) {
        alert(`Producto encontrado: ${resultado.mostrarDetalles()}`);
    } else {
        alert("Producto no encontrado");
    }

    productoBuscar.value = '';
});

// Actualizar carrito (pinta + calcula total)
function actualizarCarrito() {
    carritoContenido.innerHTML = '';

    // Si el carrito está vacío (tu clase devuelve un string)
    const productosCarrito = carrito.mostrarProductos();
    if (productosCarrito === "El carrito está vacío. Por favor, añada algun producto.") {
        const mensaje = document.createElement("p");
        mensaje.textContent = productosCarrito;
        carritoContenido.appendChild(mensaje);

        // NUEVO: total a 0 si está vacío
        if (carritoTotal) carritoTotal.textContent = "0.00";
        return;
    }

    // NUEVO: calculamos el total real del carrito
    let total = 0;

    // IMPORTANTE: en vez de usar el string "detalle", usamos el array real de productos
    carrito.productos.forEach((producto) => {
        const li = document.createElement("li");
        li.classList.add("cart-item");

        const info = document.createElement("span");
        info.classList.add("cart-info");

        const subtotal = producto.precio * producto.stock;
        total += subtotal;

        info.textContent =
            `Producto: ${producto.nombre}, Cantidad: ${producto.stock}, ` +
            `Precio: ${producto.precio.toFixed(2)}€, Subtotal: ${subtotal.toFixed(2)}€`;

        const acciones = document.createElement("div");
        acciones.classList.add("cart-actions");

        // Botón +
        const btnAumentar = document.createElement("button");
        btnAumentar.textContent = "+";
        btnAumentar.classList.add("btn-qty");
        btnAumentar.addEventListener("click", () => {
            carrito.cambiarCantidadProducto(producto.id, 1);
            actualizarCarrito();
        });

        // Botón -
        const btnDisminuir = document.createElement("button");
        btnDisminuir.textContent = "-";
        btnDisminuir.classList.add("btn-qty");
        btnDisminuir.addEventListener("click", () => {
            carrito.cambiarCantidadProducto(producto.id, -1);
            actualizarCarrito();
        });

        // Botón eliminar
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.classList.add("btn-delete");
        btnEliminar.addEventListener("click", () => {
            carrito.eliminarProducto(producto.id);
            actualizarCarrito();
        });

        acciones.appendChild(btnAumentar);
        acciones.appendChild(btnDisminuir);
        acciones.appendChild(btnEliminar);

        li.appendChild(info);
        li.appendChild(acciones);
        carritoContenido.appendChild(li);
    });

    // NUEVO: pintar el total del carrito
    if (carritoTotal) carritoTotal.textContent = total.toFixed(2);
}

// Al cargar la página
actualizarCarrito();
