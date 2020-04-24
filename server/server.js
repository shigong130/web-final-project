const express = require('express');

const movie = require('./controller/movie.controller')
const review = require('./controller/review.contoller')
const user = require('./controller/user.controller')

const app = express();

const mongoose = require('mongoose');
const cookieParse = require('cookie-parser')

// This is the default address for MongoDB.
// Make sure MongoDB is running!

// process.env.MONGODB_URI ||


const mongoEndpoint = 'mongodb://127.0.0.1/movie_app';
// useNewUrlParser is not required, but the old parser is deprecated
mongoose.connect(mongoEndpoint, { useNewUrlParser: true });
// Get the connection string
const db = mongoose.connection;

const session = require('express-session')
//...
// This will manage our sesssion data.
// We can use our secret from our JWT tokens
const MongoStore = require('connect-mongo')(session);

app.use(session({secret: process.env.SUPER_SECRET || "SUPER_SECRET",
    store: new MongoStore({
        mongooseConnection : db,
    })}));
// This will create the connection, and throw an error if it doesn't work
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

app.use(cookieParse());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Note that it is common practice got backend APIs in Node to start with the api prefix
// to distinguish them from frontend routes

app.use('/api/movie', movie);
app.use('/api/review', review);
app.use('/api/user', user);


app.listen(3001, function() {
    console.log('Starting server');
});