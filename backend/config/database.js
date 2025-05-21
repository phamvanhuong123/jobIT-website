
const mongoose = require("mongoose");

module.exports.connectMongoDB = async (URL_MONGO) => {
    try{
        await mongoose.connect(URL_MONGO);
       const admin = await mongoose.connection.db.admin();
       const ping = await admin.ping()
       console.log("connect success : " + JSON.stringify(ping));
    }
    catch(error){
        console.log("connect falied"  + error);
    }
}