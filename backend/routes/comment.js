const express = require("express");
const router = express.Router();
const authJwt = require("../middleware/authJwt");
const commentCtrl = require("../controllers/comment");

router.post("/new", authJwt, commentCtrl.addComment);

router.get("/:id", authJwt, commentCtrl.getOneComment);

router.get("/", authJwt, commentCtrl.getAllComment);

router.delete("/:id", authJwt, commentCtrl.deleteComment);

module.exports = router;
