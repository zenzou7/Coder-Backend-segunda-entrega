import ContenedorMongo from '../../Containers/ContainerMongo.js';
import { Productos } from '../../../models/productos.js';

class CarritoDaoMongo extends ContenedorMongo {
  constructor() {
    super(Productos);
  }
}

export default CarritoDaoMongo;
