import ContenedorArchivo from '../../Containers/ContainerArchivo.js';

class CarritoDaoArchivos extends ContenedorArchivo {
  constructor() {
    super('../../../DB/carritos.json');
  }
}

export default CarritoDaoArchivos;
