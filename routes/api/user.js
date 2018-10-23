const mongoose = require('mongoose');
const router = require('express').Router();

router.get("/auth", (req, rest, next) => {
    const fakeAuth = {
        isAuthenticated: false,
        authenticate(cb) {
            this.isAuthenticated = true
            setTimeout(cb, 100)
        },
        signout(cb) {
            this.isAuthenticated = false
            setTimeout(cb, 100)
        }
    }
    res.json(fakeAuth);
});

module.exports = router;