const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    fullName: String,
    phoneNumber: String,
    dateOfBirth: Date,
    gender: String,
    address: String,
    city : String,
    personalLink: String,
    about: String,
    currentLevel : String,
    experienceYears : Number,
    workTypes : [String],

    locations : [String],
    education: {
      schoolName: String,
      major: String,

      startDate: Date,
      endDate: Date,
      description: String,
    },

    skills:   {
        technicalSkill: [
          {
            name: String,
            experience: String,
          },
        ],
        softSkill: [String],
      },
    languages : [{
        name : String,
        level : String
    }],
    certifications : [String],
    
    idAccount: String,
  },
  {
    timestamps: true,
  }
);
const Candidate = mongoose.model("Candidate", candidateSchema, "candidates");

module.exports = Candidate;
