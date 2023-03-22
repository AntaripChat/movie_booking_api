const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const movieModel = mongoose.model('Movie', movieSchema);
module.exports = movieModel;