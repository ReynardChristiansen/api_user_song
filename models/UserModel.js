const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
    song_id: {
        type: String,
        required: true
    },
    song_name: {
        type: String,
        required: true
    },
    song_image: {
        type: String,
        required: true
    },
    song_url: {
        type: String,
        required: true
    }
});

const userSchema = new Schema({
    user_name: {
        type: String,
        required: true,
        index: true
    },
    user_password: {
        type: String,
        required: true
    },
    user_role: {
        type: String,
        required: true
    },
    songs: [songSchema]
}, { timestamps: true });

module.exports = mongoose.model('User_Song', userSchema);
