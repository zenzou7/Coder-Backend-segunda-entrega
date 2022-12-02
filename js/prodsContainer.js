const { options } = require('../options/mysql.js');
const knex = require('knex')(options);

class Contenedor {
  constructor(table) {
    this.table = table;
  }

  async save(prod) {
    await knex(this.table)
      .insert(prod)
      .then(() => {
        console.log(`Producto ${prod} agregado`);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        knex.destroy();
      });
  }
  /*   async getById(id) {
    try {
      const data = await fs.promises.readFile('./productos.json', 'utf-8');
      let producto = await JSON.parse(data).find((prod) => prod.id == id);
      return producto;
    } catch (err) {
      console.log('error de lectura', err);
    }
  } */
  async getAll() {
    try {
      const productos = await knex(this.table).select('*');
      if (productos.length > 0) {
        return productos;
      } else {
        return [];
      }
    } catch (e) {
      console.log(e);
    } finally {
      knex.destroy();
    }
  }
  async deleteById(id) {
    try {
      knex;
      from(this.table)
        .where('id', '=', id)
        .del()
        .then(() => console.log('Producto eliminado'));
    } catch (e) {
      console.log(e);
    } finally {
      knex.destroy();
    }
  }
  async deleteAll() {
    knex
      .from(this.table)
      .del()
      .then(() => console.log('Productos eliminados'))
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        knex.destroy();
      });
  }
}

module.exports = { Contenedor };
