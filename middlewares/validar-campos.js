//PARA FACILITAR LAS VALIDACIONES npm i express-validator

const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next) => {          //el next pasa  a la siguiente linea de codigo en cada uno los midleware hasta llegar a la funcion que se desea ejecutar

    // manejo de errores
    const errors = validationResult( req ); //Nos retorna un objeto de error en caso de que no se cumpla la validacion correspondiente
    if ( !errors.isEmpty() ) {              //Si existe un error ejecuta la respuesta status 400 y las suiguientes propiedades de error
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }


    next();
}

module.exports = {
    validarCampos
}

