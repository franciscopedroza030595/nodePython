/* 
    Path: '/api/imagen'
*/


const { Router } = require('express');
const { crearImagen, getImagenes } = require('../controllers/imagenes');

const router = Router();


router.get('/', getImagenes);


router.post('/', crearImagen);



module.exports = router;