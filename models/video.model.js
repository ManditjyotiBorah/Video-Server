const mongoose = require("mongoose");


const video_schema = new mongoose.Schema({
    title: {
        type: String,
        required : true 
    },
    thumbnail: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

module.exports = mongoose.model("videos", video_schema);
