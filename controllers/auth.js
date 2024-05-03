//PARA ENCRIPTACION DE CONTRASENIAS, npm i bcryptjs

const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');
 
const crearUsuario = async(req, res = response ) => {

    const { email, password } = req.body;       //El body contiene el objeto del post

    try {
        let usuario = await Usuario.findOne({ email });         //Busca en la BD el email dentro de todos los objetos(usuario)
        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        }
 
        usuario = new Usuario( req.body );
    
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        //Guadar usuario en la base de datos
        await usuario.save();

        // Generar JWT, nos permiten manejar el estado de sesion del usuario de forma pasiva 
        const token = await generarJWT( usuario.id, usuario.name );
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token                       //token:token, token es igual al valor del token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}


const loginUsuario = async(req, res = response ) => {

    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });
        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name );

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}


const revalidarToken = async (req, res = response ) => {

    const { uid, name } = req;

    // Generar JWT
    const token = await generarJWT( uid, name );

    res.json({
        ok: true,
        token
    })
}



module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}