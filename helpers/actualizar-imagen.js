//! helpers/actualizar-imagen.js:
const fs = require('fs'); //* paquete ya de NODE

const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

const borrarImagen = ( path ) => {

    //* validamos si ya existe una imagen en el path viejo: 
    if ( fs.existsSync( path) ) {
        //* borrarmos la imagen anterior: 
        fs.unlinkSync( path );
    };
};

const actualizarImagen = async ( tipo, id, nombreArchivo ) => {

    switch (tipo) {
        case 'usuarios': {
            const usuario = await Usuario.findById( id );
            if ( !usuario ) {
                return false;
            }

            //* Borrarmos la imagen anterior: 
            const pathViejo = `./uploads/${ tipo }/${ usuario.img }`; 
            borrarImagen( pathViejo );

            //* Asignamos nuevo archivo a la imagen: 
            usuario.img = nombreArchivo;

            //* Grabamos el usuario con nueva imagen:
            await usuario.save(); 
            return true;                
        }
            
        case 'hospitales': {
            const hospital = await Hospital.findById( id );
            if ( !hospital ) {
                return false;
            }

            //* Borrarmos la imagen anterior: 
            const pathViejo = `./uploads/${ tipo }/${ hospital.img }`; 
            borrarImagen( pathViejo );

            //* Asignamos nuevo archivo a la imagen: 
            hospital.img = nombreArchivo;

            //* Grabamos el hospital con nueva imagen:
            await hospital.save(); 
            return true;        
        }
            
        case 'medicos': {
            const medico = await Medico.findById( id );
            if ( !medico ) {
                return false;
            }

            //* Borrarmos la imagen anterior: 
            const pathViejo = `./uploads/${ tipo }/${ medico.img }`; 
            borrarImagen( pathViejo );

            //* Asignamos nuevo archivo a la imagen: 
            medico.img = nombreArchivo;

            //* Grabamos el médico con nueva imagen:
            await medico.save(); 
            return true;
        }
    
        default:
            break;
    };
};

module.exports = {
    actualizarImagen,
}
