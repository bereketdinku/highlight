const mongoose = require('mongoose')
const { MongoClient, Int32, Long } = require('mongodb');
const highlightSchema = mongoose.Schema({
    name: {
        type: String
    },
    away: {
        type: String
    },
    fixtureId: {
        type: String
    },
    videoUrl: {
        type: String
    },

    thumbnailsurl: {
        type: String
    },
    thumbnailswidth: {
        type: Number
    },
    thumbnailsheight: {
        type: Number
    },


    pubBefore: {
        type: Date
    },
    pubAfter: {
        type: Date
    }
})
module.exports = mongoose.model('highlight', highlightSchema)