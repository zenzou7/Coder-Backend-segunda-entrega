import ProductosDaoArchivos from './productos/daoArchivoProductos.js';
import CarritoDaoArchivos from './carritos/daoArchivoCarrito.js';

import ProductosDaoMongo from './productos/daoMongoProductos.js';
import CarritoDaoMongo from './carritos/daoMongoCarrito.js';

/* import ProductosDaoFirestore from './productos/daoFirestoreProductos.js';
import CarritoDaoFirestore from './carritos/daoFiresoreCarrito.js'; */

import ProductosDaoMemoria from './productos/daoMemoriaProductos.js';
import CarritoDaoMemoria from './carritos/daoMemoriaCarrito.js';

import { config } from 'dotenv';

config();

const instancias = [
  {
    nombre: ProductosDaoArchivos,
    id: 'archivo',
    descripcion: 'producto',
  },
  {
    nombre: CarritoDaoArchivos,
    id: 'archivo',
    descripcion: 'carrito',
  },
  {
    nombre: ProductosDaoMongo,
    id: 'Mongo',
    descripcion: 'producto',
  },
  {
    nombre: CarritoDaoMongo,
    id: 'mongo',
    descripcion: 'carrito',
  },
  /* {
    nombre: ProductosDaoFirestore,
    id: 'firestore',
    descripcion: 'producto',
  },
  {
    nombre: CarritoDaoFirestore,
    id: 'firestore',
    descripcion: 'carrito',
  }, */
  {
    nombre: ProductosDaoMemoria,
    id: 'memoria',
    descripcion: 'producto',
  },
  {
    nombre: CarritoDaoMemoria,
    id: 'memoria',
    descripcion: 'carrito',
  },
];

const instancia = instancias.filter((i) => i.id == process.env.INSTANCIA);

const resultado = {
  [instancia[0].descripcion]: instancia[0].nombre,
  [instancia[1].descripcion]: instancia[1].nombre,
};

export default resultado;
