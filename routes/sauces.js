//importer
const express = require("express");

//Controllers
const Sauces= require("../controllers/sauces")
const Sauce = require("../controllers/sauces")
const Id = require("../controllers/sauces")
const Put = require("../controllers/sauces")
const Delete = require("../controllers/sauces")
const Like = require("../controllers/sauces")

//fonction Router
const router = express.Router();

router.post("/sauces",Sauces.createSauces)

router.get("/sauces",Sauce.getSauces)

router.get("/:id",Id.singleSauce)

router.put("/:id,", Put.updateSauce)

router.delete("/:id",Delete.deleteSauce)

router.post("/like",Like.likeSauce)

//transfert module
module.exports = router;