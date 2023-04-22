const fs = require("fs");
const db = require("../models/index");
const User = db.User;
const Post = db.Post;
const Comment = db.Comment;

const CONTENT_LIMIT = 4;

exports.createPost = (req, res, next) => {
  const postObjet = {
    UserId: req.body.userId,
    content: req.body.content,
  };
  console.log(postObjet);
  if (req.body.content == null) {
    return res.status(400).json({ message: "This field can't be empty" });
  }
  if (req.body.content.lenght <= CONTENT_LIMIT) {
    return res.status(400).json({ message: "Not long enough" });
  }
  if (req.file) {
    Post.create({
      ...postObjet,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    })
      .then(() => res.status(201).json({ message: "Post created" }))
      .catch((error) =>
        res.status(400).json({ message: "Can't publish the post" })
      );
  } else {
    Post.create({
      ...postObjet,
      imageUrl: null,
    })
      .then(() => res.status(201).json({ message: "Post created!" }))
      .catch((error) =>
        res.status(400).json({ message: "Can't publish the post" })
      );
  }
};

exports.getAllPost = (req, res, next) => {
  Post.findAll({
    include: Comment,
    attributes: ["id", "UserId", "content", "imageUrl"],
  })
    .then((posts) => res.status(200).json({ posts }))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({
    attributes: ["UserId", "content", "imageUrl"],
    where: { id: req.params.id },
  })
    .then((post) => res.status(200).json({ post }))
    .catch((error) => res.status(404).json({ error }));
};

exports.deletePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } });

  Post.destroy({ where: { id: req.params.id } })
    .then(() => res.status(201).json("Post deleted"))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {
  Post.findOne({
    where: { id: req.params.id },
    include: db.User,
  });

  const postObject = req.file
    ? {
        ...req.body.post,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : {
        ...req.body,
      };

  Post.update(
    {
      ...postObject,
    },
    { where: { id: req.params.id } }
  )
    .then(() => res.status(200).json({ postObject }))
    .catch((error) => res.status(400).json({ error }));
};
