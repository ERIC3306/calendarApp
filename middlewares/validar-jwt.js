const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = ( req, res = response, next ) => {

    // x-token headers
    const token = req.header('x-token');

    if ( !token ) {                             //Si el token no existe manda el siguinete mensaje de error
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { uid, name } = jwt.verify(       //Verifica que el token del usuario sea el correcto
            token,
            process.env.SECRET_JWT_SEED
        );
        req.uid = uid;
        req.name = name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

    next();
}


module.exports = {
    validarJWT
}
