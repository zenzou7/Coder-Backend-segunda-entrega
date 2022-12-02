const express = require('express');
const fs = require('fs');

const { Router } = require('express');
const router = Router();

const { Contenedor } = require('./js/prodsContainer.js');
const { ContenedorMsgs } = require('./js/msgContainer');

const classMsgs = new ContenedorMsgs('mensajes');
const classProductos = new Contenedor('productos');

const multer = require('multer');
const upload = multer();

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

app.use('/api/productos', router);

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
    let fecha = new Date();

    const mensaje = {
      email: data.email,
      mensaje: data.mensaje,
      fecha: fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear(),
      hora: fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds(),
    };

    classMsgs.save(mensaje);

    io.sockets.emit('msg-list', mensaje);
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
