const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/posts', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'posts.html'))
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'home.html'));
});

module.exports = router;