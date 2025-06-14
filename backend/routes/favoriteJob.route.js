const express = require('express')
const route = express.Router();
const favoriteJobController = require('../controller/favoriteJob.controller')
route.get('/favorite-jobs/:idCandidate',favoriteJobController.getAllFavoriteJobsByIdCandidate)
route.post('/favorite-jobs/add',favoriteJobController.addFavoriteJob)

module.exports = route