const router = require('express').Router();

router.use('/polls', require('./polls'));
router.use('/users', require('./users'));

module.exports = router;