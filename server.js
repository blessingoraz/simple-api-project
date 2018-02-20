const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const db = require('./config/db');
const app = express();
const port = 5000;

mongoose.connect(db.url);
const dbConn = mongoose.connection;

dbConn.once('open', () => {
    console.log('DB is connected')
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Notes API skrrrr' })
});

// add routes here
require('./app/routes/user')(app);
require('./app/routes/note')(app);

app.listen(process.env.PORT || port, () => {
    console.log(`listening to port ${port}`);
});

module.exports = app;
