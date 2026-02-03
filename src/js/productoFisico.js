import { Producto } from './producto.js';

export class ProductoFisico extends Producto {
    constructor(id, nombre, stock, precio, peso) {
        super(id, nombre, stock, precio);
        this.peso = peso;
    }

    mostrarDetalles() {
        return `${super.mostrarDetalles()} - Weight: ${this.peso}kg`;
    }
}