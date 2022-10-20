let fs = require('fs');

let productos = []

fs.writeFileSync('./productos.txt','[]')

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
            fs.writeFileSync('./productos.txt',`${JSON.stringify(productos)}`)
            return console.log(`producto ${obj.title} agregado con el id ${obj.id}`)
        }
        else{
            let ids=[]
            productos.forEach(prod => ids.push(prod.id))
            let idMax=Math.max(...ids)
            obj.id = idMax +1
            productos.push(obj)
            fs.writeFileSync('./productos.txt',`${JSON.stringify(productos)}`)
            return console.log(`producto ${obj.title} agregado con el id ${obj.id}`)
        }
    }
    getById(id){
        let producto = productos.find(prod => prod.id == id)
        return console.log(producto)
    }
    getAll(){
        return console.log(productos)
    }
    deleteById(id){
        let filtro = productos.filter(prod => prod.id !== id)
        fs.writeFileSync('./productos.txt',`${JSON.stringify(filtro)}`)
        return console.log(filtro)
    }
    deleteAll(){
        productos = []
        fs.writeFileSync('./productos.txt',`${JSON.stringify(productos)}`)
    }
}

const escuadra={
    title: 'Escuadra',
    price: 123,
    thumbnail:'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
}

    
const productos1 = new Contenedor(productos)

productos1.save(escuadra)



const escuadra2={
    title: 'Lapiz',
    price: 1234,
    thumbnail:'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
}


productos1.save(escuadra2)

productos1.getAll()

productos1.deleteById(1)

productos1.deleteAll()

