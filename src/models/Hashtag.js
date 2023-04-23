const mongoose = require('mongoose')

const hashtagSchema = new mongoose.Schema({
    keyword: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true
    },
    tags: {
        type: Array,
        default: []
    }
}, {timestamps: true})

const Hashtag = mongoose.model('Hashtag', hashtagSchema)
module.exports = Hashtag