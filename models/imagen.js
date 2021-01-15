const { Schema, model } = require('mongoose');


const ImagenSchema = Schema({

    nombre: {
        type: String,

    },

    img: {
        type: String,

    },
    imgT: {
        type: String,

    },


});

/* para cambiar el _id de mongo por uid ; comprobar con postman REAL  */
ImagenSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();

    object.uid = _id;

    return object;
})

/* exporto el modelo para poder crear  */
module.exports = model('Imagen', ImagenSchema);