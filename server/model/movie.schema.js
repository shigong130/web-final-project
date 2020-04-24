const Schema = require('mongoose').Schema;

exports.MovieSchema = new Schema({
    movieId: { type: Number, index: {unique: true}, required: true},
    title: String,
    overview: String,
    voteAverage: Number,
    releaseDate: String,
    posterPath: String
}, { collection : 'movie' });