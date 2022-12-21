import ContenedorMemoria from '../../Containers/ContainerMemoria.js';

let productos = [];

class ProductosDaoMemoria extends ContenedorMemoria {
  constructor() {
    super(productos);
  }
}

export default ProductosDaoMemoria;
