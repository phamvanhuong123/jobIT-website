const express = require('express');
const route = express.Router();
const jobController = require('../../controller/client/job.controller');

route.get('/jobs',jobController.getAllJobs);

module.exports = route;