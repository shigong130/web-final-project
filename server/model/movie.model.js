const mongoose = require("mongoose")
const MovieSchema = require('./movie.schema').MovieSchema;

const MovieModel = mongoose.model("Movie", MovieSchema);

function insertMovieEntry(movie) {
    return MovieModel.create(movie);
}

function getAllMovieEntries() {
    return MovieModel.find().exec();
}

function findMovieEntryById(movieId) {
    return MovieModel.findOne({movieId}).exec();
}

function findMovieEntryByGenre(genre) {
    return MovieModel.find({genre}).exec();
}

function findMovieEntryByName(name) {
    return MovieModel.find({name}).exec();
}

function deleteMovieEntry(movieId) {
    return MovieModel.findOneAndDelete({movieId}).exec();
}

function updateMovieEntry(movieId, update) {
    return MovieModel.updateMany({ movieId }, { $set: update }).exec();
}


module.exports = {
    insertMovieEntry,
    getAllMovieEntries,
    findMovieEntryById,
    findMovieEntryByGenre,
    findMovieEntryByName,
    deleteMovieEntry,
    updateMovieEntry
};
