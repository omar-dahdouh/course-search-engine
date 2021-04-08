const router = require('express').Router();
const { search } = require('./controller/search');

router.get('/', (req, res) => {
    res.json({
        message: 'its working!',
    })
})

router.get('/test', (req, res) => {
    res.json({
        message: 'hello!',
    })
})

router.get('/search/:words', search);

module.exports = router;
