const express = require("express");
const router = express.Router();
const activityCtrl = require("../controllers/activity");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");

router.post("/addActivity", activityCtrl.addActivity);

router.put("/uploadPicture", auth, multer, activityCtrl.uploadPicture);

router.get("/getActivity", activityCtrl.getActivity);

router.get("/getActivityByUser:id", activityCtrl.getActivityByUser);

router.get("/getAllActivityByUser:id", activityCtrl.getAllActivityByUser);

router.put("/modifyActivity", activityCtrl.modifyActivity);

router.put("/modifyPictureActivity", multer, activityCtrl.modifyPictureActivity);

router.delete("/deleteActivity", activityCtrl.deleteActivity);

module.exports = router;
