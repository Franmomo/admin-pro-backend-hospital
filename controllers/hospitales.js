//! Controllers/hospitales.js:
const { response, request } = require('express');
const Hospital = require('../models/hospital');


const getHospitales = async( req = request, res = response ) => {

    //* Recuperamos todos los hospitales y seleccionamos el 'usuario'/'nombre' de creación del hospital:
    const hospitales = await Hospital.find()
                                     .populate('usuario', 'nombre email img'); 

    return res.json({
        ok: true,
        // msg: 'getHospitales'
        // hospitales: hospitales
        hospitales
    });
};

const crearHospital = async( req = request, res = response ) => {

    //* req.uid lo tenemos del payload del TOKEN que hemos generado !!!
    const uid = req.uid; 
    
    //* Creamos la nueva instacia de nuestro hospital, hacemos SPREAD del body para extraer el campo
    //* 'usuario' del modelo y asignarle el 'uid' recuperado del TOKEN: 
    // const hospital = new Hospital( req.body );
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {

        //* grabamos 'hospital' en la bdd 
        const hospitalDB = await hospital.save();

        //* enviamos la info del nuevo hospital:
        return res.json({
            ok: true,
            hospital: hospitalDB,
        });
        
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: ' Contactar con el administrador'
            // msg: ' Datos obligatorios para crear Hospital inexistentes'
        });
    };
};

const actualizarHospital = async( req = request, res = response ) => {

    const id  = req.params.id
    const uid = req.uid;

    try {

        const hospitalDB = await Hospital.findById( id );
        if ( !hospitalDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Error hospital no encontrado para ese id',
            });
        };
        
        // const nombre = req.body.nombre;
        const cambiosHospital = {
            ...req.body,
            usuario: uid
        };

        //*  indicamos que después de la actualización se muestre el usuario 'new' actualizado:
        // const hospitalActualizado = await Hospital.findByIdAndUpdate( id, nombre, { new: true } );
        const hospitalActualizado = await Hospital.findByIdAndUpdate( id, cambiosHospital, { new: true } );

        res.json({
            ok: true,
            hospital: hospitalActualizado,
        });

        return res.json({
            ok: true,
            msg: 'actualizarHospital'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: ' Contactar con el administrador'
        });
    }
    
};

const borrarHospital = async( req = request, res = response ) => {

    const id = req.params.id

    try {
        
        const hospitalDeleteDB = await Hospital.findById( id );
        if ( !hospitalDeleteDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Error hospital no encontrado para ese id',
            });
        };
        
        //* Borrar este hospital en la bdd:
        await Hospital.findByIdAndDelete( id );

        res.json({
            ok: true,
            // id,
            hospital: 'Hospital ha sido borrado correctamente',

        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado en borrado datos hospital'
        });
    };
};

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital,
};

