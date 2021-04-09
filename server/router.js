const router = require('express').Router();
const { search } = require('./controller/search');

router.post('/search', search);

module.exports = router;
