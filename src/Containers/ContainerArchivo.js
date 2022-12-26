import * as fs from 'fs';

class ContenedorArchivo {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async getAll() {
    try {
      const objs = await fs.promises.readFile(this.ruta, 'utf-8');
      const res = await JSON.parse(objs);

      return res;
    } catch (e) {
      console.log(e);
    }
  }

  async getById(id) {
    const objs = await this.ruta.getAll();
    const buscado = objs.find((o) => o.id == id);

    if (buscado) {
      return buscado;
    }

    return { error: 'No encontrado' };
  }

  async save(obj) {
    console.log('entre');
    try {
      const objs = await this.ruta.getAll();
      let id;

      if (!objs || !objs.length) {
        id = 1;
      } else {
        objs.forEach((o) => {
          id = o.id;
        });

        id = id + 1;
      }

      const guardar = objs && objs.length ? [...objs, { ...obj, id }] : [{ ...obj, id }];

      await fs.writeFile(this.ruta, JSON.stringify(guardar), { encoding: 'utf-8' });
      return 'Guardado con exito!';
    } catch (error) {
      console.log({ error });
      return { error };
    }
  }

  async update(obj) {
    try {
      const objs = await this.getAll();
      const obj = await this.getById(obj.id);

      if (obj) {
        const newObjt = [...objs, obj];
        await fs.writeFile(this.ruta, JSON.stringify(newObjt), { encoding: 'utf-8' });
        return 'Guardado con exito!';
      } else {
        throw new Error('No encontramos un item con ese id');
      }
    } catch (error) {
      return { error };
    }
  }

  async delete(id) {
    try {
      const objs = await this.getAll();
      const obj = await this.getById(id);

      if (!objs || !objs.length || !obj) {
        return { error: 'No encontramos lo que desea borrar' };
      }

      const newObjs = objs.filter((o) => o.id != id);

      await fs.writeFile(this.ruta, newObjs, { encoding: 'utf-8' });

      return 'Borrado con exito';
    } catch (error) {
      return { error };
    }
  }
}

export default ContenedorArchivo;
