const express = require('express');
const route = express.Router();
const companyController = require('../controller/company.controller')

// [Get] api/companies
route.get('/companies',companyController.getAllCompany);

// [Get] api/companies/:id
route.get('/companies/:id',companyController.detailCompany);

// [POST] api/companies/add (Thêm thông tin công ty)
route.post("/companies/add",companyController.addCompany)

// [Delete] api/companies/delete/:id (Xoa cong ty)
route.delete("/companies/delete/:id",companyController.deleteCompany)

// [Patch]api/companies/update/:id
route.patch("/companies/update/:id",companyController.updateCompany)

module.exports = route