const express = require('express');
const fs = require('fs');
const { Router } = require('express');
const { ProductosContainer } = require('./classProductos.js');
const multer = require('multer');
const upload = multer();

const app = express();
const PORT = process.env.PORT || 8080;

let productos = [];
const classProductos = new ProductosContainer(productos);

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});

const routerProds = Router();
app.use('/api/productos', routerProds);

const routerCart = Router();
app.use('/api/carritos', routerCart);

let admin = true;

//Ruta productos
routerProds.get('/', async (req, res) => {
  try {
    const prods = await classProductos.getAll();
    res.json({ productos: prods });
  } catch (err) {
    console.log(err);
  }
});

routerProds.post(
  '/form',
  (req, res, next) => {
    if (admin == true) {
      next();
    } else {
      return res.json({ error: true, msg: 'Ruta solo para administradores' });
    }
  },
  upload.none(),
  (req, res) => {
    try {
      const body = req.body;
      classProductos.save(body);
      if (body) {
        res.json({ success: true, user: body });
      } else {
        res.json({ error: true, msg: 'Producto no agregado' });
      }
    } catch (err) {
      console.log(err);
    }
  }
);

routerProds.get('/:id', async (req, res) => {
  try {
    const prods = await classProductos.getAll();
    const { id } = req.params;

    let prodId = prods.find((prod) => prod.id == id);
    if (prodId) {
      res.json({ prodId });
    } else {
      res.json({ error: true, msg: 'Producto no encontrado' });
    }
  } catch (err) {
    console.log(err);
  }
});

routerProds.put(
  '/:id',
  (req, res, next) => {
    if (admin == true) {
      next();
    } else {
      return res.json({ error: true, msg: 'Ruta solo para administradores' });
    }
  },
  async (req, res) => {
    try {
      const prods = await classProductos.getAll();
      const id = req.params.id;
      const body = req.body;

      let index = prods.findIndex((prod) => prod.id == id);
      if (index >= 0) {
        prods[index] = body;
        fs.writeFileSync('./productos.json', JSON.stringify(prods));
        res.json({ success: true, user: body });
      } else {
        res.json({ error: true, msg: 'no encontrado' });
      }
    } catch (err) {
      console.log(err);
    }
  }
);

routerProds.delete(
  '/:id',
  (req, res, next) => {
    if (admin == true) {
      next();
    } else {
      return res.json({ error: true, msg: 'Ruta solo para administradores' });
    }
  },
  async (req, res) => {
    try {
      let data = await classProductos.getAll();
      const id = req.params.id;
      prods = data.filter((prod) => prod.id != id);
      fs.writeFileSync('./productos.json', JSON.stringify(prods));
      res.json({ success: true, msg: 'Producto borrado' });
    } catch (err) {
      console.log(err);
    }
  }
);

routerProds.get('/*', (req, res) => {
  res.json({ error: true, msg: 'Ruta inexistente' });
});

//Ruta carrito

//para ver un carrito y sus productos
routerCart.get('/:id/productos', async (req, res) => {
  try {
    const id = req.params.id;
    let data = await fs.promises.readFile('./carritos.json', 'utf-8');
    let allCarts = JSON.parse(data);
    let cart = allCarts.find((cart) => cart.cartId == id);
    if (cart) {
      res.json(cart);
    } else {
      res.json({ error: true, msj: 'Carrito inexistente' });
    }
  } catch (err) {
    console.log(err);
  }
});

//Para crear un carrito
routerCart.post('/', async (req, res) => {
  const data = await fs.promises.readFile('./carritos.json', 'utf-8');
  const carritos = await JSON.parse(data);

  if (carritos.length == 0) {
    const newCart = [{ cartId: 1, productos: [] }];

    fs.writeFile('./carritos.json', `${JSON.stringify(newCart)}`, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ success: true, user: `Nuevo carrito agregado con el id ${newCart.cartId}` });
      }
    });
  } else {
    let ids = [];
    carritos.forEach((cart) => ids.push(cart.cartId));
    let idMax = Math.max(...ids);
    let newCart = { cartId: idMax + 1, productos: [] };
    carritos.push(newCart);
    fs.writeFile('./carritos.json', `${JSON.stringify(carritos)}`, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ success: true, user: `Nuevo carrito agregado con el id ${newCart.cartId}` });
      }
    });
  }
});

//para agregar un producto a un carrito
routerCart.post('/:id/productos', async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const data = await fs.promises.readFile('./carritos.json', 'utf-8');
  const allCarts = JSON.parse(data);

  const newCart = allCarts.find((cart) => cart.cartId == id);

  if ((newCart && body) !== (undefined || null)) {
    try {
      const newJson = allCarts.filter((carts) => carts.cartId !== newCart.cartId);

      newCart.productos.push(body);

      newJson.push(newCart);
      fs.writeFile('./carritos.json', `${JSON.stringify(newJson)}`, (err) => {
        if (err) {
          console.log(err);
        } else {
          res.json({ success: true, user: newCart });
        }
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.json({ error: true, msg: 'Carrito inexistente o producto inexistente' });
  }
});

//para borrar un carrito entero
routerCart.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const data = await fs.promises.readFile('./carritos.json', 'utf-8');
  const allCarts = JSON.parse(data);

  const filtro = allCarts.filter((cart) => cart.cartId != id);
  try {
    fs.writeFile('./carritos.json', `${JSON.stringify(filtro)}`, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ success: true, msg: 'Carrito eliminado con exito' });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

//para borrar un producto de un carrito /id(carrito)/productos/id del producto en el carrito
routerCart.delete('/:id/productos/:id_prod', async (req, res) => {
  const idCart = req.params.id;
  const idProd = req.params.id_prod;

  const data = await fs.promises.readFile('./carritos.json', 'utf-8');
  const allCarts = JSON.parse(data);

  const miCart = allCarts.find((cart) => cart.cartId == idCart);

  if (miCart) {
    const miCartProd = miCart.productos.find((prod) => prod.id == idProd);

    if (miCartProd) {
      const miCartFilter = miCart.productos.filter((prod) => prod.id != idProd);
      miCart.productos = miCartFilter;
      const newJson = allCarts.filter((cart) => cart.cartId != idCart);
      newJson.push(miCart);
      try {
        fs.writeFile('./carritos.json', `${JSON.stringify(newJson)}`, (err) => {
          if (err) {
            console.log(err);
          } else {
            res.json({ success: true, msg: 'Producto eliminado con exito' });
          }
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      res.json({ error: true, msg: 'El producto no existe en este carrito' });
    }
  } else {
    res.json({ error: true, msg: 'El carritono existe' });
  }
});

routerCart.get('/*', (req, res) => {
  res.json({ error: true, msg: 'Ruta inexistente' });
});
