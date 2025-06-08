const express = require('express')
const route = express.Router();
const candidateController = require('../controller/candidate.controller')
route.get('/candidates',candidateController.getAllCandidate)

route.get('/candidates/:idAccount',candidateController.detail)
route.post('/candidates/update/:idAccount',candidateController.update)
module.exports = route