const path = require('path');

const express = require('express');

const router = express.Router();

const users = [];

router.get('/', (req, res) => {
    res.render('home', {
        title: 'Home'
    })
});

router.post('/', (req, res) => {
    users.push({name: req.body.name});
    res.status(301).redirect('/');
});

router.get('/users', (req, res) => {
    res.render('users', {
        title: 'Users',
        users
    })
});

module.exports = {
    routes: router
}