const { options } = require('../options/sqlite.js');
const knex = require('knex')(options);

class ContenedorMsgs {
  constructor(table) {
    this.table = table;
  }
  async save(msg) {
    await knex(this.table)
      .insert(msg)
      .then(() => {
        console.log(`mensaje guardado`);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        knex.destroy();
      });
  }

  async getAll() {
    try {
      const mensajes = await knex(this.table).select('*');
      if (mensajes.length > 0) {
        return mensajes;
      } else {
        return [];
      }
    } catch (e) {
      console.log(e);
    } finally {
      knex.destroy();
    }
  }
}
module.exports = { ContenedorMsgs };
