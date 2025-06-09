const mongoose = require('mongoose');

const OptSchema = new mongoose.Schema({
    email : String,
    codeOtp : String,
    expireAt: {
        type :Date,
        expires: 0 
    }
    
})

const Otp = mongoose.model("Otp",OptSchema,"otps")

module.exports = Otp