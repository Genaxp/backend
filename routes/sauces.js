//importer
const express = require("express");

//fonction Router
const router = express.Router();

const auth = require("../middleware/auth")
const multer = require ("../middleware/multer-config")

const saucesCtrl = require("../controllers/sauces")


//Controllers
// const Sauces= require("../controllers/sauces")
// const Sauce = require("../controllers/sauces")
// const Id = require("../controllers/sauces")
// const Put = require("../controllers/sauces")
// const Delete = require("../controllers/sauces")
// const Like = require("../controllers/sauces")

router.get("/api",auth, saucesCtrl.getSauce)
router.get("/:id",auth,saucesCtrl.singleSauce)
router.post("/api",auth,multer,saucesCtrl.createSauce)
router.put("/:id,",auth,multer,saucesCtrl.updateSauce)
router.delete("/:id",auth,saucesCtrl.deleteSauce)
router.post("/like",auth,saucesCtrl.likeSauce)

//transfert module
module.exports = router;