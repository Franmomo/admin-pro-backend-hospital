
/*
    Ruta: /api/upload/
*/
//! routes/uploads.js:

const { Router } = require('express');
const expressfileUpload = require('express-fileupload');

const { fileUpload, retornaImagen } = require('../controllers/uploads');
const { validarJWT } = require('../middlewares/validar-jwt');

//* creamos una nueva instancia de nuestro Router(): 
const router = Router();

//* default options
// app.use(fileUpload()); 
router.use( expressfileUpload() ); 


//* PUT => actualizar archivo en bdd:
router.put('/:tipo/:id', [validarJWT], fileUpload );

//* GET => actualizar archivo en bdd:
router.get('/:tipo/:foto', [validarJWT], retornaImagen );


module.exports = router;
