import express from 'express';
import resultado from './src/DAOS/index.js';
const { Router } = express;
const RouterCarrito = Router();

const carrito = resultado.carrito;
const classCarrito = new carrito();

RouterCarrito.post('/', async (req, res) => {
  const { ...objeto } = req.body;
  await classCarrito.save({ ...objeto });
  res.json({ guardado: objeto.id });
});

RouterCarrito.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await classCarrito.delete(id);
  res.json({ carritoEliminado: id });
});

RouterCarrito.get('/:id/productos', async (req, res) => {
  const { id } = req.params;
  let listado;
  if (id) {
    await classCarrito.getById(id);
  } else {
    await classCarrito.getAll();
  }

  res.json({ productos: listado });
});

RouterCarrito.post('/:id/productos', async (req, res) => {
  const { id } = req.params;
  let { ...nuevoCarrito } = req.body;
  await classCarrito.save(nuevoCarrito);
});

RouterCarrito.delete('/:id/productos/:id_prod', async (req, res) => {
  const { id } = req.params;

  await classCarrito.delete(id);
});

export default RouterCarrito;
