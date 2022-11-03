const express = require('express');
const fs = require('fs')
const { Router } = require('express');
const router = Router()
const {Contenedor} = require('./class')
const multer = require('multer')
const upload = multer()

const app = express()
const PORT = process.env.PORT || 8080

let productos = [];

const classProductos = new Contenedor(productos)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`);
  });

app.use('/api/productos', router);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

const getProductos = async ()=>{
    const prods = await classProductos.getAll()

    router.get('/', (req, res) => {
        res.json({success: true, user: prods})
})}
getProductos()

const getPorId = async () =>{
    const prods = await classProductos.getAll()

    router.get('/:id', (req, res) => {
        const {id} = req.params
        
        let prodId = prods.find(prod => prod.id == id)
        if(prodId){
            res.json({success: true, user: prodId})
        }
        else{
            res.json({error:true, msg:'Producto no encontrado'})
        }
})
}
getPorId()

app.post('/datos', upload.none(), (req, res) => {
    const body = req.body
    classProductos.save(body)
    if(body){
        res.json({success: true, user: body})
    }
    else{
        res.json({error:true, msg:'Producto no agregado'})
    }
})

const putId = async () =>{
    const prods = await classProductos.getAll();

    router.put('/:id', (req, res) => {
        const id = req.params.id;
        const body = req.body;

        let index= prods.findIndex(prod => prod.id == id)
        if (index >= 0) {
          prods[index] = body
          fs.writeFileSync('./productos.json', JSON.stringify(prods)) 
          res.json({ success: true, user: body });
        } else {
          res.json({ error: true, msg: 'no encontrado' });
        }
      });
}
putId();

const borrar = async() =>{
    let data = await classProductos.getAll();

    router.delete('/:id', (req, res) => {
        const id  = req.params.id;
        prods = data.filter((prod) => prod.id != id)
        fs.writeFileSync('./productos.json', JSON.stringify(prods))
        res.json({ success: true, msg:'Producto borrado' });
      });
}
borrar()