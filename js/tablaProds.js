const { options } = require('../options/mysql.js');
const knex = require('knex')(options);

knex.schema
  .createTable('productos', (table) => {
    table.increments('id'), table.string('name'), table.integer('price'), table.string('thumbnail');
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

knex('productos')
  .insert([
    { name: 'Calculadora', price: 234, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png' },
    { name: 'Globo Terráqueo', price: 345, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png' },
    { name: 'Espada', price: 999, thumbnail: 'https://amaterasu.com.ar/wp-content/uploads/2017/06/saber.jpg' },
    { name: 'Escudo', price: 777, thumbnail: 'https://thumbs.dreamstime.com/b/escudo-de-oro-del-metal-aislado-44256777.jpg' },
    { name: 'Lanza', price: 650, thumbnail: 'https://m.media-amazon.com/images/I/31JhTDklAeL._AC_SY1000_.jpg' },
    { name: 'Arco', price: 888, thumbnail: 'https://www.armeriacanigo.com.ar/wp-content/uploads/9840_1-324x324.jpg' },
  ])
  .then(() => {
    console.log('productos agregados');
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    knex.destroy();
  });
