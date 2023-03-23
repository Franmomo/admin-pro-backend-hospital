//! Models/medico.js:

const { Schema, model } = require('mongoose');

const MedicoSchema = Schema({

    nombre: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    hospital: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
    }

});

//* Configuración adicional para regresar de nuestro objeto Hospital unicamente los campos que necesitamos
//* y que serían lo que quedarían en '...object':
MedicoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
}) 

module.exports = model( 'Medico', MedicoSchema );