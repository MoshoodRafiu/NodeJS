const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes/index');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))
app.use(routes);
app.use('/admin', adminRoutes);

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});
app.listen(3000)