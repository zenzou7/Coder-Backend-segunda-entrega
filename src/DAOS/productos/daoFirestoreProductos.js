import ContenedorFirestore from '../../Containers/ContainerFirebase.js';

class ProductosDaoFirestore extends ContenedorFirestore {
  constructor() {
    super('productos');
  }
}

export default ProductosDaoFirestore;
