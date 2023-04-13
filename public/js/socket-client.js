// Referencias del HTML
const lbOnline   = document.querySelector('#lbOnline');
const lbOffline  = document.querySelector('#lbOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar  = document.querySelector('#btnEnviar');

// Socket
const socket = io();

// Evento - Conexión con el servidor Socket
socket.on('connect', () => {

    console.log("Conectado con el servidor");
    lbOnline.style.display = '';
    lbOffline.style.display = 'none';

});

// Evento - Desconexión con el servidor Socket
socket.on('disconnect', () => {

    console.log("Desconectado del servidor");
    lbOnline.style.display = 'none';
    lbOffline.style.display = '';

});

// Evento - Escuchar canal
socket.on('enviar-mensaje', (payload) => {
    console.log(payload);
});

btnEnviar.addEventListener('click', () => {

    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: '123ABC',
        fecha: new Date().getTime()
    };
    
    socket.emit('enviar-mensaje', payload, (id) => {
        console.log('Desde el server', id); // Enviar un tercer argumento es generar un callback en el backend,
                                            // es decir, hasta que se ejecute ese callback, obtendre una respuesta
                                            // a mi emision
    });

});