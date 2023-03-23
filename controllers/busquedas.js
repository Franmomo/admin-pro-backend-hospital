//! Controllers/busquedas.js:

const { response, request } = require('express');
const Usuarios = require('../models/usuario');
const Hospitales = require('../models/hospital');
const Medicos = require('../models/medico');


const getTodo = async( req = request, res = response ) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' ); //* por el tema de case sensitive

    //* Recuperamos todos los registro coincidentes con la 'búsqueda':
    // const usuBusqueda = await Usuarios.find({ nombre: busqueda });
    // const usuBusqueda = await Usuarios.find({ nombre: regex });
    // const hospitalBusqueda = await Hospitales.find({ nombre: regex });
    // const medicoBusqueda = await Medicos.find({ nombre: regex });

    const [ usuBusqueda, hospitalBusqueda, medicoBusqueda ] = await Promise.all([
            Usuarios.find({ nombre: regex }),
            Hospitales.find({ nombre: regex }),
            Medicos.find({ nombre: regex }),
    ]);

    return res.json({
        ok: true,
        busqueda,
        usuBusqueda,
        hospitalBusqueda,
        medicoBusqueda,
    });
}

const getDocumentosColeccion = async( req = request, res = response ) => {

    const tabla     = req.params.tabla;
    const busqueda  = req.params.busqueda;

    //* hacemos la búsqueda 'insensible' por el tema de case sensitive, etc:
    const regex     = new RegExp( busqueda, 'i' ); 

    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medicos.find({ nombre: regex })
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');
                                break;
                                
                                
        case 'hospitales':
            data = await Hospitales.find({ nombre: regex })
                                   .populate('usuario', 'nombre img'); 
            break;

        case 'usuarios':
            data = await Usuarios.find({ nombre: regex });
            break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
            });
    
        };
        
    res.json({
        ok: true,
        colección: tabla,
        resultados: data,
    });

};

module.exports = {
    getTodo,
    getDocumentosColeccion,
}