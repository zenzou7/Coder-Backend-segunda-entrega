const socket = io();
socket.on('connect', () => {
  console.log('me conecte!');
});

function sendMsg() {
  const msg = document.getElementById('msg').value;
  const email = document.getElementById('email').value;
  socket.emit('msg', { email: email, mensaje: msg });
}

socket.on('msg-list', (data) => {
  let mensaje = document.getElementById('messages');
  mensaje.innerHTML = ``;

  data.forEach((obj) => {
    let html = '';

    html = `
    <div class="message">
      <p class="message__email">${obj.email}</p>
      <p class="message__date">fecha: ${obj.fecha} hora:${obj.hora}</p>
      <p class="message__msg">dijo: ${obj.mensaje}</p>
    </div><br>
    `;
    mensaje.innerHTML += html;
  });
});

function sendTable() {
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const thumbnail = document.getElementById('thumbnail').value;
  socket.emit('sendTable', { name: name, price: price, thumbnail: thumbnail });
}

socket.on('prods', (data) => {
  let tabla = document.getElementById('prods__table');
  tabla.innerHTML = ``;
  let html = ` 
    <TR>
      <TD>Nombre</TD> <TD>precio</TD> <TD>Imagen</TD>
    </TR>`;
  data.forEach((item) => {
    html += `       
      <TR class="prods__item">
        <TD class="prods__item">${item.name}</TD> <TD class="prods__item">$${item.price}</TD> <TD class="prods__item"><img class="prods__img"src="${item.thumbnail}"></TD>
      </TR>
      `;
  });
  tabla.innerHTML += html;
});
