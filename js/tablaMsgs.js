const { options } = require('../options/sqlite.js');
const knex = require('knex')(options);

knex.schema
  .createTable('mensajes', (table) => {
    table.increments('id'), table.string('email'), table.string('mensaje'), table.string('fecha'), table.string('hora');
  })
  .then(() => {
    console.log('Tabla creada con exito');
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    knex.destroy();
  });
