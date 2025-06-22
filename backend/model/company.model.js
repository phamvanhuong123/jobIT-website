const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    name : String,
    logo : String,
    address : String,
    idAccount : String,
    infor : {
        model : String,
        industry : String,
        country : String,
        workingDay : String,
        size : Number
    },
    contactEmail :String,
    contactPhone : String,
    keySkills : [String],
    description : String,
    whyLove : [String],
    deleted : {
        type : Boolean,
        default : false
    }
},{
    timestamps : true
})
const Company = mongoose.model('Company',companySchema,'companies');

module.exports = Company