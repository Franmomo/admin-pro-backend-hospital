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

    return res.json({
        ok: true,
        msg: 'actualizarHospital'
    });
};

const borrarHospital = async( req = request, res = response ) => {

    return res.json({
        ok: true,
        msg: 'borrarHospital'
    });
};

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital,
};

