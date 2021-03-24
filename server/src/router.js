const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({
        message: 'its working!',
    })
})

router.get('/test', (req, res) => {

    res.jsons({
        message: 'hello!',
    })
})




module.exports = router;
