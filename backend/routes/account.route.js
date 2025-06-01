const express = require("express")
const route = express.Router();
const accountController = require("../controller/account.controller");

// [POST] api/register
route.post("/register",accountController.RegisterCandicate)

// [POST] api/login
route.post("/login",accountController.loginCandidate)
module.exports = route