const mongoose = require('mongoose');

const CvSchema = new mongoose.Schema({
    idUser : String,
    fullName : String,
    

},{
    timestamps : true
})