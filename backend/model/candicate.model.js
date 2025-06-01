const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name : String,
    idAccount : String
},{
    timestamps : true
})
const Candidate = mongoose.model("Candidate",candidateSchema,"candidates");

module.exports = Candidate