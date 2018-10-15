const router = require('express').Router();

router.use('/polls', require('./polls'));

module.exports = router;