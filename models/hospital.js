//! Models/hospital.js:

const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({

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
    }
}, { collection: 'hospitales' }); //* para cambiar el nombre en la bdd

//* Configuración adicional para regresar de nuestro objeto Hospital unicamente los campos que necesitamos
//* y que serían lo que quedarían en '...object':
HospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
}) 

module.exports = model( 'Hospital', HospitalSchema );