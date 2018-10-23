const router = require('express').Router();

router.use('/polls', require('./polls'));
router.use('/user', require('./user'));

module.exports = router;