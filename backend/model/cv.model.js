const mongoose = require("mongoose");

const CvSchema = new mongoose.Schema(
  {
    idUser: String,
    idJob: String,
    fullName: String,
    phone: String,
    locations: [String],
    coverLetter: String,
    cvUrl: String,
    isDisplay :{
      type : Boolean,
      default : true
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
    },
    isRead: {
      type : Boolean,
      default : false
    }, 
  },
  {
    timestamps: true,
  }
);
const Cv = mongoose.model("cvs",CvSchema);
module.exports = Cv