const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer");
const postCtrl = require("../controllers/post");
const authJwt = require("../middleware/authJwt");
const readCtrl = require("../controllers/read");

router.post("/new", authJwt, multer, postCtrl.createPost);

router.get("/", authJwt, postCtrl.getAllPost);

router.get("/:id", authJwt, postCtrl.getOnePost);

router.put("/:id", authJwt, multer, postCtrl.modifyPost);

router.delete("/:id", authJwt, multer, postCtrl.deletePost);

router.post("/:postId/read", authJwt, readCtrl.ReadPost);

router.post("/:postId/allRead", authJwt, readCtrl.getAllReadPost);

module.exports = router;
