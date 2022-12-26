import express from 'express';
/* const express = require('express'); */

import { Router } from 'express';
const RouterProds = Router();

import resultado from './src/DAOS/index.js';

const daoProd =  resultado.producto;
const classProd = new daoProd()

import Multer from 'multer';

const upload = Multer();

const app = express();

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');

app.use('/api/productos', RouterProds);

RouterProds.get('/', async (req, res) => {
  try {
    const prods = await classProd.getAll();
    res.json( { user: prods });
  } catch (err) {
    console.log(err);
  }
});

RouterProds.post('/form', upload.none(), (req, res) => {
  try {
    const body = req.body;
    classProd.save(body);
    if (body) {
    } else {
      res.json({ error: true, msg: 'Producto no agregado' });
    }
  } catch (err) {
    console.log(err);
  }
});

RouterProds.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    classProd.update(id,body);
    res.json({succes: true , user: body})
/*     const prods = await classProd.getAll();
    let index = prods.findIndex((prod) => prod.id == id);
    if (index >= 0) {
      prods[index] = body;
      classProd.save(prods);
      res.json({ success: true, user: body });
    } else {
      res.json({ error: true, msg: 'no encontrado' });
    } */
  } catch (err) {
    console.log(err);
  }
});

RouterProds.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    classProd.delete(id)
    res.json({ success: true, msg: 'Producto borrado' });
  } catch (err) {
    console.log(err);
  }
});

RouterProds.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const prod = await classProd.getById(id)

    if (prod) {
      res.json({ success: true, user: prod });
    } else {
      res.json({ error: true, msg: 'Producto no encontrado' });
  /*   const prods = await classProd.getAll();

    let prodId = prods.find((prod) => prod.id == id);
    if (prodId) {
      res.json({ success: true, user: prodId });
    } else {
      res.json({ error: true, msg: 'Producto no encontrado' }); */
    }
  } catch (err) {
    console.log(err);
  }
});

export default RouterProds;
