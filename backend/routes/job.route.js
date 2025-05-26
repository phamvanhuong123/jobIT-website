const express = require('express');
const route = express.Router();
const jobController = require('../controller/job.controller');
// [Get] api/jobs
route.get('/jobs',jobController.getAllJobs);

// [Post] api/jobs/create/:idCompany
route.post('/jobs/create/:idCompany',jobController.createJoByCompany)

// [Delete] api/jobs/delete/:id
route.delete('/jobs/delete/:id',jobController.deleteJob)

module.exports = route;