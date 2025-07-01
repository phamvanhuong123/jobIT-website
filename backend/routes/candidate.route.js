const express = require('express')
const route = express.Router();
const candidateController = require('../controller/candidate.controller')
const authMiddiware = require('../middleware/authMiddleware')

// [get] api/candidates
route.get('/candidates',candidateController.getAllCandidate)

// [get] api/candidates/:idAccount
route.get('/candidates/:idAccount',candidateController.detail)

// [post] api/candidates/update/:idAccount
route.post('/candidates/update/:idAccount',authMiddiware.verifyJWT,candidateController.update)
module.exports = route