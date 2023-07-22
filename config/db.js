require('dotenv').config()
const { default: mongoose } = require("mongoose");

const connectDB = async() => { 
    try {
        /* sii bajo a la versopn anterior de mongoose tengo que setear mongoose */
        /* esto para deployar en render sin complicaciones */
        /* mongoose.set('strictQuery',false) */
        const connection = await mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser:true,
        useUnifiedTopology: true})
        
        console.log(connection.connection);//
        
        const url = `${connection.connection.host}:${connection.connection.port}`

        console.log(`MongoDB connected in ${url}`);
    } catch (error) {
        console.log(error);
    }
 }

 module.exports = connectDB