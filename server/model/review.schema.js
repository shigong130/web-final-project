const Schema = require('mongoose').Schema;

exports.ReviewSchema = new Schema({
    // recall that _id is provided for us, though we can add other indices
    movieId: Number,
    user: String,
    review: String,
    date: { type: Date, default: Date.now }
// set the collection (i.e., 'table') name below
}, { collection : 'review' });