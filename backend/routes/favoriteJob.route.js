const express = require('express')
const route = express.Router();
const favoriteJobController = require('../controller/favoriteJob.controller')
route.get('/favorite-jobs/:idCandidate',favoriteJobController.getAllFavoriteJobsByIdCandidate)
route.post('/favorite-jobs/add',favoriteJobController.addFavoriteJob)
route.delete('/favorite-jobs/delete/:id',favoriteJobController.deleteFavoriteJob)

module.exports = route