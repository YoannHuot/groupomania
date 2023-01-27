const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");

router.post("/signup", userCtrl.signup);

router.post("/login", userCtrl.login);

router.get("/profil", auth, userCtrl.profil);

router.get("/:id", auth, userCtrl.showOtherUserProfil);

router.put("/profil/modify", auth, userCtrl.modifyProfil);

router.put("/profil/modify/picture", auth, multer, userCtrl.modifyProfilPicture);

module.exports = router;
