const socket = io();

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
  window.location = 'index.html';
  throw new Error('El escritorio es necesario');
}

const escritorio = searchParams.get('escritorio');

const label = $('small');
console.log(escritorio);

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', () => {
  socket.emit('atenderTicket', {escritorio: escritorio}, (resp) => {
    if (resp === 'No hay más tickets') {
      label.text('No hay más Tickets');
      alert(resp);
      return;
    }
    label.text('Ticket ' + resp.numero);
  });

});
