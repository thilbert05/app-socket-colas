const socket = io();

const lblTicket1 = $('#lblTicket1');
const lblTicket2 = $('#lblTicket2');
const lblTicket3 = $('#lblTicket3');
const lblTicket4 = $('#lblTicket4');

const lblEscritorio1 = $('#lblEscritorio1');
const lblEscritorio2 = $('#lblEscritorio2');
const lblEscritorio3 = $('#lblEscritorio3');
const lblEscritorio4 = $('#lblEscritorio4');

socket.on('connect', () => {
  console.log('Conectado con Servidor');
});

socket.on('disconnect', () => {
  console.log('Se perdió la conexión con el servidor');
});

socket.on('estadoActual', (data) => {
  const ultimos4 = data.ultimos4;
  actualizaHTML(ultimos4);
});

socket.on('ultimos4',  (data) => {
  const audio = new Audio('audio/new-ticket.mp3');
  audio.play();
  actualizaHTML(data.ultimos4);
})

const actualizaHTML = (ultimos4) => {
  for (let i = 0; i < ultimos4.length; i++) {
    $(`#lblTicket${i+1}`).text('Ticket ' + ultimos4[i].numero);
    $(`#lblEscritorio${i+1}`).text('Escritorio ' + ultimos4[i].escritorio);
  }
};