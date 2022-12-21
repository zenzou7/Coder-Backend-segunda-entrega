import ContenedorFirestore from '../../Containers/ContainerFirebase.js';

class CarritoDaoFirestore extends ContenedorFirestore {
  constructor() {
    super('carritos');
  }
}

export default CarritoDaoFirestore;
