//! Controllers/Auth.js:
const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');


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


const googleSignIn = async( req = request, res = response ) => {
  
    try {
        // const googleUser = await googleVerify( req.body.token );
        const { email, name, picture } = await googleVerify( req.body.token );

        //* Verificamos si existe un usuario en la bdd con ese email que nos llega en la petición frontend: 
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;
        
        if ( !usuarioDB ) {
            //* Si el usuario NO existe lo creamos a partir de los datos recibimos en la autenticación de Google: 
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true,
            });
        } else {
            //* Si ya existe, lo asignamos en nuestro proceso   
            usuario = usuarioDB;
            usuario.google = true; //* se ha autenticado por Google
        };

        //* Grabamos el nuevo usuario o el usuario ya existente actualizado:
        await usuario.save();
        
        //* Generar el TOKEN - JWT:
        const token = await generarJWT( usuario.id );
         

        res.json({
            ok: true,
            email, name, picture,
            token,
            // googleUser,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Token de Google no es correcto',
        });
    };
};


module.exports = {
    loginUsu,
    googleSignIn,
}