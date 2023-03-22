//! JWT.js:
const jwt = require('jsonwebtoken');


const generarJWT = ( uid ) => {

    return new Promise( (resolve, reject ) => {

        const payload = {
            // uid: uid,
            uid,
            nombre: 'Francisco Moreno',
        };
    
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '12h'

        }, ( err, token ) => {
            if ( err ) {
                console.log(err);
                reject( 'No se pudo generar el JWT' );
            } else {
                resolve( token );
            };   
        });
    });
}

module.exports = {
    generarJWT,
}