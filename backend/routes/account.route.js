const express = require("express")
const route = express.Router();
const accountController = require("../controller/account.controller");
const authMiddiware = require('../middleware/authMiddleware')
// [GET] api/auth/verify-token
route.get('/auth/verify-token',authMiddiware.verifyJWT,accountController.verifyToken)
// [POST] api/register
route.post("/register",accountController.RegisterCandicate)

// [POST] api/register-otp
route.post("/register-otp",accountController.RegisterOtp)

// [POST] api/login
route.post("/login",accountController.loginCandidate)

// [GET] api/accounts
route.get('/accounts',accountController.getAllAccount)
// [DELETE] api/accounts/delete/:idAccount
route.delete('/accounts/delete/:email',accountController.deleteAccount)
module.exports = route