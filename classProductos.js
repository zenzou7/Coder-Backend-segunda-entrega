const fs = require('fs');

class ProductosContainer {
  constructor(productos) {
    this.title = productos.title;
    this.price = productos.price;
    this.thumbnail = productos.thumbnail;
    this.id = productos.id;
    this.code = productos.code;
    this.description = productos.description;
    this.timeStamp = productos.timeStamp;
  }
  async save(obj) {
    const data = await fs.promises.readFile('./productos.json', 'utf-8');
    const productos = await JSON.parse(data);
    obj.timeStamp = Date.now();

    if (productos.length == 0) {
      obj.id = 1;
      obj.code = `000${obj.id}`;

      fs.writeFile('./productos.json', `${JSON.stringify(obj)}`, (err) => {
        if (err) {
          console.log(err);
        } else {
          return console.log(`producto ${obj.title} agregado con el id ${obj.id}`);
        }
      });
    } else {
      let ids = [];
      productos.forEach((prod) => ids.push(prod.id));
      let idMax = Math.max(...ids);
      obj.id = idMax + 1;
      obj.code = `000${obj.id}`;
      productos.push(obj);
      fs.writeFile('./productos.json', `${JSON.stringify(productos)}`, (err) => {
        if (err) {
          console.log(err);
        } else {
          return console.log(`producto ${obj.title} agregado con el id ${obj.id}`);
        }
      });
    }
  }
  async getById(id) {
    try {
      const data = await fs.promises.readFile('./productos.json', 'utf-8');
      let producto = await JSON.parse(data).find((prod) => prod.id == id);
      return producto;
    } catch (err) {
      console.log('error de lectura', err);
    }
  }
  async getAll() {
    try {
      const data = await fs.promises.readFile('./productos.json', 'utf-8');
      const dataParse = await JSON.parse(data);
      return dataParse;
    } catch (err) {
      console.log('error de lectura', err);
    }
  }
  async deleteById(id) {
    try {
      const data = await fs.promises.readFile('./productos.json', 'utf-8');
      let filtro = await JSON.parse(data);
      filtro = filtro.filter((prod) => prod.id !== id);
      await fs.promises.writeFile('./productos.json', `${JSON.stringify(filtro)}`);
      console.log(`El objeto con id:${id} ha sido borrado`);
    } catch (err) {
      console.log('error de lectura', err);
    }
  }
  async deleteAll() {
    try {
      await fs.promises.writeFile('./productos.json', '');
      console.log('Todo ha sido borrado');
    } catch (err) {
      console.log('error de lectura', err);
    }
  }
}

module.exports = { ProductosContainer };
