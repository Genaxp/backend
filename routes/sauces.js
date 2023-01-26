//importer
const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const multer = require ("../middleware/multer-config")

const saucesCtrl = require("../controllers/sauces")

//Les routes
router.post("/", auth, multer, saucesCtrl.createSauce)
router.get("/", auth, saucesCtrl.getSauce)
router.get("/:id", auth, saucesCtrl.singleSauce)
router.put("/:id", auth, multer, saucesCtrl.updateSauce)
router.delete("/:id", auth, saucesCtrl.deleteSauce)
router.post("/:id/like", auth, saucesCtrl.likeSauce)

//transfert module
module.exports = router;