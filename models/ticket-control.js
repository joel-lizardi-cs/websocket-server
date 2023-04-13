const path = require('path');
const fs = require('fs');

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

        this.init();

    }

    get toJson() {
        
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }

    }

    init() {

        const { hoy, tickets, ultimo, ultimos4 } = require('../db/data.json');
        if(hoy === this.hoy) {

            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimos4 = ultimos4;

        } else {

            //Es otro día
            this.guardarDB();

        }

    }

    guardarDB() {

        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));

    }

    siguiente() {

        // Aumentar el valor del ticket
        this.ultimo += 1;

        // Inicializar nuevo ticket con el valor nuevo
        const ticket = new Ticket(this.ultimo, null);

        // Agregar el ticket al arreglo de tickets
        this.tickets.push(ticket);

        // Guardar/sobreescribir en DB el arreglo de tickets
        this.guardarDB();
        
        // Retornar el numero de ticket "generado"
        return 'Ticket ' + ticket.numero;

    }

    atenderTicket(escritorio) {

        //No tenemos tickets
        if(this.tickets.length === 0) return null;

        // Obtener el primer ticket
        const ticket = this.tickets[0];

        // Remover el ticket tomado
        this.tickets.shift();

        // Asignar ticket al escritorio
        ticket.escritorio = escritorio;

        // Agregar el ultimo ticket al principio de la lista de los ultimos 4 tickets generados
        this.ultimos4.unshift(ticket);

        // Verificar que el arreglo de ultimos 4, contenga solo 4 registros, de no ser así, se remueve el ultimo registro del arreglo de ultimos 4
        if(this.ultimos4.length > 4) this.ultimos4.splice(-1,1);

        // Guardamos los cambios en la DB
        this.guardarDB();

        // Retornamos el ticket que se atendera
        return ticket;

    }

}

module.exports = TicketControl;