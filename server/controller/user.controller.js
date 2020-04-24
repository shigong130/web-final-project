const express = require('express');
const router = express.Router();

const UserModel = require('../model/user.model');
const authParser = require('../middleware/middleware_auth.middleware');



router.post('/', async (req, res) => {
    const {email, password, isAdministrator} = req.body;
    if (!email || !password) {
        return res.status(404).send({message: "Must include email AND password"});
    }

    return UserModel.addUser(req.body)
        .then((user) => {
                req.session.email = email;
                req.session.isAdministrator = false;
                if(isAdministrator){
                    req.session.isAdministrator = true;
                }
                return res.status(200).send({email: email, isAdministrator: isAdministrator, favouriteMovie: user.favouriteMovies});
            },
            error => res.status(500).send('Unable to register user, email either in wrong format or already exists.'));
});

router.post('/authenticate', async function (req, res) {
    const {email, password} = req.body;
    UserModel.getUserByUserName(email)
        .then((user) => {
                if(!user) return res.status(400).send("The email provided does not exist.");
                user.comparePassword(password, (error, match) => {
                    if (match) {
                        req.session.email = email;
                        req.session.isAdministrator = user.isAdministrator;
                        return res.status(200).send({email: email, isAdministrator: user.isAdministrator, favouriteMovie: user.favouriteMovies});
                    }
                    return res.status(400).send("The password does not match");
                });
            },
            (error) => console.error(`Something went wrong: ${error}`));
})

router.get('/loggedIn', authParser, function(req, res) {
    return res.sendStatus(200);
})


router.get('/getall', (req, res) => UserModel.getAllUsers()
    .then(users => res.send(users)));

// add to fav movie list.
router.patch('/addfav', authParser, async function (req, res) {
    const email = req.email;
    let entry = await UserModel.getUserByUserName(email);
    let favList = null;
    if(entry){
        favList = entry.favouriteMovies;
        const newFav = req.body.favouriteMovies;
        const id = newFav.movieId

        for( i = 0; i < favList.length; i++){
            if(favList[i].hasOwnProperty('movieId') && favList[i]['movieId'] == id){
                return res.send('already exist');
            }
        }
        favList.push(newFav);
        return UserModel.updateUserEntry(email, {favouriteMovies : favList})
            .then((entry) => res.send(entry),
                (error) => res.status(500).send(error));
    }
})

router.get('/profile', authParser, async function(req, res) {
    return UserModel.getUserByUserName(req.email)
        .then((response) => res.status(200).send(response),
            (error) =>  res.status(404).send(`Error retrieving profile:${error}`));
})


router.get('/logout', function (req, res) {
    if (req.session.email) {
        req.session.destroy();
    }
    res.send('success');
});
router.delete('/fav', authParser, async function (req, res) {
    const email = req.email;
    let entry = await UserModel.getUserByUserName(email);
    let favList = [];

    if(entry){

        return UserModel.updateUserEntry(email, {favouriteMovies : favList})
            .then((entry) => res.send(entry),
                (error) => res.status(500).send(error));
    }
})

router.delete('/:email', authParser, function (req, res) {
    const isAdministrator = req.isAdministrator;

    if(!isAdministrator){
        return res.status(405).send(`You are not an administrator.`)
    }

    const email = req.params.email;
    return UserModel.deleteUserByEmail(email)
        .then(res.status(200).send('success'),
            (error) => res.status(500).send(error));
})



module.exports = router;