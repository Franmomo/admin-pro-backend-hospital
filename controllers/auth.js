//! Controllers/Auth.js:
const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const loginUsu = async( req = request, res = response ) => {

    const { email, password } = req.body;

    try {

        //* Verificar email: 
        const usuarioDB = await Usuario.findOne({ email });
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe usuario con este email',
            });
        }

        //* Verificar password:
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto',
            });
        } 

        //* Generar el TOKEN - JWT:
        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error inesperado en el login',
        });
    };


};



module.exports = {
    loginUsu,
}