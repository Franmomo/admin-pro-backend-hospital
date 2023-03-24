/*
    Ruta: /api/medicos
*/
//! Routes/medicos.js:
const { Router } = require('express');
const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');



//* creamos una nueva instancia de nuestro Router(): 
const router = Router();

//* Recibir info de un medico: 
router.get('/', getMedicos );


//* Crear un medico, añadimos un middleware (2º argumento)
router.post(
    '/',
    [
        validarJWT,
        check('nombre', 'El nombre del médico es obligatorio').not().isEmpty(),  
        check('hospital', 'El hospitalID debe ser válido').isMongoId(),  
        validarCampos,
    ], 
    crearMedico
);


//* Realizamos un PUT para modificar la info de un medicos, por lo tanto tendremos que acceder al '/:id':
router.put(
    '/:id', 
    [
        validarJWT,
        check('nombre', 'El nombre del médico es obligatorio').not().isEmpty(),  
        check('hospital', 'El hospitalID debe ser válido').isMongoId(),  
        validarCampos,
    ],  
    actualizarMedico
);


//* Realizamos un DELETE para Borrar la info de un medicos, por lo tanto tendremos que acceder al '/:id':
router.delete(
    '/:id', 
    validarJWT,
    borrarMedico
);


module.exports = router;