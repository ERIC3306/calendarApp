const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = async( req, res = response ) => {

    const eventos = await Evento.find()
                                .populate('user','name');       //find, Obtiene todos los eventos
                                                                //populate, rellena(obtiene tambien la propiedad de name del usuario) los datos del usuario

    res.json({
        ok: true,
        eventos
    });
}

const crearEvento = async ( req, res = response ) => {

    const evento = new Evento( req.body );

    try {
        evento.user = req.uid;
        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const actualizarEvento = async( req, res = response ) => {
    
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById( eventoId );

        if ( !evento ) {                        //Si el evento no existe despliega el siguiente mensaje de error
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if ( evento.user.toString() !== uid ) {     //si el usuario es diferente al id del usuario(un usuario diferente al que creo el evento) marca el siguiente error
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );       //findByIdAndUpdate, busca un elemento por el id y lo actualiza
                                                                                                                //id del evento que se quiere actualizar
                                                                                                                //nueva evento que se quiere actualizar en la data
                                                                                                                //{ new: true }, retorna el ultimo evento ya actualizado en el post(a travez de postman en este caso)
        res.json({
            ok: true,
            evento: eventoActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const eliminarEvento = async( req, res = response ) => {

    const eventoId = req.params.id;             //asigna el id que viene desde el url en eventoId
    const uid = req.uid;                        //id del usuario

    try {
        const evento = await Evento.findById( eventoId );
        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            });
        }

        await Evento.findByIdAndDelete( eventoId );     //findByIdAndUpdate, busca un elemento por el id y lo elimina
        res.json({ ok: true });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}