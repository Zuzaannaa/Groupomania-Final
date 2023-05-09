const { log } = require("console");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const extractBearer = (authorization) => {
  if (typeof authorization !== "string") {
    return false;
  }

  const matches = authorization.match(/(bearer)\s+(\S+)/i);
  return matches && matches[2];
};

const authJwt = (req, res, next) => {
  const token =
    req.headers.authorization && extractBearer(req.headers.authorization);
  console.log("HEADERS:", req.headers);
  console.log("TOKEN:", token);

  if (!token) {
    return res.status(401).json({ message: "token not detected" });
  }

  jwt.verify(token, "RANDOM_TOKEN_SECRET", (err, decodedToken) => {
    console.log("ERR TOKEN:", err);
    console.log("DECODED TOKEN:", decodedToken);
    if (err) {
      return res.status(401).json({ message: "failed" });
    }
    next();
  });
};
module.exports = authJwt;
