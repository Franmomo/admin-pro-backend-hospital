//! Mongoose: 

//* Importa el paquete de mongoose: 
const mongoose = require('mongoose');


//* función para establecer la conexión:
const dbConnection = async() => {

    try {
        //* cadena conexión a nuestra base de datos: 
        // await mongoose.connect('mongodb+srv://franmomo72:blbVT1v9fBL47XqE@franmomo.ibg8q58.mongodb.net/hospitaldb');
        await mongoose.connect( process.env.DB_CNN );
        console.log('DB Online');

    } catch (error) {
        console.log(error);
        throw new Error ('Error a la hora de iniciar la BD, ver logs ');
    }
} 

module.exports = {
    dbConnection
}
