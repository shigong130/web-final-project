const mongoose = require("mongoose")
const ReviewSchema = require('./review.schema').ReviewSchema;

const ReviewModel = mongoose.model("Review", ReviewSchema);

function insertReviewEntry(review) {
    review.user = review.user.toLowerCase();
    return ReviewModel.create(review);
}

function getAllReviewEntries() {
    return ReviewModel.find().exec();
}

function getAllReviewEntriesByMovieId(movieId) {
    return ReviewModel.find({movieId}).exec();
}

function findReviewEntryByUsername(user) {
    return ReviewModel.find({user}).exec();
}

function deleteReviewEntryById(_id) {
    return ReviewModel.findOneAndDelete({_id}).exec();
}

function deleteManyById(movieId){
    return ReviewModel.deleteMany({movieId});
}

function updateReviewEntry(_id, update) {
    return ReviewModel.updateMany({ _id }, { $set: update }).exec();
}


module.exports = {
    insertReviewEntry,
    getAllReviewEntries,
    getAllReviewEntriesByMovieId,
    findReviewEntryByUsername,
    deleteReviewEntryById,
    updateReviewEntry,
    deleteManyById
};