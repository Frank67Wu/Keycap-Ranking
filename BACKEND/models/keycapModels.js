const mongoose = require('mongoose')

const Schema = mongoose.Schema

const keycapSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    designer: {
        type: String,
    },
    gbStart: { 
        type: Date,
        required: true
    },
    gbEnd: {
        type: Date
    },
}) 

module.exports = mongoose.model('Keycap', keycapSchema)