import { Schema, model } from 'mongoose';

const carritosSchema = new Schema({
  name: { type: String, require: true },
  price: { type: Number, require: true },
  thumbnail: { type: String, require: true },
});

export const Carritos = model('carritos', carritosSchema);
