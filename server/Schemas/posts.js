const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    author: String,
    image: String,
    breed: String,
    category: String,
    content: String,
    numComments: Number,
    date: Date
});

postSchema.set('toObject', {virtuals: true});

module.exports = mongoose.model('Posts', postSchema, 'posts')