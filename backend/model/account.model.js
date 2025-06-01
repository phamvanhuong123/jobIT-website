const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    email : String,
    password : String,
    role : {
        type : String,
        enum : ["company","candidate"]
    },
    deleted : {
        type : String,
        default : false
    }


},{
    timestamps : true
})
const Account = mongoose.model("Account",AccountSchema,"accounts")
module.exports = Account