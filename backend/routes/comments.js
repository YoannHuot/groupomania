const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/comments");
const auth = require("../middleware/auth");

router.post("/comments", auth, commentsCtrl.comments);
router.get("/getComments", commentsCtrl.getComments);
router.delete("/deleteComments", commentsCtrl.deleteComments);
router.put("/modifyComments", commentsCtrl.modifyComments);

module.exports = router;
