const express = require('express'); // Paquete/Dependencia/Framework para generar un sitio Web (API para este proyecto)
const cors = require('cors'); // Middleware para habilitar CORS
const { socketController } = require('../sockets/controller');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT || 3000;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        // Routes Path
        this.paths = {};

        // Middlewares
        this.middlewares();

        // Rutas de la aplicación
        this.routes();

        // Sockets
        this.sockets();

    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Directorio Publico
        this.app.use(express.static('public'));

    }

    routes() {
        
        // API Example
        // this.app.use(this.paths.auth, require('../routes/auth'));

    }

    sockets() {

        this.io.on("connection", socketController);

    }

    listen() {

        this.server.listen(this.port, () => {
            console.log("Servidor corriendo en el puerto ", this.port);
        });

    }

}

module.exports = Server;
