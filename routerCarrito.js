import express from 'express';
import resultado from './src/DAOS/index.js';
const { Router } = express;
const RouterCarrito = Router();

const carritos = resultado.carrito;

RouterCarrito.post('/', async (req, res) => {
  const { ...objeto } = req.body;
  await carritos.save({ ...objeto });
  res.json({ guardado: objeto.id });
});

RouterCarrito.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await carritos.delete(id);
  res.json({ carritoEliminado: id });
});

RouterCarrito.get('/:id/productos', async (req, res) => {
  const { id } = req.params;
  let listado;
  if (id) {
    await carritos.listarPorID(id);
  } else {
    await carritos.listarTodos();
  }

  res.json({ productos: listado });
});

RouterCarrito.post('/:id/productos', async (req, res) => {
  const { id } = req.params;
  let { ...nuevoCarrito } = req.body;
  await carritos.save(nuevoCarrito);
});

RouterCarrito.delete('/:id/productos/:id_prod', async (req, res) => {
  const { id } = req.params;

  await carritos.delete(id);
});

export default RouterCarrito;
