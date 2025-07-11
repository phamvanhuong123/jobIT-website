const express = require('express');
const route = express.Router();
const companyController = require('../controller/company.controller')
const authMiddiware = require('../middleware/authMiddleware')

// [Get] api/companies
route.get('/companies',companyController.getAllCompany);

// [Get] api/companies/top
route.get('/companies/top',companyController.getTopCompany);

// [Get] api/companies/:id
route.get('/companies/:id',companyController.detailCompany);

// [POST] api/companies/add (Thêm thông tin công ty)
route.post("/companies/add",companyController.addCompany)

// [Delete] api/companies/delete/:id (Xoa cong ty)
route.delete("/companies/delete/:id",companyController.deleteCompany)

// [Patch]api/companies/update/:id
route.patch("/companies/update/:id",authMiddiware.verifyJWT,companyController.updateCompany)

module.exports = route