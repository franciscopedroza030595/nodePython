/* voy a importar para tener las ayudas de res status */
const { response } = require('express');

const { PythonShell } = require('python-shell');

/* modelo para crear ususarios */
const Imagen = require('../models/imagen');
/* genero el JWT */
/* const { generarJWT } = require('../helpers/jwt'); */




/* ------------------------------------------------------------------ */

const crearImagen = async(req, res = response) => {


    const { img } = req.body;



    let pyshell = new PythonShell('my_script.py');

    var myMessage = '';

    /* call python */
    // sends a message to the Python script via stdin
    pyshell.send(JSON.stringify(img));

    function getShellMessage(callback) {
        pyshell.on('message', function(message) {
            // received a message sent from the Python script (a simple "print" statement)

            callback(null, message);


        });

        // end the input stream and allow the process to exit
        pyshell.end(function(err) {
            if (err) {
                callback(err);
            }


        });
    }
    /* -------------------- */


    try {

        getShellMessage(async(err, message) => {
            //message is ready

            /* console.log(message); */
            /* creo instancia del objeto  */
            const imagen = new Imagen({
                imgT: message,
                ...req.body

            });

            /* para grabar en la base de datos  */
            await imagen.save();

            // generar un TOKEN - JWT
            /*         const token = await generarJWT(concurso.id); */


            res.json({
                ok: true,
                imagen,



            });

        });




    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado... revisar logs'
        })
    }


}

/* ------------------------- --------------------------- ----- */

const getImagenes = async(req, res) => {

    try {

        const imagenes = await Imagen.find({}, 'nombre img imgT');




        res.json({
            ok: true,
            imagenes


        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }


}



module.exports = {

    crearImagen,
    getImagenes,

}