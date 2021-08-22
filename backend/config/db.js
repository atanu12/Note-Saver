const mongoose = require('mongoose');

const dbConnect = async () =>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true,
            useCreateIndex:true,

        })
        console.log(`Mongo DB connected ${connect.connection.host}`);
    }catch(error){
        console.log(erroe);
    }
}

module.exports = dbConnect;
