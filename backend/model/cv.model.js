const mongoose = require("mongoose");

const CvSchema = new mongoose.Schema(
  {
    idUser: String,
    idJob: String,
    fullName: String,
    phone: string,
    locations: [String],
    coverLetter: string,
    cvUrl: string,
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
    },
    isRead: boolean, 
  },
  {
    timestamps: true,
  }
);
const Cv = mongoose.model("cvs",CvSchema);
module.exports = Cv