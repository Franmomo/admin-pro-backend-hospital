//! controllers/medicos.js:
const { response, request } = require('express');
const Medico = require('../models/medico');


//* GET: 
const getMedicos = async( req = request, res = response ) => {

    //* Recuperamos todos los médicos y seleccionamos el 'usuario'/'nombre' de creación del hospital:
    const medicos = await Medico.find()
                                     .populate('usuario', 'nombre email img') 
                                     .populate('hospital', 'nombre img'); 

    return res.json({
        ok: true,
        // msg: 'getMédicos'
        // medicos: medicos
        medicos,
    });
};


//* POST: 
const crearMedico = async( req = request, res = response ) => {

    //* req.uid lo tenemos del payload del TOKEN que hemos generado !!!
    const uid = req.uid; 
    
    //* Creamos la nueva instacia de nuestro hospital, hacemos SPREAD del body para extraer el campo
    //* 'usuario' del modelo y asignarle el 'uid' recuperado del TOKEN: 
    // const hospital = new Hospital( req.body );
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });
    console.log(medico);

    try {

        //* grabamos 'médico' en la bdd 
        const medicoDB = await medico.save();

        //* enviamos la info del nuevo médico:
        return res.json({
            ok: true,
            medico: medicoDB,
        });
        
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: ' Contactar con el administrador'
        });
    };
};


//* PUT: 
const actualizarMedico = async( req = request, res = response ) => {

    return res.json({
        ok: true,
        msg: 'actualizarMedico'
    });
};


//* DELETE: 
const borrarMedico = async( req = request, res = response ) => {

    return res.json({
        ok: true,
        msg: 'borrarMedico'
    });
};

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
};

