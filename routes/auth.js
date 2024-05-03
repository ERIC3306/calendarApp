/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');                             //check es el middeleware(funcion que se ejecuta antes que otra) que se encarga de validar un campo en particular
const { validarCampos } = require('../middlewares/validar-campos');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.post(
    '/new', 
    [ // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),                  //.not.isEpty, el nombre debe ser obligatorio y que no este vacio
        check('email', 'El email es obligatorio').isEmail(),                        //.isEmail, debe tener la estructura de un email
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),  //la contraseña debe tenera minimo 6 caracteres
        validarCampos                                                               //Funcion que muetra el error en caso de que una validacion no se cumpliera                                                              //Funcion a jecutar luego de pasar las validaciones
    ],
    crearUsuario 
);

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario 
);

router.get('/renew', validarJWT ,revalidarToken );


module.exports = router;