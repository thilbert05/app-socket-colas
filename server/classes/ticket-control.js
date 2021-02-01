const { throws } = require('assert');
const fs = require('fs');
const path = require('path');

class Ticket {
  constructor(numero, escritorio) {
    this.numero = numero;
    this.escritorio = escritorio;
  }
}

class TicketControl {
  constructor() {
    this.ultimo = 0;
    this.hoy = new Date().getDate();
    this.tickets = [];
    this.ultimos4 = [];
    const data = require('../data/data.json');

    if (data.hoy !== this.hoy) {
      this.reiniciarConteo();
      
    } else {
      this.tickets = data.tickets;
      this.ultimo = data.ultimo;
      this.ultimos4 = data.ultimos4;
    }
  }

  reiniciarConteo() {
    this.ultimo = 0;
    this.tickets = [];
    this.ultimos4 = [];
    console.log('Se ha inicializado el sistema');
    this.grabarArchivo();
  }

  siguienteTicket() {
    this.ultimo += 1;
    const ticket = new Ticket(this.ultimo, null);
    this.tickets.push(ticket);
    this.grabarArchivo();
    return `Ticket ${this.ultimo}`;
  }

  getUltimoTicket() {
    return `Ticket ${this.ultimo}`;
  }
  
  getUltimos4() {
    return this.ultimos4;
  }


  atenderTicket(escritorio) {
    //verificar tickets pendientes
    if (this.tickets.length === 0) {
      return 'No hay más tickets';
    }
    const numeroTicket = this.tickets[0].numero;
    this.tickets.shift(); //elimina el primer ticket pendiente
    const atenderTicket = new Ticket(numeroTicket, escritorio); //crea un nuevo ticket con el número de ticket pendiente
    this.ultimos4.unshift(atenderTicket);
    if (this.ultimos4.length > 4) {
      this.ultimos4.splice(-1,1); //borra el último elemento
    }
    console.log('últimos 4');
    console.log(this.ultimos4);

    this.grabarArchivo();
    return atenderTicket;
  }

  grabarArchivo() {
    const jsonData = {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimos4: this.ultimos4
    };
    let jsonDataString = JSON.stringify(jsonData);
    const dataPath = path.resolve(__dirname, '..', 'data', 'data.json');
    fs.writeFileSync(dataPath, jsonDataString);
  }
}

module.exports = {
  TicketControl
};