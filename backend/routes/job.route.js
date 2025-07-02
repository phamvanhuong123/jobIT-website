const express = require('express');
const route = express.Router();
const jobController = require('../controller/job.controller');
const authMiddiware = require('../middleware/authMiddleware')

// [Get] api/jobs
route.get('/jobs',jobController.getAllJobs);

// [GET] api/jobs/:idCompany
route.get("/jobs/:idCompany",jobController.getJobsbyCompany)

// [GET] api/jobs/detail/:id
route.get("/jobs/detail/:id",jobController.detailJob)

// [Post] api/jobs/create/:idCompany
route.post('/jobs/create/:idCompany',authMiddiware.verifyJWT,jobController.createJoByCompany)

// [Delete] api/jobs/delete/:id
route.delete('/jobs/delete/:id',authMiddiware.verifyJWT,jobController.deleteJob)

// [PATCH] api/jobs/update/:id
route.patch("/jobs/update/:id",authMiddiware.verifyJWT,jobController.updateJob)

module.exports = route;