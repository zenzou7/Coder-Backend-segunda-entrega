import { Schema, model } from 'mongoose';

const productosSchema = new Schema({
  id: { type: Number, require: true, unique: true },
  name: { type: String, require: true },
  price: { type: Number, require: true },
  thumbnail: { type: String, require: true },
});

export const Productos = model('productos', productosSchema);
