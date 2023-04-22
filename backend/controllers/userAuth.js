const db = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

require("dotenv").config();

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

module.exports.signup = (req, res, next) => {
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.password
  ) {
    return res
      .status(400)
      .json({ message: "Make sure all the info is correct!" });
  }
  if (!emailRegex.test(req.body.email)) {
    return res
      .status(400)
      .json({ message: "Make sure your email is correct!" });
  }
  db.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user !== null) {
        return res.status(409).json({ message: "User exists!" });
      }
      bcrypt
        .hash(req.body.password, parseInt(process.env.BCRYPT_SALT_ROUND))
        .then((hash) => {
          db.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            isAdmin: 0,
          })
            .then((user) =>
              res.status(201).json({ message: "Account Created", user })
            )
            .catch((error) => {
              console.log(error);
              res.status(400).json({ message: "Error creating an account!" });
            });
        })
        .catch((error) => res.status(500).json({ message: "Hash error" }));
    })

    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "database error " });
    });
};

exports.login = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "Incorrect email or password" });
  }

  db.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user == null) {
        return res.status(401).json({ message: "User not found" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ message: "Incorrect password!" });
          }
          const token = jwt.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
            expiresIn: "24h",
          });
          console.log(token);
          res.status(200).json({
            userId: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
            token,
          });
        })

        .catch((error) => {
          console.log(error);
          res.status(500).json({ message: "Can't connect!" });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Database error!" });
    });
};

exports.logout = (req, res) => {
  console.log(req.body);
  req.logout();
  req.session = null;
  res.redirect("/login/auth");
  res.status(200).json({ message: "User logged out!" });
};

exports.getAllUsers = (req, res, next) => {
  console.log("All Users");
  db.User.findAll({
    attributes: ["id", "firstName", "lastName", "email", "imageUrl", "isAdmin"],
  })
    .then((users) => res.status(200).json({ users }))
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Database error" });
    });
};

exports.getOneUser = (req, res, next) => {
  let userId = parseInt(req.params.id);
  if (!userId) {
    return res.json(400).json({ message: "Missing data" });
  }
  db.User.findOne({
    where: { id: req.params.id },
  })
    .then((user) => {
      if (user === null) {
        return res.status(404).json({ message: "User doesn't exist!" });
      }
      return res.status(200).json({ user });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Database error" });
    });
};

exports.updateUserProfil = (req, res, next) => {
  const userObject = req.file
    ? {
        ...req.body.user,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : {
        ...req.body,
      };

  console.log(userObject);

  db.User.findOne({
    where: { id: req.params.id },
  });
  db.User.update(
    {
      ...userObject,
    },
    { where: { id: req.params.id } }
  )

    .then(() => res.status(200).json({ postObject }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteUser = (req, res, next) => {
  console.log("Deleting user account!");
  db.User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      db.User.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: "Profile deleted!" }))
        .catch((error) => {
          console.log(error);
          res.status(400).json({ message: "User not found!" });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};
