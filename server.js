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
    
router.get('/', async(req, res) => {
    try{
        const prods = await classProductos.getAll()
        res.json({success: true, user: prods})}
    catch(err){
        console.log(err)
    }
})



    
router.get('/:id', async(req, res) => {
    try{
        const prods = await classProductos.getAll()
        const {id} = req.params
        
        let prodId = prods.find(prod => prod.id == id)
        if(prodId){
            res.json({success: true, user: prodId})
        }
        else{
            res.json({error:true, msg:'Producto no encontrado'})
        }
    }
    catch(err){
        console.log(err)
    }
})


app.post('/datos', upload.none(), (req, res) => {
    try{
        const body = req.body
        classProductos.save(body)
        if(body){
            res.json({success: true, user: body})
        }
        else{
            res.json({error:true, msg:'Producto no agregado'})
        }
    }
    catch(err){
        console.log(err)
    }
})


    
router.put('/:id', async(req, res) => {
   try{
        const prods = await classProductos.getAll();
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
    }
    catch(err){
        console.log(err)
    }
    });
    
router.delete('/:id', async(req, res) => {
    try{
        let data = await classProductos.getAll();
        const id  = req.params.id;
        prods = data.filter((prod) => prod.id != id)
        fs.writeFileSync('./productos.json', JSON.stringify(prods))
        res.json({ success: true, msg:'Producto borrado' });
    }
    catch(err){
        console.log(err)
    }
    });
