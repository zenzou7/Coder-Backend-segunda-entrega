const admin = require('firebase-admin');
const serviceAccount = require('../../firebaseConfig/firebase-priv.json');
const { getFirestore } = require('firebase-admin/firestore');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();

class ContenedorFirestore {
  constructor(ruta) {
    this.ruta = ruta;
  }
  async getAll() {
    const data = await db.collection(this.ruta).get();
    let prods = data.docs.map((item) => {
      return { id: item.id, ...item.data() };
    });
    return prods;
  }
  async getById(id) {
    const data = await db.collection(this.ruta).get(id);
    prod = data.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return prod;
  }
  async save(data) {
    try {
      const prod = await db.collection(this.ruta).doc().set(data);
      return `Producto ${prod.name} agregado`;
    } catch (e) {
      console.log(e);
    }
  }
  async delete(id) {
    const res = await db.collection(this.ruta).doc(id).delete();

    return `Producto ${res} ha sido borrado!`;
  }
  async update(obj) {
    try {
      const prodRef = db.collection(this.ruta).doc(obj.id);

      const res = await prodRef.update({ data });

      return `Producto ${res} updateado!`;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = ContenedorFirestore;
