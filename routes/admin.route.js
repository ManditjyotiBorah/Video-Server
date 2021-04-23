const express = require("express");
const router = express.Router();
const video = require("../models/video.model");
const uploader = require("./uploader.route");

router.post("/login", (req, res) => {
  if (req.body.username === "Mandit" && req.body.password === "mandit") {
    res.send("/manage");
  }
});

router.post("/upload-video", (req, res) => {
    uploader.upload2S3(req, res).then((url) => {
        if (!url.thumbnail[0].location || !url.content[0].location) {
            res.error("Upload failed")
        }
    const new_video = new video({
      title: req.body.title,
      thumbnail: url.thumbnail[0].location,
      link: url.content[0].location,
    });
    new_video
      .save()
      .then((data) => {
        res.send("/manage");
      })
      .catch((error) => {
        res.json(error);
      });
  });
});

module.exports = router;
