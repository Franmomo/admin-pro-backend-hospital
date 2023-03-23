//! controllers/uploads.js:
const path = require('path'); //* paquete ya de NODE
const fs = require('fs'); //* paquete ya de NODE

const { response, request } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');


const fileUpload = async( req = request, res = response ) => {

    //* Recuperamos la info que recibimos por la ruta (router.put('/:tipo/:id'): 
    const tipo  = req.params.tipo;
    const id    = req.params.id;
    // const { tipo, id } = req.params;

    //* Validamos que el tipo informado sea válido dentro de nuestra aplicación: 
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if ( !tiposValidos.includes( tipo ) ) {
        res.status(400).json({
            ok: false,
            msg: 'Tipo de colección inválida'
        });
    }

    //* Validamos que exista un archivo para upload: 
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay archivo para upload',
        });
    };
    
    //* Procesar la imagen: 
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.'); // wolverine.1.3.jpeg
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];
    
    //* Validar extensión:
    const extensionesvalidas = [ 'png', 'jpeg', 'jpg', 'gif', 'webp'];
    if ( !extensionesvalidas.includes( extensionArchivo ) ) {
        res.status(400).json({
            ok: false,
            msg: 'Extensión no válida'
        });
    };
    
    //* Generar nombre del archivo único a partir del paquete UUID:
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;     
    
    //* Path para guardar la imagen en la carpeta uploads/:
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    //* Mover el archivo:  
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
              ok: false,
              msg: 'Error al mover el archivo',
            });
        }

        //* Actualizar la base de datos:
        actualizarImagen( tipo, id, nombreArchivo );        


        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombre: nombreArchivo,
        });
      });
};


const retornaImagen = ( req = request, res = response ) => {

    //* Recuperamos la info que recibimos por la ruta (router.put('/:tipo/:foto'): 
    const tipo  = req.params.tipo;
    const foto  = req.params.foto;
    // const { tipo, foto } = req.params;
    
    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }` );
    
    //* Imagen por defecto:
    if ( fs.existsSync( pathImg ) ) {
        res.sendFile( pathImg );        
    } else {
        const pathImg = path.join( __dirname, `../uploads/no-img.jpg` );
        res.sendFile( pathImg );                
    }


};


module.exports = {
    fileUpload,
    retornaImagen,
}
