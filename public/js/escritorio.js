// Referencias HTML
const lbEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lbticket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');

const searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')) {

    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');

}

const escritorio = searchParams.get('escritorio');

lbEscritorio.innerText = escritorio;

divAlerta.style.display = 'none';

// Socket
const socket = io();

// Evento - Conexión con el servidor Socket
socket.on('connect', () => {

    btnAtender.disabled = false;

});

// Evento - Desconexión con el servidor Socket
socket.on('disconnect', () => {

    btnAtender.disabled = true;

});

socket.on('tickets-pendientes', (pendientes) => {

    if(pendientes === 0) {
        lblPendientes.style.display = 'none';
    } else {
        lblPendientes.style.display = '';
        lblPendientes.innerText = pendientes;
    }

});

btnAtender.addEventListener('click', () => {
    
    socket.emit('atender-ticket', {escritorio}, ({ok, ticket, msg}) => {
        
        if(!ok) {

            lbticket.innerText = 'Nadie';
            return divAlerta.style.display = '';

        } 

        lbticket.innerText = `Ticket ${ticket.numero}`;

    });

    /*socket.emit('siguiente-ticket', null, (ticket) => {

        lblNuevoTicket.innerText = ticket;

    });*/

});