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
    
    //* Creamos la nueva instacia de nuestro médico, hacemos SPREAD del body para extraer el campo
    //* 'usuario' del modelo y asignarle el 'uid' recuperado del TOKEN: 
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

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

    const id  = req.params.id //? ID del hospital
    const uid = req.uid;      //? ID del usuario

    try {

        const medicoDB = await Medico.findById( id );
        if ( !medicoDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Error médico no encontrado para ese id',
            });
        };
        
        const cambiosMedico = {
            ...req.body,
            usuario: uid
        };

        //*  indicamos que después de la actualización se muestre el médico 'new' actualizado:
        const medicoActualizado = await Medico.findByIdAndUpdate( id, cambiosMedico, { new: true } );

        res.json({
            ok: true,
            hospital: medicoActualizado,
        });
       
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: ' Contactar con el administrador'
        });
    };
};


//* DELETE: 
const borrarMedico = async( req = request, res = response ) => {

    const id = req.params.id

    try {
        
        const medicoDeleteDB = await Medico.findById( id );
        if ( !medicoDeleteDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Error médico no encontrado para ese id',
            });
        };
        
        //* Borrar este médico en la bdd:
        await Medico.findByIdAndDelete( id );

        res.json({
            ok: true,
            // id,
            médico: 'Médico ha sido borrado correctamente',

        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado en borrado datos médico'
        });
    };
};


module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
};

