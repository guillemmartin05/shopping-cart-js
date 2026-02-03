import { Producto } from './producto.js';

export class ProductoDescargable extends Producto {
    constructor(id, nombre, precio, stock, tamanoArchivo) {
        super(id, nombre, precio, stock);
        this.tamanoArchivo = tamanoArchivo;
    }

    mostrarDetalles() {
        return `${super.mostrarDetalles()} - File size: ${this.tamanoArchivo}MB`;
    }
}