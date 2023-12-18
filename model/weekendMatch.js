const mongoose = require('mongoose')
const weekendMatchSchema = mongoose.Schema({
    name: {
        type: String
    },
    away: {
        type: String
    },
    fixtureId: {
        type: String
    },
    fixtureDate: {
        type: Date
    }
})
module.exports = mongoose.model('weekendmatch', weekendMatchSchema)