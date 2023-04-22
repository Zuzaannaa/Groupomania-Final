const express = require("express");
const router = express.Router();
const userAuth = require("../controllers/userAuth");
const passwordValidation = require("../middleware/passwordValidation");
const authJwt = require("../middleware/authJwt");
const multer = require("../middleware/multer");

router.post("/signup", passwordValidation, userAuth.signup);
router.post("/login", userAuth.login);
router.get("/logout", userAuth.logout);

router.get("/accounts", authJwt, userAuth.getAllUsers);
router.get("/:id", authJwt, userAuth.getOneUser);
router.put("/:id", authJwt, multer, userAuth.updateUserProfil);

router.delete("/:id", authJwt, userAuth.deleteUser);

module.exports = router;
