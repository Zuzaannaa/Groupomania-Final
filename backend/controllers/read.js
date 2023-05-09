const db = require("../models/index");
const Read = db.Read;
const User = db.User;
const { Post } = require("../models/index.js");

exports.ReadPost = (req, res) => {
  console.log(req.body);
  const read = {
    PostId: req.body.postId,
    postStatus: true,
    UserId: req.body.userId,
  };
  console.log(read);

  Read.create({
    PostId: req.body.postId,
    postStatus: true,
    UserId: req.body.userId,
  })
    .then(() => res.status(201).json({ message: "Post Read" }))
    .catch((error) => res.status(400).json({ message: "Cannot Read" }));
};

exports.getAllReadPost = (req, res) => {
  try {
    Read.findAll({ where: { postId: req.params.postId }, include: User })
      .then((read) => {
        res.status(200).json(read);
      })
      .catch((error) => res.status(400).json(error));
  } catch {
    (error) => res.status(500).json(error);
  }
};
