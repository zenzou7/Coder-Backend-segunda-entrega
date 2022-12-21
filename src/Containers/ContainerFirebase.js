import { getFirestore } from 'firebase-admin/firestore';
/* const admin = require('firebase-admin'); */
import Admin from 'firebase-admin';
const db = getFirestore();

import { initializeApp } from 'firebase/app';
/* const serviceAccount = require('../../firebaseConfig/firebase-priv.json'); */
import serviceAccount from '../../firebaseConfig/firebase-priv.json' assert { type: 'json' };

Admin.initializeApp({
  credential: Admin.credential.cert(serviceAccount),
});

class ContenedorFirestore {
  constructor(ruta) {
    this.ruta = ruta;
  }
  async getAll() {
    const data = await db.collection('productos').get();
    let prods = data.docs.map((item) => {
      return { id: item.id, ...item.data() };
    });
    return prods;
  }
  async getById(id) {
    const data = await db.collection('productos').get(id);
    prod = data.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return prod;
  }
  async save(data) {
    try {
      const prod = await db.collection('productos').doc().set(data);
      return `Producto ${prod.name} agregado`;
    } catch (e) {
      console.log(e);
    }
  }
  async delete(id) {
    const res = await db.collection('productos').doc(id).delete();

    return `Producto ${res} ha sido borrado!`;
  }
  async update(obj) {
    try {
      const prodRef = db.collection('productos').doc(obj.id);

      const res = await prodRef.update({ data });

      return `Producto ${res} updateado!`;
    } catch (e) {
      console.log(e);
    }
  }
}

export default ContenedorFirestore;
