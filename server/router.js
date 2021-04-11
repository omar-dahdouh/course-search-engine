const router = require('express').Router();
const { search, suggest } = require('./controller/search');

router.post('/search', search);
router.post('/suggest', suggest);

module.exports = router;
