const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator/check');
const User = require('./User');
const ContactSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name:
    {

    },
    filename: {
        type: String,
        required: true
    },
    ipfsHash: {
        type: String,

    },
    file: {
        type: String,
        data: Buffer
    },
    date: {
        type: Date,
        default: Date.now
    }
});



module.exports = mongoose.model('file', ContactSchema);