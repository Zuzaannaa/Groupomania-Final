const express = require("express");

const router = express.Router();
const auth = require("../middleware/authJwt");
const readCtrl = require("../controllers/read");

router.post("/:id/read", auth, readCtrl.ReadPost);
router.post("/:id/read", auth, readCtrl.getAllReadPost);

module.exports = router;
