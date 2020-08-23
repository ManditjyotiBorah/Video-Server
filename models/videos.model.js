const mongoose = require('mongoose');
const schema = mongoose.Schema;
const videoSchema = new schema({
    title: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
})

const video = mongoose.model('video',videoSchema);

module.exports = video;