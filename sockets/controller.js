
const socketController = (socket) => {

    console.log("Cliente Conectado", socket.id);

    socket.on('disconnect', () => {
   
        console.log('Cliente desconectado', socket.id);

    });

    // receive a message from the client
    socket.on("enviar-mensaje", (payload, callback) => {    // El primer argumento ("payload") es el mensaje que envio el cliente por el canal (En este caso el canal se llama "enviar-mensaje") 
                                                            // Si el cliente envia un tercer argumento, significa que espera una respuesta a su emision
        socket.broadcast.emit('enviar-mensaje', payload); // Desde el back puedo emitir un mensaje ("Respuesta global") para todos aquellos clientes que tienen de escucha al canal (En este caso del canal "enviar-mensaje")

        const id = 123456789;
        callback(id); // Generalmente en el back se recibe como "callback", y es en este mismo donde se devuelve una respuesta, ejecutandolo como si fuera una función

    });

}

module.exports = {
    socketController
}