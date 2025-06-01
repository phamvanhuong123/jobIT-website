const express = require("express")
const route = express.Router();
const userController = require("../controller/user.controller");
route.post("/register",userController.RegisterCandicate)

module.exports = route