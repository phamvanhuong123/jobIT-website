const mongoose = require('mongoose');

const companyReviewSchema = new mongoose.Schema({
    companyId : {
        type : String,
        require : true
    },
    accountId : {
        type : String,
        require : true
    },
    rating : Number,
    title : String,
    // Điều hài lòng nhất về công ty
    positiveFeedback : String,
    // Điều chưa hài lòng hoặc đề xuất cải thiện
    negativeFeedback : String,
    isFlagged : {
        type : Boolean,
        default : false,
        
    }


},{
    timestamps : true
})
const companyReview = mongoose.model("company-reviews",companyReviewSchema);
module.exports = companyReview