const mongoose = require('mongoose');

const FavoriteJobsSchema = new mongoose.Schema({
    idCandidate : {
        type : mongoose.Types.ObjectId,
        require : true
    },
    idJob : {
        
        type : mongoose.Types.ObjectId,
        require : true
    
    },

},{
    timestamps : true
})
const FavoriteJobs = mongoose.model("favorite-jobs",FavoriteJobsSchema);
module.exports = FavoriteJobs