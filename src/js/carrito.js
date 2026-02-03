import { Producto } from './producto.js';

export class Carrito { 
    constructor() {
        this.productos = [];
    }

    /**
     * Añade un producto al carrito. Si el producto ya existe, incrementa su cantidad (stock).
     *
     * @param {Object} producto - El producto que se va a añadir al carrito.
     * @returns {void} - no devuelve nada
     */
    añadirProducto(producto) {
        const productoExistente = this.productos.find(p => p.id === producto.id);
        if (productoExistente) {
            productoExistente.stock += 1;
        } else {
            // Crear una nueva instancia de Producto antes de añadirlo
            const nuevoProducto = new Producto(producto.id, producto.nombre, producto.precio, producto.stock);
            this.productos.push(nuevoProducto); // Ahora se agrega como una instancia de Producto
        }
    }
    
    /**
     * Elimina un producto del carrito según su id.
     *
     * @param {number} id - El identificador único del producto que se desea eliminar. 
     * @returns {void} - No retorna nada,  actualiza el carrito.
     */
    eliminarProducto(id) {
        this.productos = this.productos.filter(producto => producto.id !== id);
    }

    /**
     * Cambia la cantidad de un producto en el carrito.
     * Si la cantidad llega a 0, llama al método eliminarProducto y elimina el producto.
     *
     * @param {number} id - El id del producto.
     * @param {number} cantidad - La cantidad a sumar o restar (puede ser negativo).
     * @returns {void}
     */
    cambiarCantidadProducto(id, cantidad) {
        const productoExistente = this.productos.find(producto => producto.id === id);
        if (productoExistente) {
            productoExistente.stock += cantidad;

            // Si la cantidad es menor o igual a 0, elimina automaticamente el producto
            if (productoExistente.stock <= 0) {
                this.eliminarProducto(id);
            }
        }
    }

    /**
     * Busca un producto en el carrito por su nombre.
     *
     * @param {string} nombre - El nombre del producto a buscar.
     * @returns {string|null} - Detalles del producto o null si no se encuentra.
     */

        buscarProducto(nombreBuscado) {
            const producto = this.productos.find(producto => producto.nombre === nombreBuscado);
        
            return producto;  // Devuelve el producto o `null` si noencuentra.
        }
    
    
    
    /**
     * Muestra los detalles de los productos en el carrito.
     *
     * @returns {string} - Lista de productos en el carrito.
     */
    mostrarProductos() {
        if (this.productos.length === 0) {
            return "El carrito está vacío. Por favor, añada algun producto.";
        }

        return this.productos.map(producto => 
            `Producto: ${producto.nombre}, Cantidad: ${producto.stock}`
        ).join('\n');
    }
}
