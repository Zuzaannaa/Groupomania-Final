const db = require("../models/index");
const User = db.User;
const Comment = db.Comment;
const Post = db.Post;
const fs = require("fs");
const CONTENT_LIMIT = 2;

exports.addComment = (req, res, next) => {
  console.log(req.body);
  const comment = {
    PostId: req.body.postId,
    content: req.body.content,
    UserId: req.body.userId,
  };
  console.log(comment);
  if (req.body.content == null) {
    return res.status(400).json({ message: "This field can't be empty" });
  }
  if (req.body.content.lenght <= CONTENT_LIMIT) {
    return res.status(401).json({ message: "To short" });
  }

  Comment.create({
    PostId: req.body.postId,
    content: req.body.content,
    UserId: req.body.userId,
    createAt: 0,
  })
    .then(() => res.status(201).json({ message: "Message sent" }))
    .catch((error) => res.status(400).json({ message: "Cannot publish" }));
};

exports.getAllComment = (req, res, next) => {
  Comment.findAll()
    .then((comments) => res.status(200).json(comments))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

exports.getOneComment = (req, res, next) => {
  Comment.findOne({
    where: { id: req.params.id },
    attributes: ["id", "postId", "content", "userId"],
  })
    .then((comment) => res.status(200).json({ comment }))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

exports.deleteComment = (req, res, next) => {
  Comment.findOne({
    where: { Id: req.params.id },
  });
  Comment.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Comment deleted" }))
    .catch((error) => res.status(400).json({ error }));
};
