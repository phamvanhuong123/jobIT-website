const express = require('express');
const route = express.Router();
const companyController = require('../../controller/client/company.controller')


route.get('/companies',companyController.getAll);

module.exports = route