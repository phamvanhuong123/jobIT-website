const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    fullName: String,
    phoneNumber: String,
    dateOfBirth: Date,
    gender: String,
    address: String,
    personalLink: String,
    about: String,
    
    education: {
      schoolName: String,
      major: String,
      isCurrentlyStudying: Boolean,
      startDate: Date,
      endDate: Date,
      description: String,
    },
    workExperience: {
      jobTitle: String,
      company: String,
      isCurrentlyWorking: Boolean,
      startDate: Date, // định dạng "YYYY-MM"
      endDate: Date,
      description: String,
      projects: [
        {
          name: String,
          description: String,
        },
      ],
    },
    skills: [
      {
        technicalSkill: [
          {
            name: String,
            experience: String,
          },
        ],
        softSkill: [String],
      },
    ],
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
