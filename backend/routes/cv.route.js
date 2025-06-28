const express = require('express');
const route = express.Router();
const CvController = require('../controller/cv.controller')

// [get] api/cv/list/:idUser
route.get('/cv/list/:idUser',CvController.getAllCvByUserId)

route.post("/cv/add/:idUser/:idJob",CvController.addCv)
module.exports = route