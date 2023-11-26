const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
    name: { type: String },
    age: Number,
    favoriteFoods: [{ type: String, required: true }]
});
const PERSON = mongoose.model('Person ', PersonSchema);
module.exports =PERSON;