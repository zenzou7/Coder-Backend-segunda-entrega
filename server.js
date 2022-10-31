const fs = require('fs');
const express = require('express');
const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

let productos = []

class Contenedor{
    constructor(productos){
        this.title = productos.title;
        this.price = productos.price;
        this.thumbnail = productos.thumbnail;
        this.id = productos.id
    }
    save(obj){
        if(productos.length == 0){
            obj.id = 1
            productos.push(obj)
            fs.writeFile('./productos.json', `${JSON.stringify(productos)}`, err =>{
                if(err){
                    console.log(err)
                }
                else{
                    return console.log(`producto ${obj.title} agregado con el id ${obj.id}`)
                }
            })
        }
        else{
            let ids=[]
            productos.forEach(prod => ids.push(prod.id))
            let idMax=Math.max(...ids)
            obj.id = idMax +1
            productos.push(obj)
            fs.writeFile('./productos.json', `${JSON.stringify(productos)}`, err =>{
                if(err){
                    console.log(err)
                }
                else{
                    return console.log(`producto ${obj.title} agregado con el id ${obj.id}`)
                }
            })
        }
    }
    async getById(id){
        try{
            const data = await fs.promises.readFile('./productos.json', 'utf-8') 
            let producto = await JSON.parse(data).find(prod => prod.id == id)
            return producto
        }
        catch (err){
            console.log('error de lectura' ,err)
        }
    }
    async getAll(){
        try{
            const data = await fs.promises.readFile('./productos.json', 'utf-8') 
            const dataParse = await JSON.parse(data)
            return dataParse
        }
        catch (err){
            console.log('error de lectura' ,err)
        }
    }
    async deleteById(id){        
        try{
            const data = await fs.promises.readFile('./productos.json', 'utf-8') 
            let filtro = JSON.parse(data).filter(prod => prod.id !== id)
            await fs.promises.writeFile('./productos.json', JSON.stringify(filtro)) 
            console.log(`El objeto con id:${id} ha sido borrado`)
        }
        catch (err){
            console.log('error de lectura' ,err)
        }
    }
    async deleteAll(){
        try{
            await fs.promises.writeFile('./productos.json', '') 
            console.log('Todo ha sido borrado')
        }
        catch (err){
            console.log('error de lectura' ,err)
        }
    }
}

const productos1 = new Contenedor(productos)

app.get('/', (req, res) => {
    res.send('Coder Backend, desafio 3.')
})
const funcionGetProducto = async ()=>{
    const prods = await productos1.getAll()
    app.get('/productos', (req, res) => {
    res.json(`Todos los productos: ${prods.map(elem => 
        `Nombre: ${elem.title}
        precio: ${elem.price}
        id: ${elem.id}`)}`)
})}
funcionGetProducto()

const getRANDOM = async()=> {
    let prod = await productos1.getById(Math.round(Math.random() * (3 - 1) + 1))
    app.get('/productoRandom', (req, res) => {
    res.json(`Tu producto aletorio: ${prod.title}, precio: ${prod.price}, id: ${prod.id}`)
})
}
getRANDOM()

app.listen(PORT, () => {
console.log(`Example app listening on port ${PORT}`)
})