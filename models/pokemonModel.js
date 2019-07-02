const mongoose = require('mongoose') ;
const Schema = mongoose.Schema;

const pokeModel = new Schema({
    title: { type: String   },
    author: { type: String }
})

module.exports = mongoose.model('pokemon', pokeModel);