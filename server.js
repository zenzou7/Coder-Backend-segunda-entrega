const express = require('express');
const fs = require('fs');
const { Router } = require('express');
const router = Router();
const { Contenedor } = require('./class');
const multer = require('multer');
const { parse } = require('path');
const upload = multer();

const app = express();
const PORT = process.env.PORT || 8080;

let productos = [];
const classProductos = new Contenedor(productos);

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Socket.io
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});

app.use('/api/productos', router);

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  try {
    const prods = await classProductos.getAll();
    res.render('pages/form', { products: prods });
  } catch (err) {
    console.log(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const prods = await classProductos.getAll();
    res.render('pages/productos', { products: prods });
  } catch (err) {
    console.log(err);
  }
});

router.post('/form', upload.none(), (req, res) => {
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

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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

router.get('/:id', async (req, res) => {
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

io.on('connection', async (socket) => {
  console.log('Usuario conectado');

  socket.on('msg', async (data) => {
    const msgJson = await fs.promises.readFile('./mensajes.json', 'utf-8');
    const msgs = await JSON.parse(msgJson);

    if (msgs) {
      msgs.push({
        email: data.email,
        mensaje: data.mensaje,
      });

      fs.writeFile('./mensajes.json', `${JSON.stringify(msgs)}`, (err) => {
        if (err) {
          console.log(err);
        }
      });

      io.sockets.emit('msg-list', msgs);
    } else {
      let arrayMsg = [];

      arrayMsg.push({
        email: data.email,
        mensaje: data.mensaje,
      });

      fs.writeFile('./mensajes.json', `${JSON.stringify(arrayMsg)}`, (err) => {
        if (err) {
          console.log(err);
        }
      });

      io.sockets.emit('msg-list', msgs);
    }
  });

  socket.on('sendTable', async (data) => {
    classProductos.save(data);
    try {
      const productos = await classProductos.getAll();
      socket.emit('prods', productos);
    } catch (err) {
      console.log(err);
    }
  });
});
