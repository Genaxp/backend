//importer
const express = require("express");

//Controllers
const saucesController= require("../controllers/sauces");
const createSauces = require ("../controllers/sauces")

//fonction Router
const router = express.Router();

router.get("api/sauces",saucesController.sauces)

router.post("api/sauces",createSauces.sauces)

//transfert module
module.exports = router;