const express = require('express'); // importo express

const bodyParser = require('body-parser'); // importo para bodyparser

/* variables de entorno .env */
require('dotenv').config();
/* habilitar conexion a dominios y demas permisos CORS */
const cors = require('cors');

/* importo la db */
const { dbConnection } = require('./database/config');

/* prueba python script */


const { PythonShell } = require('python-shell');



/* PythonShell.run('my_script.py', null, function(err) {
    if (err) throw err;
    console.log('finished');
}); */

/* const pyshell = new PythonShell('my_script.py');

// sends a message to the Python script via stdin
pyshell.send('hello');

pyshell.on('message', function(message) {
    // received a message sent from the Python script (a simple "print" statement)
    console.log(message);
}); */

// end the input stream and allow the process to exit
/* pyshell.end(function(err, code, signal) {
    if (err) throw err;
    console.log('The exit code was: ' + code);
    console.log('The exit signal was: ' + signal);
    console.log('finished');
}); */


/* -------------------- */



/* crear servidor express */
const app = express();


/* middleware para configurar lectura y parseo del body */
app.use(express.json());

/* configurar cors */
app.use(cors());


/* para poder leer base64 fotos */
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

/* base de datos */
dbConnection();


/* rutas */
/* imagenes */
app.use('/api/imagen', require('./routes/imagenes'));







app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto' + process.env.PORT);
});