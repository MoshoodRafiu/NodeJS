const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const routesData = require('./routes/index');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(routesData.routes);
app.use((req, res) => {
    res.render('404', {
        title: 'Page Not Found'
    });
});

app.listen(3000);