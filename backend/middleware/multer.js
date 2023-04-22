const multer = require("multer");

const MIME_TYPES = {
  "file/jpg": "jpg",
  "file/jpeg": "jpg",
  "file/png": "png",
  "file/gif": "gif",
  "file/bmp": "bmp",
  "file/gif": "gif",
  "file/webp": "webp",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split("").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});
module.exports = multer({ storage: storage }).single("file");
