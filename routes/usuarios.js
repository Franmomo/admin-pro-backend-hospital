/*
    Ruta: /api/usuarios
*/
//! Routes/usuario.js:

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos'); 
const { getUsuarios, crearUsuarios, actualizarUsuarios, borrarUsuarios } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

//* Recibir info de un usuario 
router.get('/', [ validarJWT ], getUsuarios );


//* Crear un usuario, añadimos un middleware (2º argumento)
// router.post('/', crearUsuarios );
router.post(
    '/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ], 
    crearUsuarios 
);

//* Realizamos un PUT para modificar la info de un usuario, por lo tanto tendremos que acceder al '/:id':
router.put(
    '/:id', 
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos,
    ],  
    actualizarUsuarios,
);

//* Realizamos un DELETE para Borrar la info de un usuario, por lo tanto tendremos que acceder al '/:id':
router.delete(
    '/:id', 
    [
        validarJWT,
        borrarUsuarios,
    ]
    );


module.exports = router;
