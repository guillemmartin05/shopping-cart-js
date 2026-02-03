export class Producto {
    constructor(id, nombre, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }

   
    
        mostrarDetalles() {
            return `ID: ${this.id}\nNombre: ${this.nombre}\nPrecio: ${this.precio}€\nStock: ${this.stock}`;
        }
    }

