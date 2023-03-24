/*
    Ruta: /api/login
*/
//! Routes/Auth.js:

const { Router } = require('express');
const { check } = require('express-validator');
const { loginUsu, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.post(
    '/',
    [
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ],
    loginUsu,
);

router.post(
    '/google',
    [
        check('token', 'El Token de Google es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    googleSignIn,
);


module.exports = router;

