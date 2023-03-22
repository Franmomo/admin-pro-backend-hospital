//! Controllers:
const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


//* GET:
const getUsuarios = async (req, res) => {

    //* Recuperamos los usuarios que existan en la base de datos: 
    // const usuarios = await Usuario.find();
    const usuarios = await Usuario.find({}, 'nombre email role google');

    //* Las API RES siempre se responderán en formato JSON y normalmente se retornan objetos:
    res.json({
        ok:  true,
        // usuarios: 'get Usuarios'
        usuarios, 
        uid: req.uid //* lo hemos obtenido en nuestro middleware/validar-jwt
    });
}

//* POST: 
const crearUsuarios = async (req, res = response ) => {

    const { email, password } = req.body;

    // //* Validación adicional para revisar los posibles errores detectados por nuestros middelwares:
    // const errores = validationResult( req );
    // if ( !errores.isEmpty() ) {
    //     return res.status(400).json({
    //         ok: false,
    //         errores: errores.mapped(),
    //     });
    // };
    

    //* Verificamos si el usuario existe:
    try {

        // const exsiteEmail = Usuario.findOne({ email: email });
        const existeEmail = await Usuario.findOne({ email });
        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'Email ya existe',
            });
        }

        const usuario = new Usuario( req.body );

        //* Encriptar contraseña, con 'salt' generamos un nº de manera aleatoria:
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        
        //* grabamos 'usuario' en la bdd 
        await usuario.save();
        
        //* Generar el TOKEN - JWT:
        const token = await generarJWT( usuario.id );

        //* Las API RES siempre se responderán en formato JSON y normalmente se retornan objetos:
         res.json({
            ok:  true,
            usuario,
            token,
        });
        
    } catch (error) {
        console.log('ERROR !!!', error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs',
        });
    } 

}

//* PUT:
const actualizarUsuarios = async (req = request, res = response ) => {
    
    // TODO: validar token y comprobar si el usuario es correcto

    const uid = req.params.id
    // console.log(req.params);

    try {
        
        const usuarioDB = await Usuario.findById( uid );
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Error usuario no encontrado para ese id',
            });
        };
        
        //* Actualizar este usuario en la bdd:
        // const campos = req.body;
        const { password, google, email, role, ...campos } = req.body;
        
        if ( usuarioDB.email !== email ) {
            // const existeEmail = await Usuario.findOne({ email: email });
            const existeEmail = await Usuario.findOne({ email });
            if ( existeEmail ) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Ya existe usuario con ese email',
                });
            };
        };

        // delete campos.password; //* eliminamos los campos de la req que no queremos actualizar en la bdd
        // delete campos.google;   //* eliminamos los campos de la req que no queremos actualizar en la bdd

        campos.email = email;
        // const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos );
        //  indicamos que después de la actualización se muestre el usuario 'new' actualizado:
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            usuario: usuarioActualizado,

        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado en actualización datos usuario'
        });
    }

}


//* DELETE:
const borrarUsuarios = async (req = request, res = response ) => {

    const uid = req.params.id

    try {
        
        const usuarioDeleteDB = await Usuario.findById( uid );
        if ( !usuarioDeleteDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Error usuario no encontrado para ese id',
            });
        };
        
        //* Borrar este usuario en la bdd:
        await Usuario.findByIdAndDelete( uid );

        res.json({
            ok: true,
            // uid,
            usuario: 'Usuario ha sido borrado correctamente',

        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado en borrado datos usuario'
        });
    }

}

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuarios,
    borrarUsuarios,
}
