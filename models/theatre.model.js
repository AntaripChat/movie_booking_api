const mongoose = require('mongoose');


const theatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true 
    },
    city :{
        type: String,
        required: true
    },
    pinCode : {
        type: Number,
        required: true
    },
    movies: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Movie"
    },
    createdAt: {
        // I want to default to a new date
        type: Date,
        immutable: true,  // This will ensure the createdAt column is never updated but once in the start
        default: () => {
            return Date.now();
        }
    },
    updatedAt: {
        type: Date,
        default: () => {
            return Date.now();
        }
    }
})

module.exports = mongoose.model('Theatre', theatreSchema);
