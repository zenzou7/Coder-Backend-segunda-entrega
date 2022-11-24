## RUTA PRODUCTOS

# Get /api/productos

Traera toda la lista de productos en el archivo productos.json

# Get /api/poductos/:id

Traera un producto del archivo productos.json segun su id, si no existe traera 'producto inexistente'

# Post /api/productos/

form Recibe un objeto por el form en index.html o puede ser enviado por postman

# Put /api/productos/:id

Actualiza un producto ya existente por medio de postman

# Delete /api/productos/:id

Elimina un producto del array de productos en el archivo productos.json

# Get /api/productos/\*

Traera el mensaje 'ruta inexistente' cuando se ingrese que no es ninguna de las anteriores mencionadas

## RUTA CARRITOS

# Get /api/carritos/:id/productos

Traera un carrito por su id de carrito y todos los productos en el

# Post /api/carritos

Creara un nuevo objeto carrito en el archivo carritos.json y devolvera su id

# Post /api/carritos/:id/productos

Permite agregar un objeto producto a un carrito segun su id de carrito

# Delete /api/carritos/:id

Permite borrar un objeto carrito entero del archivo carritos.json por su id de carrito

# Delete /api/carritos/:id/productos/:id_prod

Permmite eliminar un objeto producto segun su id de producto en el array productos de un carrito segun su id carrito (':id = id de carrito'), (':id_prod' = id de producto)
