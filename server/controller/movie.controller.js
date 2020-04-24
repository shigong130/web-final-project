const express = require('express');
const router = express.Router();

const MovieAccessor = require('../model/movie.model');
const authParser = require('../middleware/middleware_auth.middleware');


router.get('/getall/', (req, res) => {
    return MovieAccessor.getAllMovieEntries()
        .then((entries) => res.send(entries))
})

router.get('/movieid/:id', async (req, res) => {
    const id = req.params.id;

    try{
        let entry = await MovieAccessor.findMovieEntryById(id);
        return res.status(200).send(entry)

    }catch (error){
        res.status(500).send(`Unable to find movie Entry:${error}`)
    }
})

router.get('/', async (req, res) => {
    const genre = req.query.genre;
    const name = req.query.name;

    try{

        let entry = await MovieAccessor.findMovieEntryByGenre(genre);
        if(entry && entry.genre){
            return res.status(200).send(entry);
        }
        entry = await MovieAccessor.findMovieEntryByName(name);
        return res.status(200).send(entry);
    }catch (error){
        res.status(500).send(`Unable to find movie Entry:${error}`)
    }
})

router.post('/', async (req, res) => {
    try {
        let entry = await MovieAccessor.findMovieEntryById(req.body.movieId);
        if (entry) {
            return res.status(403).send('Given movie already exists');
        }
        entry = await MovieAccessor.insertMovieEntry(req.body);
        res.status(200).send(entry)
    } catch (error) {
        res.status(500).send(`Error inserting movie Entry:${error}`)
    }
});

router.put('/:movieid/', authParser, (req, res) => {
    const isAdministrator = req.isAdministrator;

    if(!isAdministrator){
        return res.status(405).send(`You are not an administrator.`)
    }

    const movieId = req.params.movieid;
    return MovieAccessor.updateMovieEntry(movieId,req.body)
        .then((entry) => res.send(entry),
            (error) => res.status(500).send(error));
})

router.delete('/:movieid', authParser, function (req, res) {
    const isAdministrator = req.isAdministrator;

    if(!isAdministrator){
        return res.status(405).send(`You are not an administrator.`)
    }

    const movieId = req.params.movieid;
    return MovieAccessor.deleteMovieEntry(movieId)
        .then(res.status(200).send('success'),
            (error) => res.status(500).send(error));
})

module.exports = router