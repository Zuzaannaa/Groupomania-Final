const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer");
const postCtrl = require("../controllers/post");
const authJwt = require("../middleware/authJwt");

router.post("/new", authJwt, multer, postCtrl.createPost);

router.get("/", authJwt, postCtrl.getAllPost);

router.get("/:id", authJwt, postCtrl.getOnePost);

router.put("/:id", authJwt, multer, postCtrl.modifyPost);

router.delete("/:id", authJwt, multer, postCtrl.deletePost);

module.exports = router;
