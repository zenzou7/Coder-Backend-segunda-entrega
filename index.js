class Usuario {
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
    getFullName() {
        console.log(`My name is ${this.nombre} ${this.apellido}`)
    }
    addMascota(newMascota) {
        this.mascotas.push(newMascota)
    }
    countMascotas() {
        return console.log(this.mascotas.length)
    }
    addBook(name, author) {
        const newBook = {
            nombre: name,
            autor: author
        } 
        this.libros.push(newBook)
    }
    getBooks() {
        let bookNames = this.libros.map(libro => libro.nombre);
        
       return console.log(bookNames);
    }
}

const usuario1 = new Usuario("Dante", "Sparda", [], [])

usuario1.getFullName();

usuario1.addMascota("perro")
usuario1.addMascota("gato")

usuario1.countMascotas()

usuario1.addBook("El señor de las moscas", "William Golding")
usuario1.addBook("Fundacion", "Isaac Asimov")

usuario1.getBooks()