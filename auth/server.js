const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Importa el paquete cors

const app = express();
app.use(cors()); // Usa el middleware cors
const server = http.createServer(app);
const io = socketIo(server);

let isStreaming = false;

app.use(express.urlencoded());

app.post("/auth", function (req, res) {
    /* Server disponible solo para nginx */
    const streamkey = req.body.key;

    /* Se puede hacer una base de datos para guardar las keys */
    if (streamkey === "supersecret"){
        res.status(200).send();
        // Respuesta HTTP
        res.status(200).json({ message: 'Stream started successfully' });
        isStreaming = true;

        // Emite evento al cliente
        io.emit('streaming', { status: 'start' });
        return;
    }

    /* Rechazar el stream  */
    res.status(403).send();
});

app.post("/done", function (req, res) {
    isStreaming = false;
    res.status(200).send();
    res.status(200).json({ message: 'Stream stopped successfully' });

    // Emite evento al cliente
    io.emit('streaming', { status: 'stop' });
});

app.get('/status', (req, res) => {
    // Respuesta HTTP con el estado actual
    res.status(200).json({ streaming: isStreaming });
});

app.listen(8000, function(){
    console.log("Server running on port 8000");
});