import ContenedorFirestore from '../../Containers/ContainerFirebase.cjs';

class CarritoDaoFirestore extends ContenedorFirestore {
  constructor() {
    super('carritos');
  }
}

export default CarritoDaoFirestore;
