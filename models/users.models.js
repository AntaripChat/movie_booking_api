const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    userId :{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    userType : {
        type: String,
        default: "CUSTOMER"
    },
    userStatus: {
        type: String,
        default: "APPROVED"
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

module.exports = mongoose.model('User', userSchema);