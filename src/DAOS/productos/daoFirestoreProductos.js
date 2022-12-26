import ContenedorFirestore from '../../Containers/ContainerFirebase.cjs';

class ProductosDaoFirestore extends ContenedorFirestore {
  constructor() {
    super('productos');
  }
}

export default ProductosDaoFirestore;
