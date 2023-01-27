const express = require("express");
const router = express.Router();
const likesCtrl = require("../controllers/likes");
const auth = require("../middleware/auth");

router.post("/likes", auth, likesCtrl.likes);

module.exports = router;
