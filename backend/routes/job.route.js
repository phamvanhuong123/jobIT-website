const express = require('express');
const route = express.Router();
const jobController = require('../controller/job.controller');
// [Get] api/jobs
route.get('/jobs',jobController.getAllJobs);

// [GET] api/jobs/:idCompany
route.get("/jobs/:idCompany",jobController.getJobsbyCompany)

// [GET] api/jobs/detail/:id
route.get("/jobs/detail/:id",jobController.detailJob)

// [Post] api/jobs/create/:idCompany
route.post('/jobs/create/:idCompany',jobController.createJoByCompany)

// [Delete] api/jobs/delete/:id
route.delete('/jobs/delete/:id',jobController.deleteJob)

// [PATCH] api/jobs/update/:id
route.patch("/jobs/update/:id",jobController.updateJob)

module.exports = route;