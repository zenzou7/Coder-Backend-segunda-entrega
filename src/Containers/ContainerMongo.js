import { connect } from 'mongoose';

const connection = async () => {
  try {
    await connect('mongodb+srv://Leo:62742@coder-backend.3x5udc7.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });
  } catch (e) {
    console.log(e);
    throw 'can not connect to the db';
  }
};

await connection();

class ContenedorMongo {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async getAll() {
    const prods = await this.ruta.find();
    console.log(prods);
    return prods;
  }
  async getById(id) {
    const prod = await this.ruta.find({ _id: id });
    return prod;
  }
  async save(obj) {
    const newProd = new this.ruta(obj);
    const productoGuardad = await newProd.save();
    return console.log('Guardado con exito');
  }
  async update(obj) {
    const usuarioModificado = await this.ruta.updateOne({ name: `${obj.name}` }, { $set: { obj } });
    return console.log('Modificado con exito');
  }
  async delete(name) {
    if (name) {
      const usuarioBorrar = await this.ruta.deleteOne({ name: `${name}` });
      return console.log(`Producto ${name} borrado`);
    } else {
      const deleteAll = await this.ruta.deleteMany({});
      return console.log('Todos los this.ruta borrados');
    }
  }
}

export default ContenedorMongo;
