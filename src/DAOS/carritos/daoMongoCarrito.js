import ContenedorMongo from '../../Containers/ContainerMongo.js';
import { Carritos } from '../../../models/carritos.js';

class CarritoDaoMongo extends ContenedorMongo {
  constructor() {
    super(Carritos);
  }
}

export default CarritoDaoMongo;
