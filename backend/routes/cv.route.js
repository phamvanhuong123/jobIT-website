const express = require('express');
const route = express.Router();
const CvController = require('../controller/cv.controller')

// [get] api/cv/list/:idUser
route.get('/cv/list/:idUser',CvController.getAllCvByUserId)
// api/cv/add/:idUser/:idJob
route.post("/cv/add/:idUser/:idJob",CvController.addCv)
// api/cv/list-cv/:idsJob

route.get("/cv/list-cv/:idsJob",CvController.getAllCvByJob)
route.patch("/cv/update/:id",CvController.updateCv)
module.exports = route