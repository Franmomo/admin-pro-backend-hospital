/*
    Ruta: /api/hospitales
*/
//! Routes/hospitales.js:
const { Router } = require('express');
const { check } = require('express-validator');
const { getHospitales, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


//* creamos una nueva instancia de nuestro Router(): 
const router = Router();

//* GET => Recibir info de un hospital: 
router.get('/', getHospitales );


//* POST => Crear un hospital, añadimos un middleware (2º argumento)
router.post(
    '/',
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es obligatorio').not().isEmpty(),  
        validarCampos,
    ], 
    crearHospital 
);


//* PUT => Realizamos un PUT para modificar la info de un hospital, por lo tanto tendremos que acceder al '/:id':
router.put(
    '/:id', 
    [],  
    actualizarHospital
);


//* DELETE => Realizamos un DELETE para Borrar la info de un hospital, por lo tanto tendremos que acceder al '/:id':
router.delete(
    '/:id', 
    [],
    borrarHospital
    );


module.exports = router;
