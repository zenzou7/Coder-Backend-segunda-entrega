import RouterProds from './routerProductos.js';

import RouterCarrito from './routerCarrito.js';

import resultado from './src/DAOS/index.js';

const daoProd = resultado.producto;
const classProd = new daoProd();

import express from 'express';
const app = express();

const PORT = 8080 || process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

app.use('/api/productos', RouterProds);
app.use('/api/carrito', RouterCarrito);

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});

app.get('/', async (req, res) => {
  try {
    const prods = await classProd.getAll();

    res.json({ user: prods });
  } catch (err) {
    console.log(err);
  }
});

/* 
const productos = [
  {
    name: 'Espada',
    price: 4999,
    thumbnail: 'https://amaterasu.com.ar/wp-content/uploads/2017/06/saber.jpg',
  },
  {
    name: 'Escudo',
    price: 3377,
    thumbnail: 'https://thumbs.dreamstime.com/b/escudo-de-oro-del-metal-aislado-44256777.jpg',
  },
  {
    name: 'Arco',
    price: 3888,
    thumbnail: 'https://www.armeriacanigo.com.ar/wp-content/uploads/9840_1-324x324.jpg',
  },
  {
    name: 'Lanza',
    price: 4650,
    thumbnail: 'https://m.media-amazon.com/images/I/31JhTDklAeL._AC_SY1000_.jpg',
  },
  {
    name: 'Claymore',
    price: 3888,
    thumbnail: 'https://www.armeriacanigo.com.ar/wp-content/uploads/9840_1-324x324.jpg',
  },
  {
    name: 'Bokken',
    price: 2888,
    thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_772951-MLA31011434187_062019-O.jpg',
  },
  {
    name: 'Carcaj',
    price: 1888,
    thumbnail: 'https://c8.alamy.com/compes/rxxp0r/el-carcaj-con-flechas-rxxp0r.jpg',
  },
  {
    name: 'Guantes de boxeo',
    price: 1588,
    thumbnail: 'https://www.armeriacanigo.com.ar/wp-content/uploads/9840_1-324x324.jpg',
  },
  {
    name: 'Daga',
    price: 4788,
    thumbnail: 'https://static.wikia.nocookie.net/warframe/images/e/e4/Daga_oscura.png/revision/latest?cb=20190826003122&path-prefix=es',
  },
];
 */
