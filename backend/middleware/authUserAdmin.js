const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const isAdmin = decodedToken.isAdmin;
    if (isAdmin !== true) {
      throw "Admin only acces";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error,
    });
  }
};
