//! Validar-jwt.js:

const { request, response } = require('express');
const jwt = require('jsonwebtoken');


const validarJWT = ( req = request, res = response, next ) => {
    
    //* Leer el TOKEN:
    const token = req.header('x-token');
    // console.log(token);

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'Token inexistente en la petición',
        });
    };

    try {
        
        //* Verificamos si el token que nos llega en los 'headers' es correcto: 
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        // console.log(uid);
        req.uid = uid; //* asignamos el 'uid' que recuperamos del token validado !!
        
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido',
        });
    }
}

module.exports = {
    validarJWT,
}

