// Referencias HTML
const lblNuevoTicket = document.querySelector("#lblNuevoTicket");
const btnCrear = document.querySelector("button");

// Socket
const socket = io();

// Evento - Conexión con el servidor Socket
socket.on('connect', () => {

    btnCrear.disabled = false;

});

// Evento - Desconexión con el servidor Socket
socket.on('disconnect', () => {

    btnCrear.disabled = true;

});

socket.on('ultimo-ticket', (ultimo) => {

    lblNuevoTicket.innerText = 'Ticket ' + ultimo;

});

btnCrear.addEventListener('click', () => {
    
    socket.emit('siguiente-ticket', null, (ticket) => {

        lblNuevoTicket.innerText = ticket;

    });

});