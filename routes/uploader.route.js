const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.region,
});

const s3 = new AWS.S3();
const upload = multer({
  storage: multerS3({
    acl: "public-read",
    s3,
    bucket: function (req, file, cb) {
      if(file.fieldname==="thumbnail")
      { cb(null, 'mandit-video-server-thumbnails') }
      else if (file.fieldname === "content")
      { cb(null, 'mandit-video-server-contents') }
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
  }),
});
const singleUpload = upload.fields([
  {
    name: "thumbnail" , maxCount:1
  },
  {
    name:"content" , maxCount: 1
  }
]);
module.exports = {
  upload2S3: (req, res) => {
    return new Promise((resolve, reject) => {
      return singleUpload(req, res, function (err) {
        if (err) return reject(err);
        return resolve(req.files);
      });
    });
  },
};
