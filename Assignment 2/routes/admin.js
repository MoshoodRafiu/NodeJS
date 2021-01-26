const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/new', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'new-post.html'));
});

router.post('/new', (req, res) => {
    console.log(req.body)
    res.sendFile(path.join(__dirname, '..', 'views', 'new-post.html'));
});

module.exports = router;