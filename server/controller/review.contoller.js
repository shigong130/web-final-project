const express = require('express');
const router = express.Router();

const ReviewAccessor = require('../model/review.model');
const authParser = require('../middleware/middleware_auth.middleware');


router.get('/getall/', (req, res) => {
    return ReviewAccessor.getAllReviewEntries()
        .then((entries) => res.send(entries))
})

router.get('/movieid/:id', async (req, res) => {
    const id = req.params.id;

    try{
        let entry = await ReviewAccessor.getAllReviewEntriesByMovieId(id);
        return res.status(200).send(entry)
    }catch (error){
        res.status(500).send(`Unable to find review by movie id ${id}:${error}`)
    }
})

router.get('/username/:username', async (req, res) => {
    const username = req.params.username;

    try{
        let entry = await ReviewAccessor.findReviewEntryByUsername(username);
        return res.status(200).send(entry)
    }catch (error){
        res.status(500).send(`Unable to find review by given username ${username} :${error}`)
    }
})


router.post('/', authParser, async (req, res) => {
    try {
        const isAdministrator = req.isAdministrator;
        if(isAdministrator){
            res.status(405).send(`Administrator can't add reviews.`);
        }
        let entry = await ReviewAccessor.insertReviewEntry(req.body);
        res.status(200).send(entry)
    } catch (error) {
        res.status(500).send(`Error inserting review:${error}`)
    }
});

router.put('/:id', authParser, (req, res) => {
    const _id = req.params.id;
    return ReviewAccessor.updateReviewEntry(_id,req.body)
        .then((entry) => res.send(entry),
            (error) => res.status(500).send(error));
})

router.delete('/delete-many/:id', authParser, function (req, res) {

    const _id = req.params.id;
    return ReviewAccessor.deleteManyById(_id)
        .then(res.status(200).send('success'),
            (error) => res.status(500).send(error));
})

router.delete('/:id', authParser, function (req, res) {
    const _id = req.params.id;
    return ReviewAccessor.deleteReviewEntryById(_id)
        .then(res.status(200).send('success'),
            (error) => res.status(500).send(error));

})

module.exports = router