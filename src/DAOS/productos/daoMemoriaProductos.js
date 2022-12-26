import ContenedorMemoria from '../../Containers/ContainerMemoria.js';

const productos = [
  {
    name: 'Espada',
    id: 1,
    price: 4999,
    thumbnail: 'https://amaterasu.com.ar/wp-content/uploads/2017/06/saber.jpg',
  },
  {
    name: 'Escudo',
    id: 2,
    price: 3377,
    thumbnail: 'https://thumbs.dreamstime.com/b/escudo-de-oro-del-metal-aislado-44256777.jpg',
  },
  {
    name: 'Arco',
    id: 3,
    price: 3888,
    thumbnail: 'https://www.armeriacanigo.com.ar/wp-content/uploads/9840_1-324x324.jpg',
  },
  {
    name: 'Lanza',
    id: 4,
    price: 4650,
    thumbnail: 'https://m.media-amazon.com/images/I/31JhTDklAeL._AC_SY1000_.jpg',
  },
  {
    name: 'Claymore',
    id: 5,
    price: 3888,
    thumbnail: 'https://www.armeriacanigo.com.ar/wp-content/uploads/9840_1-324x324.jpg',
  },
  {
    name: 'Bokken',
    id: 6,
    price: 2888,
    thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_772951-MLA31011434187_062019-O.jpg',
  },
  {
    name: 'Carcaj',
    id: 7,
    price: 1888,
    thumbnail: 'https://c8.alamy.com/compes/rxxp0r/el-carcaj-con-flechas-rxxp0r.jpg',
  },
  {
    name: 'Guantes de boxeo',
    id: 8,
    price: 1588,
    thumbnail: 'https://www.armeriacanigo.com.ar/wp-content/uploads/9840_1-324x324.jpg',
  },
  {
    name: 'Daga',
    id: 9,
    price: 4788,
    thumbnail: 'https://static.wikia.nocookie.net/warframe/images/e/e4/Daga_oscura.png/revision/latest?cb=20190826003122&path-prefix=es',
  },
];

class ProductosDaoMemoria extends ContenedorMemoria {
  constructor() {
    super(productos);
  }
}

export default ProductosDaoMemoria;
