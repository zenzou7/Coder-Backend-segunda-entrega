import ContenedorMemoria from '../../Containers/ContainerMemoria.js';

let carrito = [];

class CarritoDaoMemoria extends ContenedorMemoria {
  constructor() {
    super(carrito);
  }
}

export default CarritoDaoMemoria;
