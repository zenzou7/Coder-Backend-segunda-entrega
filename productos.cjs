import express from 'express';
/* const express = require('express'); */
import { promises as fs } from 'fs';

import { Router } from 'express';

const routerProductos = Router();

import instancia from './src/DAOS/index.js';
const productos = new instancia.producto();

import Multer from 'multer';

const upload = Multer();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Socket.io
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});

app.set('view engine', 'ejs');

app.use('/api/productos', routerProductos);

app.get('/', async (req, res) => {
  try {
    const prods = await classProductos.getAll();
    res.render('pages/form', { products: prods });
  } catch (err) {
    console.log(err);
  }
});

routerProductos.get('/', async (req, res) => {
  try {
    const prods = await classProductos.getAll();
    res.render('pages/productos', { products: prods });
  } catch (err) {
    console.log(err);
  }
});

routerProductos.post('/form', upload.none(), (req, res) => {
  try {
    const body = req.body;
    classProductos.save(body);
    if (body) {
    } else {
      res.json({ error: true, msg: 'Producto no agregado' });
    }
  } catch (err) {
    console.log(err);
  }
});

routerProductos.put('/:id', async (req, res) => {
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
});

routerProductos.delete('/:id', async (req, res) => {
  try {
    let data = await classProductos.getAll();
    const id = req.params.id;
    prods = data.filter((prod) => prod.id != id);
    fs.writeFileSync('./productos.json', JSON.stringify(prods));
    res.json({ success: true, msg: 'Producto borrado' });
  } catch (err) {
    console.log(err);
  }
});

routerProductos.get('/:id', async (req, res) => {
  try {
    const prods = await classProductos.getAll();
    const { id } = req.params;

    let prodId = prods.find((prod) => prod.id == id);
    if (prodId) {
      res.json({ success: true, user: prodId });
    } else {
      res.json({ error: true, msg: 'Producto no encontrado' });
    }
  } catch (err) {
    console.log(err);
  }
});

export default routerProductos;
