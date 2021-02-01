//Comando para establecer la conexión con el servidor
const socket = io();

const label = $('#lblNuevoTicket');

socket.on('connect', () => {
  console.log('Conectado con Servidor');
});

socket.on('disconnect', () => {
  console.log('Se perdió la conexión con el servidor');
});

socket.on('estadoActual', (estado) => {
  label.text(estado.actual);
})

$('button').on('click', () => {
  socket.emit('siguienteTicket', null, (siguienteTicket) => {
    label.text(siguienteTicket);
  });
});


