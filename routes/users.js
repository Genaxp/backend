//importer
const express = require("express");

//import middleware password
const password = require("../middleware/password")

//import controllers/users
const userController = require("../controllers/users")

//fonction Router
const router = express.Router();

//endpoint signup
router.post("/signup",password, userController.signup)

//endpoint login
router.post("/login",userController.login)

// transfert du module
module.exports = router;