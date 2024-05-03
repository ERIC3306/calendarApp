const { Schema, model } = require('mongoose');

const EventoSchema = Schema({

    title: {
        type: String,               //Debe ser de tipo string
        required: true              //Debe tener si o si el titulo
    },
    notes: {
        type: String,        
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,        //debe tener el id del usuario
        ref: 'Usuario',                     //referencia al mddelo usuario
        required: true
    }

});

EventoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});


module.exports = model('Evento', EventoSchema );