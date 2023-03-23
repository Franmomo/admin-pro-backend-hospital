/*
    Ruta: /api/todo/:busqueda
*/
//! routes/busquedas.js:

const { Router } = require('express');
const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');

//* creamos una nueva instancia de nuestro Router(): 
const router = Router();

//* GET => Recibir info asociada a la búsqueda realizada:
router.get('/:busqueda', [validarJWT], getTodo );

router.get('/coleccion/:tabla/:busqueda', [validarJWT], getDocumentosColeccion );


module.exports = router;