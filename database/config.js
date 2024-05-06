//BD en MONGO
//consutar https://mongoosejs.com/   y   https://cloud.mongodb.com/v2/663410aabb1dcc3f4f13eb29#/security/database/users
//instalar npm i mongoose


const mongoose = require( 'mongoose' );
 
const dbConnection = async () => {
 
    try {
        await mongoose.connect( process.env.DB_CNN || '' );
        console.log( 'DB online' );
 
    } catch ( err ) {
        console.log( err );
        throw new Error( 'Error connecting to the DB' );
    }
};
 
module.exports = {
    dbConnection
};