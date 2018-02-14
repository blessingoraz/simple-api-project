const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const db = require('./config/db');

const app = express();
const port = 5000;

mongoose.connect(db.url);
const dbConn = mongoose.connection;

dbConn.once('open', () => {
    console.log('DB is connected')
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({message: 'Welcome to Notes API'})
});

// add routes here

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});
