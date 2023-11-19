const express = require('express');
const app = express();

app.use(express.urlencoded());

app.post("/auth", function (req, res) {
    /* Server disponible solo para nginx */
    const streamkey = req.body.key;

    /* Se puede hacer una base de datos para guardar las keys */
    if (streamkey === "supersecret"){
        res.status(200).send();
        return;
    }

    /* Rechazar el stream  */
    res.status(403).send();
});

app.listen(8000, function(){
    console.log("Server running on port 8000");
});