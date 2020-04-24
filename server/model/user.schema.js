const Schema = require('mongoose').Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    email: {
        type: String,
        index : true,
        unique: true,
        required: true,
        trim: true,
        match:  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
    },
    password: { type: String, required: true, minlength: 8, maxlength: 12},
    isAdministrator: { type : Boolean, default: false},
    favouriteMovies: [{type:Schema.Types.Mixed}]
}, {collection : 'users'});

UserSchema.pre("save", function(next) {
    // this logic below allows us to protect the password
    // in the case of a user update, but
    // where the password
    if(!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

UserSchema.methods.comparePassword = function(plaintext, callback) {
    return callback(null, bcrypt.compareSync(plaintext, this.password));
};

module.exports = UserSchema;