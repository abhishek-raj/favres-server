// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var favSchema = new Schema({
    latlng: { type: String, required: true},
    name: { type: String, required: true },
    place: { type: String, required: true },
    username: { type: String, required: true },
    notes: [String]
});

// the schema is useless so far
// we need to create a model using it
var Fav = mongoose.model('Fav', favSchema);

// make this available to our users in our Node applications
module.exports = Fav;