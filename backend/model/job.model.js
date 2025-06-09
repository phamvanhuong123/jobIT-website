const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    idCompany : String,
    name : String,
    skills : [String],
    logo : String,
    locations : [String],
    salary : {
        min : Number,
        max : Number,
        currency : String
    },
    workplace : String,
    jobDescription : [String],
    level : String,
    requirements : {
        degree : [String],
        softSkills : [String],
        technicalSkills : [String],
        advantages : [String]
    },
    status : String,
    deleted : {
        type : Boolean,
        default : false
    }
},{
    timestamps : true
})

const Job = mongoose.model("Job",jobSchema,"jobs");
module.exports = Job;
