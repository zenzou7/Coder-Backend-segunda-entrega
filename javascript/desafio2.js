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
            fs.writeFile('./productos.txt', `${JSON.stringify(productos)}`, err =>{
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
            fs.writeFile('./productos.txt', `${JSON.stringify(productos)}`, err =>{
                if(err){
                    console.log(err)
                }
                else{
                    return console.log(`producto ${obj.title} agregado con el id ${obj.id}`)
                }
            })
        }
    }
    getById(id){
        fs.readFile('./productos.txt', 'utf-8', (err,data) =>{
            if(err){
                console.log(err)
            }
            else{
                let producto = JSON.parse(data).find(prod => prod.id == id)
                return console.log(producto)
            }
        }) 
    }
    getAll(){
        fs.readFile('./productos.txt', 'utf-8', (err,data) =>{
            if(err){
                console.log(err)
            }
            else{
                let productos = JSON.parse(data)
                return console.log(productos)
            }
        }) 
    }
    deleteById(id){        
        fs.readFile('./productos.txt', 'utf-8', (err,data) =>{
        if(err){
            console.log(err)
        }
        else{
            let filtro = JSON.parse(data).filter(prod => prod.id !== id)
            fs.writeFileSync('./productos.txt',`${JSON.stringify(filtro)}`)
            return console.log(filtro)
        }
    }) 
    }
    deleteAll(){
        productos = []
        fs.writeFileSync('./productos.txt',`${JSON.stringify(productos)}`)
    }
}

const productos1 = new Contenedor(productos)

const escuadra={
    title: 'Escuadra',
    price: 123,
    thumbnail:'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
}

productos1.save(escuadra)

const lapiz={
    title: 'Lapiz',
    price: 1234,
    thumbnail:'imagen de un lapiz'
}


productos1.save(lapiz)

const cuaderno = {
    title: 'Cuaderno',
    price: 40,
    thumbnail: 'Imagen de un cuaderno'
}

productos1.save(cuaderno)

productos1.getAll()

productos1.getById(1)

productos1.deleteById(1) 

productos1.deleteAll() 

