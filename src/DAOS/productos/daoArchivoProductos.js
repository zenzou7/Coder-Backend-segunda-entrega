import ContenedorArchivo from '../../Containers/ContainerArchivo.js';

class ProductosDaoArchivos extends ContenedorArchivo {
  constructor() {
    super('../../../DB/productos.json');
  }
}

export default ProductosDaoArchivos;
