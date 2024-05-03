//PARA TRABAJAR CON LOS JWT     npm i jsonwebtoken

const jwt = require('jsonwebtoken');


const generarJWT = ( uid, name ) => {

    return new Promise( (resolve, reject) => {
        const payload = { uid, name };

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'                                     //Tiempo en el que exipa el token y se elimina
        }, (err, token ) => {

            if ( err ){
                console.log(err);
                reject('No se pudo generar el token');
            }

            resolve( token );
        })
    })
}


module.exports = {
    generarJWT
}


