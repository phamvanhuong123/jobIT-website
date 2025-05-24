const express = require('express');
const route = express.Router();
const companyController = require('../../controller/client/company.controller')

// [Get] api/companies
route.get('/companies',companyController.getAllCompany);

// [POST] api/companies/add (Thêm thông tin công ty)
route.post("/companies/add",companyController.addCompany)

// [Delete] api/companies/delete/:id (Xoa cong ty)
route.delete("/companies/delete/:id",companyController.deleteCompany)
module.exports = route