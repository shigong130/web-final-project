const mongoose = require("mongoose");
// Recall how exports work in Node.js?
const UserSchema = require('./user.schema');

const UserModel = mongoose.model("User", UserSchema);

function addUser(user) {
    user.email =user.email.toLowerCase();
    return UserModel.create(user);
}

function getUserByUserName(email) {
    return UserModel.findOne({email}).exec();
}

function getAllUsers() {
    return UserModel.find().exec();
}

function updateUserEntry(email, update) {
    return UserModel.updateMany({ email }, { $set: update }).exec();
}

function deleteUserByEmail(email) {
    return UserModel.findOneAndDelete({email}).exec();
}


module.exports = {
    addUser,
    getUserByUserName,
    getAllUsers,
    updateUserEntry,
    deleteUserByEmail
};